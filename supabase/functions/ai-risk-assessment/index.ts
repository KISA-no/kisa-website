import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `Du er en erfaren KI-styringsrådgiver som spesialiserer seg på EU AI Act, GDPR og ansvarlig KI-bruk i nordiske bedrifter. 
Basert på brukerens svar om sin bedrifts KI-bruk, skal du vurdere risikoen og gi konkrete, handlingsrettede anbefalinger.
Vurderer risiko basert på: manglende retningslinjer, sensitiv databehandling uten styring, mangel på ledelsesinvolvering, og regulatorisk eksponering.
Referer til de spesifikke verktøyene brukeren har oppgitt når du forklarer risiko og anbefalinger.
Svar alltid på norsk. Vær konkret og praktisk i anbefalingene.`;

    const userPrompt = `Her er svarene fra en bedrift om deres KI-bruk:

1. Antall ansatte: ${answers.employees}
2. KI-verktøy i bruk: ${answers.tools}
3. Retningslinjer for KI-bruk: ${answers.guidelines}
4. Behandling av sensitive data med KI: ${answers.sensitiveData}
5. Ledelsens involvering i KI-styring: ${answers.leadership}

Analyser risikoen og gi en vurdering. Referer til de spesifikke verktøyene nevnt ovenfor i dine anbefalinger.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "deliver_risk_assessment",
                description:
                  "Leverer en strukturert risikovurdering med score, oppsummering og anbefalinger.",
                parameters: {
                  type: "object",
                  properties: {
                    score: {
                      type: "string",
                      enum: ["lav", "middels", "hoy"],
                      description: "Risikonivå: lav, middels eller hoy",
                    },
                    summary: {
                      type: "string",
                      description:
                        "En kort oppsummering på 2-3 setninger om bedriftens AI-risikoprofil.",
                    },
                    recommendations: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          description: { type: "string" },
                        },
                        required: ["title", "description"],
                        additionalProperties: false,
                      },
                      description: "3-5 konkrete anbefalinger",
                    },
                  },
                  required: ["score", "summary", "recommendations"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "deliver_risk_assessment" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "For mange forespørsler. Prøv igjen om litt." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Tjenesten er midlertidig utilgjengelig. Prøv igjen senere." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "Kunne ikke generere analyse. Prøv igjen." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Ugyldig respons fra AI. Prøv igjen." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-risk-assessment error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Ukjent feil" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
