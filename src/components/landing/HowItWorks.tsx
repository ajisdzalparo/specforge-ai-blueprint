const steps = [
  { num: "01", title: "Deskripsikan Idemu", desc: "Tulis ide project dalam bahasa bebas. Satu kalimat atau satu paragraf — terserah kamu." },
  { num: "02", title: "AI Proses & Analisis", desc: "SpecForge menganalisis ide, mengidentifikasi fitur, user flow, dan kebutuhan teknis." },
  { num: "03", title: "Dapatkan PRD Lengkap", desc: "Output: PRD terstruktur siap eksekusi, dari overview hingga database schema." },
];

const HowItWorks = () => {
  return (
    <section className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cara Kerja <span className="text-gradient">SpecForge</span>
          </h2>
        </div>

        <div className="space-y-8">
          {steps.map((s, i) => (
            <div key={s.num} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center font-mono font-bold text-primary text-lg">
                {s.num}
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-semibold mb-1">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
