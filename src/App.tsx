import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import SellYourRide from "./pages/SellYourRide";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Buy from "./pages/Buy";
import ForgotPassword from "./pages/ForgotPassword";
import AuthRoute from "./components/authroute/Index";
import GuestRoute from "./components/authroute/GuestRoute";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import DashboardLayout from "./components/layouts/DashboardLayout";
import ListingDetail from "./pages/ListingDetail";
import VerifyUser from "./pages/VerifyUser";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import { OptionsProvider } from './context/OptionsContext';

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <OptionsProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/listings" element={<Listings />} />
              {/* <Route path="/sell-your-ride" element={<AuthRoute><SellYourRide /></AuthRoute>} /> */}
              <Route path="/sell-your-ride" element={<SellYourRide />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="/buy" element={<AuthRoute><Buy /></AuthRoute>} /> */}
              <Route path="/buy" element={<Buy />} />
              <Route path="/signin" element={<GuestRoute><SignIn /></GuestRoute>} />
              <Route path="/signup" element={<GuestRoute><SignUp /></GuestRoute>} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/listings/:listingId" element={<ListingDetail />} />
              <Route path="/user/verify/:code" element={<VerifyUser />} />
              <Route path="/admin-dashboard/*" element={<AuthRoute><DashboardLayout /></AuthRoute>} />
              <Route path="/user-dashboard/*" element={<AuthRoute><DashboardLayout /></AuthRoute>} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </OptionsProvider>
  </HelmetProvider>
);

export default App;
