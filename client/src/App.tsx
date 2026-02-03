import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import BookingConfirmation from "@/pages/BookingConfirmation";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import ServiceDetail from "./pages/ServiceDetail";
import Professionnels from "./pages/Professionnels";
import Professionals from "./pages/Professionals";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import WhyChooseUs from "./pages/WhyChooseUs";
import Contact from "./pages/Contact";
import ServiceTapis from "./pages/ServiceTapis";
import ServiceAuto from "./pages/ServiceAuto";
import ServiceExterieur from "./pages/ServiceExterieur";
import BlogArticles from "./pages/BlogArticles";
import ThankYou from "./pages/ThankYou";
import WhatsAppButton from "./components/WhatsAppButton";
import MyBookings from "./pages/MyBookings";
import FeedbackForm from "./pages/FeedbackForm";
import Reviews from "./pages/Reviews";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />

      <Route path={"/service/tapis"} component={ServiceDetail} />
      <Route path={"/service/balcon"} component={ServiceDetail} />
      <Route path={"/service/jardinage"} component={ServiceDetail} />
      <Route path={"/service/facade"} component={ServiceDetail} />
      <Route path={"/service/panneaux-solaires"} component={ServiceDetail} />
      <Route path={"/service/automobile"} component={ServiceDetail} />
      <Route path={"/service/piscine"} component={ServiceDetail} />
      <Route path={"/service/terrasse"} component={ServiceDetail} />
      <Route path={"/service/panneaux"} component={ServiceDetail} />
      <Route path={"/service"} component={ServiceDetail} />
      <Route path={"/professionnels"} component={Professionnels} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/pourquoi-nous"} component={WhyChooseUs} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/service/tapis"} component={ServiceTapis} />
      <Route path={"/service/auto"} component={ServiceAuto} />
      <Route path={"/service/exterieur"} component={ServiceExterieur} />
      <Route path={"/blog"} component={BlogArticles} />
      <Route path={"/merci"} component={ThankYou} />
      <Route path={"/booking-confirmation"} component={BookingConfirmation} />
      <Route path={"/my-bookings"} component={MyBookings} />
      <Route path={"/feedback"} component={FeedbackForm} />
      <Route path={"/avis"} component={Reviews} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/mentions-legales" component={LegalNotice} />
      <Route path="/legal" component={LegalNotice} />
      <Route path="/politique-confidentialite" component={PrivacyPolicy} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/conditions-generales" component={TermsOfService} />
      <Route path="/cgv" component={TermsOfService} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <Footer />
          <WhatsAppButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
