import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import PricingDetailPage from "./pages/PricingDetailPage";
import ReasonDetailPage from "./pages/ReasonDetailPage";
import RessurserOverviewPage from "./pages/RessurserOverviewPage";
import AILovenPage from "./pages/AILovenPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tjenester/:slug" element={<ServiceDetailPage />} />
          <Route path="/priser/:slug" element={<PricingDetailPage />} />
          <Route path="/ressurser" element={<RessurserOverviewPage />} />
          <Route path="/om-ki-loven" element={<AILovenPage />} />
          <Route path="/hvorfor-kisa/:slug" element={<ReasonDetailPage />} />
          {/* Redirects for old URLs */}
          <Route path="/tjenester" element={<Navigate to="/#services" replace />} />
          <Route path="/ressurser/ai-loven" element={<Navigate to="/om-ki-loven" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

