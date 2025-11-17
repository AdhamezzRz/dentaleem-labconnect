import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CreateCase from "./pages/CreateCase";
import Marketplace from "./pages/Marketplace";
import LabProfile from "./pages/LabProfile";
import CaseDetail from "./pages/CaseDetail";
import Messages from "./pages/Messages";
import Payments from "./pages/Payments";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import LabDashboard from "./pages/lab/LabDashboard";
import LabProductionBoard from "./pages/lab/LabProductionBoard";
import LabCaseDetail from "./pages/lab/LabCaseDetail";
import LabProfileManagement from "./pages/lab/LabProfile";
import LabAnalytics from "./pages/lab/LabAnalytics";
import LabFinancials from "./pages/lab/LabFinancials";
import LabStaff from "./pages/lab/LabStaff";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-case" element={<CreateCase />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/lab/:id" element={<LabProfile />} />
            <Route path="/case/:id" element={<CaseDetail />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            {/* Lab Routes */}
            <Route path="/lab/dashboard" element={<LabDashboard />} />
            <Route path="/lab/production-board" element={<LabProductionBoard />} />
            <Route path="/lab/cases/:id" element={<LabCaseDetail />} />
            <Route path="/lab/profile" element={<LabProfileManagement />} />
            <Route path="/lab/analytics" element={<LabAnalytics />} />
            <Route path="/lab/financials" element={<LabFinancials />} />
            <Route path="/lab/staff" element={<LabStaff />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
