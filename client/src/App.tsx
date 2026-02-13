import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import StartScreen from "@/pages/StartScreen";
import SetupScreen from "@/pages/SetupScreen";
import LoveScreen from "@/pages/LoveScreen";
import HeartbreakScreen from "@/pages/HeartbreakScreen";
import MemoriesScreen from "@/pages/MemoriesScreen";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={StartScreen} />
      <Route path="/setup" component={SetupScreen} />
      <Route path="/love" component={LoveScreen} />
      <Route path="/heartbreak" component={HeartbreakScreen} />
      <Route path="/memories" component={MemoriesScreen} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
