import { FileText, Brain, Layers, RefreshCw, Database, GitBranch } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "PRD Otomatis",
    desc: "Generate dokumen PRD lengkap dari satu kalimat ide. Overview, problem statement, target users, semua ada.",
  },
  {
    icon: Brain,
    title: "AI Product Thinking",
    desc: "Bukan sekadar chatbot. SpecForge berpikir seperti product engineer — menyusun edge cases dan future improvements.",
  },
  {
    icon: Layers,
    title: "System Architecture",
    desc: "Dapatkan draft arsitektur sistem, dari monolith hingga microservices, sesuai kebutuhan project.",
  },
  {
    icon: GitBranch,
    title: "API Design",
    desc: "Otomatis generate endpoint API, request/response schema, dan authentication flow.",
  },
  {
    icon: Database,
    title: "Database Schema",
    desc: "Draft ERD dan schema database yang siap di-implement. Relasi antar tabel sudah terstruktur.",
  },
  {
    icon: RefreshCw,
    title: "Regenerate per Section",
    desc: "Tidak puas dengan satu bagian? Regenerate section tertentu tanpa mengubah yang lain.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fitur yang Bikin PRD Jadi <span className="text-gradient">Mudah</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Semua yang kamu butuhkan untuk mengubah ide menjadi blueprint engineering yang siap eksekusi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass rounded-xl p-6 hover:glow-sm transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
