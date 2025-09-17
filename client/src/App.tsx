import { Toaster } from "sonner";
import ItemsSection from "./components/items/ItemsSection";
import VideoSection from "./components/videos/VideoSection";
import DashboardLayout from "./layouts/dashboard";
import { ThemeProvider } from "@/components/theme-provider";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DashboardLayout>
        <ItemsSection />
        <VideoSection />
      </DashboardLayout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
