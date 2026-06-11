import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DomainPage from "./pages/DomainPage";
import TopicPage from "./pages/TopicPage";
import GlossaryPage from "./pages/GlossaryPage";
import ToolsPage from "./pages/ToolsPage";
import CheatSheetPage from "./pages/CheatSheetPage";
import FrameworksPage from "./pages/FrameworksPage";
import AttackChainPage from "./pages/AttackChainPage";
import MetricsPage from "./pages/MetricsPage";
import QuizzesPage from "./pages/QuizzesPage";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/domain/:domainId" component={DomainPage} />
        <Route path="/domain/:domainId/topic/:topicId" component={TopicPage} />
        <Route path="/glossary" component={GlossaryPage} />
        <Route path="/tools" component={ToolsPage} />
        <Route path="/quizzes" component={QuizzesPage} />
        <Route path="/cheatsheet" component={CheatSheetPage} />
        <Route path="/frameworks" component={FrameworksPage} />
        <Route path="/attack-chain" component={AttackChainPage} />
        <Route path="/metrics" component={MetricsPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
