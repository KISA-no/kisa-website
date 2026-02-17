

# Restrukturering av navigasjon, tjenester og ressurser

## Oversikt
Nettsiden trenger en restrukturering der "Tjenester" og "Ressurser" far egne oversiktssider med valgbrett, i stedet for a bare scrolle til seksjoner pa forsiden. Tjenestene redefineres til de tre kjernetilbudene, og navigasjonen oppdateres gjennomgaende.

---

## Hva endres

### 1. Ny side: Tjenesteoversikt (`/tjenester`)

Lager en ny side som viser de tre tjenestene som et "valgbrett":
- **AI Governance Assessment** (slug: `agent-audit`)
- **Governance Partner** (slug: `compliance-dashboard`)
- **ISO 42001 Light** (slug: `ki-strategi`)

Hver tjeneste vises som et kort med ikon, tittel, kort beskrivelse og pris. Klikk pa et kort navigerer til detaljsiden (`/tjenester/agent-audit` osv.).

Designet folger det nye designsystemet med Playfair Display-overskrifter og lilla aksenter.

### 2. Ny side: Ressursoversikt (`/ressurser`)

Lager en ny oversiktsside for ressurser med samme valgbrett-konsept. Ressursene baseres pa det som allerede finnes:
- **AI-loven** (EU AI Act-innhold fra EUCompliance-komponenten)
- **Shadow AI** (fra reasons-dataen)
- **AI Firewall** (fra reasons-dataen)
- **Human-in-the-Loop** (fra reasons-dataen)

Hvert kort lenker videre til en dedikert ressursside. For AI-loven opprettes en ny side, mens de tre andre allerede har sider under `/hvorfor-kisa/`.

### 3. Ny side: AI-loven (`/ressurser/ai-loven`)

En dedikert ressursside om EU AI Act med tidslinjen og kravene fra EUCompliance-komponenten, men i et fullsideformat med mer plass og bedre lesbarhet.

### 4. Oppdater services-data (`services.ts`)

Redefinerer listen til kun de tre tjenestene slik at SubpageNav pa detaljsidene viser riktige valg:
- AI Governance Assessment (beholder slug `agent-audit`, oppdaterer tittel/innhold)
- Governance Partner (beholder slug `compliance-dashboard`, oppdaterer tittel/innhold)
- ISO 42001 Light (beholder slug `ki-strategi`, oppdaterer tittel/innhold)

De fem gamle tjenestene (Agent-Audit, Compliance Dashboard, Innbetalingsagent, Sikkerhetstrening, Strategi og Implementering) erstattes med data fra Solutions-tabsene.

### 5. Oppdater Navbar (`Navbar.tsx`)

Endrer navigasjonslenker fra hash-lenker til ruter:
- "Tjenester": `/#services` -> `/tjenester`
- "Ressurser": `/#process` -> `/ressurser`
- "Om AI-loven" og "Om oss" forblir som hash-lenker til forsiden

### 6. Oppdater SubpageNav tilbake-lenker

Pa tjeneste-detaljsider: "Tilbake til tjenester" gar til `/tjenester` (ikke `/#services`)
Pa ressurs-/reason-detaljsider: "Tilbake" gar til `/ressurser` (ikke forsiden)

### 7. Oppdater Footer-lenker (`Footer.tsx`)

- Tjenester-lenker peker til `/tjenester/agent-audit`, `/tjenester/compliance-dashboard`, `/tjenester/ki-strategi`
- Ressurser-lenker peker til `/ressurser/ai-loven`, `/hvorfor-kisa/stopp-shadow-ai` osv.

### 8. Oppdater ruting (`App.tsx`)

Legger til nye ruter:
- `/tjenester` -> TjenesterOverviewPage
- `/ressurser` -> RessurserOverviewPage
- `/ressurser/ai-loven` -> AILovenPage

---

## Teknisk oppsummering

**Nye filer (4 stk):**
1. `src/pages/TjenesterOverviewPage.tsx` - Valgbrett med 3 tjenester
2. `src/pages/RessurserOverviewPage.tsx` - Valgbrett med ressurser
3. `src/pages/AILovenPage.tsx` - Dedikert side om EU AI Act
4. `src/data/resources.ts` - Data for ressurskortene

**Filer som endres (6 stk):**
1. `src/App.tsx` - Nye ruter
2. `src/data/services.ts` - Redefineres til 3 tjenester
3. `src/components/kisa/Navbar.tsx` - Lenker til `/tjenester` og `/ressurser`
4. `src/pages/ServiceDetailPage.tsx` - Oppdaterer tilbake-lenke til `/tjenester`
5. `src/components/kisa/Footer.tsx` - Oppdaterer lenker
6. `src/pages/ReasonDetailPage.tsx` - Oppdaterer tilbake-lenke til `/ressurser`

