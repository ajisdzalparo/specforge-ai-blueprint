import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass glow-sm mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            AI-Powered Product Engineering
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
          Ubah Ide Mentah Jadi{" "}
          <span className="text-gradient">PRD Engineering-Grade</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          SpecForge AI mengubah ide kasar menjadi Product Requirements Document lengkap — 
          dengan user flow, system architecture, API design, dan database schema. 
          Siap eksekusi.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="hero"
            size="lg"
            className="text-base px-8"
            onClick={() => navigate("/generate")}
          >
            Mulai Generate PRD
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            variant="hero-outline"
            size="lg"
            className="text-base px-8"
            onClick={() => {
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Lihat Fitur
          </Button>
        </div>

        {/* Example preview */}
        <div className="mt-16 glass rounded-2xl p-6 glow-md max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-accent/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">specforge-output.md</span>
          </div>
          <div className="font-mono text-sm space-y-1.5 text-muted-foreground">
            <p><span className="text-primary">##</span> <span className="text-foreground font-semibold">Product Overview</span></p>
            <p className="pl-4 text-muted-foreground/80">A real-time food delivery platform for campus...</p>
            <p><span className="text-primary">##</span> <span className="text-foreground font-semibold">System Architecture</span></p>
            <p className="pl-4 text-muted-foreground/80">Microservices: Auth, Orders, Payments, Notifications...</p>
            <p><span className="text-primary">##</span> <span className="text-foreground font-semibold">API Design</span></p>
            <p className="pl-4 text-muted-foreground/80">POST /api/orders — Create new delivery order...</p>
            <p className="text-muted-foreground/50">...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
