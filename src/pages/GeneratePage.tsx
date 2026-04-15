import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, RefreshCw, Send, Zap, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PRDSection {
  id: string;
  title: string;
  content: string;
}

const sectionTemplates: { id: string; title: string }[] = [
  { id: "overview", title: "Product Overview" },
  { id: "problem", title: "Problem Statement" },
  { id: "users", title: "Target Users" },
  { id: "features", title: "Core Features" },
  { id: "userflow", title: "User Flow" },
  { id: "architecture", title: "System Architecture" },
  { id: "api", title: "API Design" },
  { id: "database", title: "Database Schema" },
  { id: "edge-cases", title: "Edge Cases" },
  { id: "future", title: "Future Improvements" },
];

const mockGenerate = (idea: string): PRDSection[] => {
  return sectionTemplates.map((s) => ({
    ...s,
    content: generateMockContent(s.id, idea),
  }));
};

const generateMockContent = (sectionId: string, idea: string): string => {
  const contents: Record<string, string> = {
    overview: `## Product Overview\n\nA comprehensive platform based on the concept: "${idea}". This product aims to solve key challenges in the target market by providing an intuitive, scalable solution that leverages modern technology stack and best practices in software engineering.`,
    problem: `## Problem Statement\n\nCurrent solutions in this space are fragmented, lack integration, and fail to provide a seamless user experience. Users face:\n\n- **Complexity**: Existing tools require significant technical knowledge\n- **Fragmentation**: No single platform addresses all user needs\n- **Scalability**: Current solutions don't scale with growing demands\n- **Cost**: High operational costs for existing alternatives`,
    users: `## Target Users\n\n### Primary Users\n1. **End Users** — Direct consumers who interact with the platform daily\n2. **Administrators** — Team leads who manage settings and configurations\n\n### Secondary Users\n3. **Developers** — Engineers who integrate via API\n4. **Stakeholders** — Decision makers who review analytics and reports`,
    features: `## Core Features\n\n### MVP (Phase 1)\n- User authentication & authorization (JWT + OAuth2)\n- Core CRUD operations with real-time updates\n- Dashboard with key metrics and analytics\n- Notification system (in-app + email)\n\n### Phase 2\n- Advanced search & filtering\n- Collaboration features (comments, sharing)\n- Export/Import functionality\n- Mobile-responsive PWA`,
    userflow: `## User Flow\n\n\`\`\`\nLanding Page → Sign Up / Login\n    ↓\nOnboarding (3 steps)\n    ↓\nMain Dashboard\n    ↓\n├── Create New Item → Form → Preview → Submit → Success\n├── Browse Items → Filter/Search → Detail View → Action\n├── Settings → Profile / Notifications / Integrations\n└── Analytics → Charts → Export Report\n\`\`\``,
    architecture: `## System Architecture\n\n### Tech Stack\n- **Frontend**: React + TypeScript + TailwindCSS\n- **Backend**: Node.js + Express / Fastify\n- **Database**: PostgreSQL + Redis (cache)\n- **Auth**: JWT + OAuth2 (Google, GitHub)\n- **Infra**: Docker + Kubernetes + AWS/GCP\n\n### Architecture Pattern\nMicroservices with API Gateway pattern:\n\n\`\`\`\nClient → API Gateway → Auth Service\n                     → Core Service\n                     → Notification Service\n                     → Analytics Service\n\`\`\``,
    api: `## API Design\n\n### Authentication\n\`\`\`\nPOST   /api/v1/auth/register    — Register new user\nPOST   /api/v1/auth/login        — Login & get token\nPOST   /api/v1/auth/refresh      — Refresh access token\nDELETE /api/v1/auth/logout       — Invalidate session\n\`\`\`\n\n### Core Resources\n\`\`\`\nGET    /api/v1/items             — List items (paginated)\nPOST   /api/v1/items             — Create item\nGET    /api/v1/items/:id         — Get item detail\nPUT    /api/v1/items/:id         — Update item\nDELETE /api/v1/items/:id         — Delete item\n\`\`\``,
    database: `## Database Schema\n\n\`\`\`sql\n-- Users table\nCREATE TABLE users (\n  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email       VARCHAR(255) UNIQUE NOT NULL,\n  name        VARCHAR(100) NOT NULL,\n  avatar_url  TEXT,\n  created_at  TIMESTAMPTZ DEFAULT NOW(),\n  updated_at  TIMESTAMPTZ DEFAULT NOW()\n);\n\n-- Items table\nCREATE TABLE items (\n  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,\n  title       VARCHAR(200) NOT NULL,\n  description TEXT,\n  status      VARCHAR(20) DEFAULT 'draft',\n  metadata    JSONB DEFAULT '{}',\n  created_at  TIMESTAMPTZ DEFAULT NOW()\n);\n\`\`\``,
    "edge-cases": `## Edge Cases\n\n1. **Concurrent Edits** — Implement optimistic locking with version numbers\n2. **Rate Limiting** — 100 req/min per user, 1000 req/min per API key\n3. **Large File Uploads** — Max 50MB, chunked upload for files > 10MB\n4. **Network Failures** — Retry with exponential backoff (3 attempts)\n5. **Data Validation** — Server-side validation for all inputs, sanitize HTML\n6. **Session Expiry** — Auto-refresh tokens, graceful re-authentication\n7. **Empty States** — Design for zero-data scenarios across all views`,
    future: `## Future Improvements\n\n### Short-term (Q2 2026)\n- AI-powered suggestions & auto-complete\n- Real-time collaboration (WebSocket)\n- Advanced analytics dashboard\n\n### Mid-term (Q3-Q4 2026)\n- Mobile native apps (React Native)\n- Third-party integrations (Slack, Jira, GitHub)\n- Marketplace / Plugin system\n\n### Long-term (2027+)\n- White-label solution\n- Enterprise SSO (SAML)\n- Self-hosted option`,
  };
  return contents[sectionId] || `Content for ${sectionId}`;
};

const GeneratePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [idea, setIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sections, setSections] = useState<PRDSection[]>([]);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) {
      toast({ title: "Masukkan ide project dulu!", variant: "destructive" });
      return;
    }
    setIsGenerating(true);
    // Simulate AI delay
    await new Promise((r) => setTimeout(r, 2000));
    const result = mockGenerate(idea);
    setSections(result);
    setIsGenerating(false);
    toast({ title: "PRD berhasil di-generate! 🎉" });
  };

  const handleRegenerate = async (sectionId: string) => {
    setRegeneratingId(sectionId);
    await new Promise((r) => setTimeout(r, 1200));
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, content: generateMockContent(s.id, idea) + "\n\n*(Regenerated)*" }
          : s
      )
    );
    setRegeneratingId(null);
    toast({ title: `Section "${sectionTemplates.find((t) => t.id === sectionId)?.title}" di-regenerate!` });
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const fullPrd = sections.map((s) => s.content).join("\n\n---\n\n");
    navigator.clipboard.writeText(fullPrd);
    toast({ title: "PRD lengkap disalin ke clipboard!" });
  };

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Kembali</span>
          </button>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-bold">SpecForge</span>
            <span className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">AI</span>
          </div>
          {sections.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleCopyAll}>
              <Copy className="w-4 h-4 mr-1" />
              Copy All
            </Button>
          )}
        </div>
      </header>

      <main className="pt-20 pb-16 max-w-4xl mx-auto px-6">
        {/* Input section */}
        <div className="glass rounded-2xl p-8 glow-sm mb-8">
          <h1 className="text-2xl font-bold mb-2">🚀 Describe Your Idea</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Tulis ide project kamu dalam bahasa bebas. Semakin detail, semakin bagus hasilnya.
          </p>
          <Textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Contoh: I want to build a food delivery app for campus with real-time tracking, split payment, and restaurant rating system..."
            className="min-h-[120px] bg-surface border-border/50 resize-none text-base mb-4 focus:ring-primary/30"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{idea.length} karakter</span>
            <Button
              variant="hero"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-6"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Generate PRD
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Loading state */}
        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 glow-md animate-pulse">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">AI sedang menyusun PRD kamu...</p>
          </div>
        )}

        {/* Sections output */}
        {!isGenerating && sections.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">📄 Generated PRD</h2>
              <span className="text-sm text-muted-foreground">{sections.length} sections</span>
            </div>

            {sections.map((section) => (
              <div key={section.id} className="glass rounded-xl overflow-hidden group">
                {/* Section header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-border/30">
                  <h3 className="font-semibold text-sm">{section.title}</h3>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => handleCopy(section.content, section.id)}
                    >
                      {copiedId === section.id ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => handleRegenerate(section.id)}
                      disabled={regeneratingId === section.id}
                    >
                      <RefreshCw
                        className={`w-3 h-3 ${regeneratingId === section.id ? "animate-spin" : ""}`}
                      />
                      <span className="ml-1">Regenerate</span>
                    </Button>
                  </div>
                </div>
                {/* Section content */}
                <div className="px-6 py-5">
                  <pre className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed font-mono">
                    {section.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default GeneratePage;
