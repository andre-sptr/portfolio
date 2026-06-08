import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { LenisProvider } from "@/providers/LenisProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ChatWidget } from "./components/ChatWidget";
import Analytics from "./components/Analytics";

const Lab = React.lazy(() => import("./pages/Lab"));

const RouteFallback = () => (
  <div className="min-h-screen bg-[var(--surface-0)] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LenisProvider>
          <TooltipProvider>
            <ChatWidget />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Analytics />
              <React.Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/lab" element={<Lab />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </React.Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </LenisProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
