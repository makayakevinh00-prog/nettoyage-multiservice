import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import BookingConfirmation from "@/pages/BookingConfirmation";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

import ServiceDetail from "./pages/ServiceDetail";
import Professionnels from "./pages/Professionnels";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import WhyChooseUs from "./pages/WhyChooseUs";
import ChatWidget from "./components/ChatWidget";
import ProCleanAIAssistant from "./components/ProCleanAIAssistant";

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
      <Route path={"/blog"} component={Blog} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/pourquoi-nous"} component={WhyChooseUs} />
      <Route path={"/booking-confirmation"} component={BookingConfirmation} />
      <Route path={"/404"} component={NotFound} />
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
          <ChatWidget />
          <ProCleanAIAssistant />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
