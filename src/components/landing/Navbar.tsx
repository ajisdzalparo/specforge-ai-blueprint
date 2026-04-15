import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-lg">SpecForge</span>
          <span className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">AI</span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
            Fitur
          </Button>
          <Button variant="hero" size="sm" onClick={() => navigate("/generate")}>
            Mulai Sekarang
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
