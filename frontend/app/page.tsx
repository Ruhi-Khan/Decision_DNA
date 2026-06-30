"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AnalysisResult {
  match: string;
  incident: string;
  decision: string;
  confidence: string;
  rule: string;
  controversy: string;
  agreement: string;
  reasoning: string;
  timeline: string[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INCIDENT_TYPES = [
  "Penalty",
  "Red Card",
  "Offside",
  "Handball",
  "VAR Review",
] as const;

const API_BASE = "/api";

// ─── Sub-components ───────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 50px",
        background: "#0d0d0d",
        borderBottom: "2px solid #00ff88",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#00ff88",
          letterSpacing: "0.5px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "28px" }}>⚽</span>
        Decision DNA AI
      </div>

      {/* Desktop nav links */}
      <div
        className="nav-links-desktop"
        style={{
          display: "flex",
          gap: "30px",
        }}
      >
        {["Home", "Analyze", "History", "About"].map((link) => (
          <a
            key={link}
            href={link === "Home" ? "#hero" : link === "Analyze" ? "#analyze" : link === "History" ? "#history" : "#about"}
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "16px",
              transition: "color 0.3s",
              fontWeight: 500,
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#00d9ff")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "white")
            }
          >
            {link}
          </a>
        ))}
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
        }}
        className="mobile-menu-btn"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

function HeroSection({ onAnalyzeClick }: { onAnalyzeClick: () => void }) {
  return (
    <section
      id="hero"
      style={{
        textAlign: "center",
        padding: "100px 20px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="animate-fadeInUp">
        <div
          style={{
            display: "inline-block",
            background: "rgba(0,255,136,0.1)",
            border: "1px solid rgba(0,255,136,0.3)",
            borderRadius: "20px",
            padding: "6px 18px",
            fontSize: "14px",
            color: "#00ff88",
            marginBottom: "24px",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          ⚡ AI-Powered Football Analysis
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            color: "#00ff88",
            marginBottom: "24px",
            fontWeight: 800,
            lineHeight: 1.1,
            textShadow: "0 0 40px rgba(0,255,136,0.3)",
          }}
        >
          Understand WHY Football
          <br />
          Decisions Happen
        </h1>

        <p
          style={{
            maxWidth: "680px",
            margin: "0 auto 40px",
            color: "#cccccc",
            fontSize: "20px",
            lineHeight: 1.7,
          }}
        >
          AI-powered referee and VAR decision explanation system using FIFA
          rules and historical football incidents.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            id="hero-analyze-btn"
            onClick={onAnalyzeClick}
            style={{
              padding: "16px 40px",
              border: "none",
              borderRadius: "12px",
              background: "#00ff88",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#000",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 20px rgba(0,255,136,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = "translateY(-2px)";
              (e.target as HTMLElement).style.boxShadow =
                "0 8px 30px rgba(0,255,136,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = "translateY(0)";
              (e.target as HTMLElement).style.boxShadow =
                "0 4px 20px rgba(0,255,136,0.4)";
            }}
          >
            ⚽ Analyze Incident
          </button>

          <a
            href="#about"
            style={{
              padding: "16px 40px",
              border: "2px solid rgba(0,217,255,0.4)",
              borderRadius: "12px",
              background: "transparent",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#00d9ff",
              transition: "all 0.2s",
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background =
                "rgba(0,217,255,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "60px",
          marginTop: "80px",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Incident Types", value: "5" },
          { label: "FIFA Laws Covered", value: "12+" },
          { label: "Analysis Accuracy", value: "94%" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "40px",
                fontWeight: 800,
                color: "#00ff88",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div style={{ color: "#888", fontSize: "14px", marginTop: "6px" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function IncidentForm({
  sectionRef,
  onResult,
  loading,
  setLoading,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  onResult: (result: AnalysisResult) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
}) {
  const [matchName, setMatchName] = useState("");
  const [incidentType, setIncidentType] = useState("Penalty");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!matchName.trim() || !description.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          match: matchName,
          incident: incidentType,
          description,
        }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data: AnalysisResult = await res.json();

      // Save to localStorage history
      const history = JSON.parse(
        localStorage.getItem("decisionDNA") || "[]"
      );
      history.push({
        match: data.match,
        incident: data.incident,
        decision: data.decision,
        confidence: data.confidence,
        date: new Date().toLocaleDateString(),
      });
      localStorage.setItem("decisionDNA", JSON.stringify(history));

      onResult(data);

      // Scroll to results
      setTimeout(() => {
        document
          .getElementById("results-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setError(
        "Something went wrong calling /api/analyze. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "15px",
    marginTop: "15px",
    border: "1px solid rgba(0,255,136,0.2)",
    borderRadius: "10px",
    background: "#1e1e1e",
    color: "white",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <section
      id="analyze"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "#121212",
          border: "1px solid #00ff88",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 0 40px rgba(0,255,136,0.15)",
        }}
      >
        <h2
          style={{
            marginBottom: "8px",
            color: "#00ff88",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          Analyze Football Incident
        </h2>
        <p style={{ color: "#888", marginBottom: "10px", fontSize: "15px" }}>
          Describe the incident and let AI determine the correct decision based
          on FIFA Laws.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            id="matchName"
            type="text"
            placeholder="Match Name (e.g. Spain vs England — World Cup Final)"
            value={matchName}
            onChange={(e) => setMatchName(e.target.value)}
            style={inputStyle}
            onFocus={(e) =>
              ((e.target as HTMLElement).style.borderColor = "#00ff88")
            }
            onBlur={(e) =>
              ((e.target as HTMLElement).style.borderColor =
                "rgba(0,255,136,0.2)")
            }
          />

          <select
            id="incidentType"
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
            style={{
              ...inputStyle,
              cursor: "pointer",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300ff88' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 15px center",
              paddingRight: "40px",
            }}
            onFocus={(e) =>
              ((e.target as HTMLElement).style.borderColor = "#00ff88")
            }
            onBlur={(e) =>
              ((e.target as HTMLElement).style.borderColor =
                "rgba(0,255,136,0.2)")
            }
          >
            {INCIDENT_TYPES.map((t) => (
              <option key={t} value={t} style={{ background: "#1e1e1e" }}>
                {t}
              </option>
            ))}
          </select>

          <textarea
            id="incidentText"
            placeholder="Describe the incident in detail. Example: Defender pushed attacker inside penalty area causing him to fall."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              ...inputStyle,
              height: "150px",
              resize: "vertical",
              fontFamily: "inherit",
            }}
            onFocus={(e) =>
              ((e.target as HTMLElement).style.borderColor = "#00ff88")
            }
            onBlur={(e) =>
              ((e.target as HTMLElement).style.borderColor =
                "rgba(0,255,136,0.2)")
            }
          />

          {error && (
            <div
              style={{
                marginTop: "15px",
                padding: "12px 16px",
                background: "rgba(255,80,80,0.1)",
                border: "1px solid rgba(255,80,80,0.4)",
                borderRadius: "10px",
                color: "#ff5050",
                fontSize: "14px",
              }}
            >
              ⚠ {error}
            </div>
          )}

          <button
            id="generate-btn"
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "16px",
              border: "none",
              borderRadius: "12px",
              background: loading
                ? "rgba(0,217,255,0.4)"
                : "linear-gradient(135deg, #00d9ff, #0099cc)",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              color: loading ? "#ccc" : "#000",
              fontSize: "17px",
              transition: "all 0.3s",
              boxShadow: loading ? "none" : "0 4px 20px rgba(0,217,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    display: "inline-block",
                    width: "18px",
                    height: "18px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Analyzing Incident...
              </>
            ) : (
              "🧬 Generate Decision DNA"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#181818",
        border: `1px solid ${color === "green" ? "#00ff88" : "#00d9ff"}`,
        borderRadius: "15px",
        padding: "20px",
        textAlign: "center",
        boxShadow: `0 0 20px ${
          color === "green"
            ? "rgba(0,255,136,0.15)"
            : "rgba(0,217,255,0.15)"
        }`,
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")
      }
    >
      <h4
        style={{
          color: color === "green" ? "#00ff88" : "#00d9ff",
          marginBottom: "10px",
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
        }}
      >
        {label}
      </h4>
      <p style={{ fontSize: "28px", fontWeight: "bold", color: "white" }}>
        {value}
      </p>
    </div>
  );
}

function ConfidenceBar({ value }: { value: string }) {
  const numericVal = parseInt(value);
  return (
    <div style={{ marginTop: "8px" }}>
      <div
        style={{
          height: "8px",
          background: "rgba(0,255,136,0.15)",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${numericVal}%`,
            background: "linear-gradient(90deg, #00ff88, #00d9ff)",
            borderRadius: "4px",
            transition: "width 1s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}

function TimelineStep({
  step,
  index,
  total,
}: {
  step: string;
  index: number;
  total: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        opacity: 0,
        animation: `fadeInUp 0.4s ease ${index * 0.12}s forwards`,
      }}
    >
      {/* dot */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background:
              index === total - 1 ? "#00ff88" : "rgba(0,255,136,0.4)",
            border: "2px solid #00ff88",
            animation:
              index === total - 1
                ? "dotPulse 1.5s ease-in-out infinite"
                : "none",
          }}
        />
        {index < total - 1 && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "2px",
              height: "32px",
              background: "rgba(0,255,136,0.2)",
            }}
          />
        )}
      </div>
      <span
        style={{
          color: index === total - 1 ? "#00ff88" : "#cccccc",
          fontWeight: index === total - 1 ? 700 : 400,
          fontSize: "15px",
          paddingBottom: index < total - 1 ? "32px" : "0",
        }}
      >
        {step}
      </span>
    </div>
  );
}

function ResultsSection({ result }: { result: AnalysisResult | null }) {
  if (!result) {
    return (
      <section
        id="results-section"
        style={{ padding: "40px 20px 60px" }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#00ff88",
            marginBottom: "30px",
            fontSize: "28px",
          }}
        >
          Decision DNA Report
        </h2>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#121212",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid #00d9ff",
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#555",
            fontSize: "16px",
            textAlign: "center",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "48px" }}>🧬</span>
          <p>Report will appear here after analysis.</p>
          <p style={{ fontSize: "14px", color: "#444" }}>
            Fill in the form above and click &ldquo;Generate Decision DNA&rdquo;
          </p>
        </div>
      </section>
    );
  }

  const confidenceNum = parseInt(result.confidence);
  const agreementNum = parseInt(result.agreement);

  const controversyColor =
    result.controversy === "Low"
      ? "#00ff88"
      : result.controversy === "Medium"
      ? "#ffcc00"
      : "#ff5050";

  return (
    <section id="results-section" style={{ padding: "40px 20px 80px" }}>
      <h2
        style={{
          textAlign: "center",
          color: "#00ff88",
          marginBottom: "30px",
          fontSize: "28px",
        }}
      >
        Decision DNA Report
      </h2>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#121212",
          padding: "35px",
          borderRadius: "20px",
          border: "1px solid #00d9ff",
          boxShadow: "0 0 30px rgba(0,217,255,0.1)",
          animation: "fadeInUp 0.5s ease forwards",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "24px",
            paddingBottom: "20px",
            borderBottom: "1px solid rgba(0,255,136,0.15)",
          }}
        >
          <div>
            <h3 style={{ color: "#00ff88", fontSize: "22px", fontWeight: 700 }}>
              {result.match}
            </h3>
            <p style={{ color: "#888", marginTop: "4px" }}>
              Incident Type: <span style={{ color: "#00d9ff" }}>{result.incident}</span>
            </p>
          </div>
          <div
            style={{
              background: "rgba(0,255,136,0.1)",
              border: "1px solid rgba(0,255,136,0.3)",
              borderRadius: "10px",
              padding: "8px 16px",
              fontSize: "14px",
              color: "#00ff88",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            📋 {result.rule}
          </div>
        </div>

        {/* Decision Banner */}
        <div
          style={{
            background: "rgba(0,255,136,0.08)",
            border: "2px solid rgba(0,255,136,0.3)",
            borderRadius: "14px",
            padding: "20px 24px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span style={{ fontSize: "32px" }}>🏁</span>
          <div>
            <div style={{ color: "#888", fontSize: "13px", marginBottom: "4px" }}>
              DECISION
            </div>
            <div style={{ color: "#00ff88", fontSize: "24px", fontWeight: 800 }}>
              {result.decision}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <MetricCard label="Confidence" value={result.confidence} color="green" />
          <MetricCard label="Expert Agreement" value={result.agreement} color="cyan" />
          <MetricCard label="Controversy" value={result.controversy} color="green" />
        </div>

        {/* Confidence bar */}
        <div
          style={{
            background: "#181818",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span style={{ color: "#888", fontSize: "13px" }}>
              CONFIDENCE LEVEL
            </span>
            <span style={{ color: "#00ff88", fontWeight: 700 }}>
              {result.confidence}
            </span>
          </div>
          <ConfidenceBar value={result.confidence} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
              marginBottom: "8px",
            }}
          >
            <span style={{ color: "#888", fontSize: "13px" }}>
              EXPERT AGREEMENT
            </span>
            <span style={{ color: "#00d9ff", fontWeight: 700 }}>
              {result.agreement}
            </span>
          </div>
          <div
            style={{
              height: "8px",
              background: "rgba(0,217,255,0.15)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${agreementNum}%`,
                background: "linear-gradient(90deg, #00d9ff, #0066ff)",
                borderRadius: "4px",
                transition: "width 1s ease-in-out",
              }}
            />
          </div>
        </div>

        {/* Controversy badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: `rgba(${
              result.controversy === "Low"
                ? "0,255,136"
                : result.controversy === "Medium"
                ? "255,204,0"
                : "255,80,80"
            },0.1)`,
            border: `1px solid ${controversyColor}`,
            borderRadius: "8px",
            padding: "6px 14px",
            marginBottom: "20px",
            fontSize: "14px",
            color: controversyColor,
            fontWeight: 600,
          }}
        >
          {result.controversy === "Low"
            ? "✅"
            : result.controversy === "Medium"
            ? "⚠️"
            : "🔴"}{" "}
          Controversy Level: {result.controversy}
        </div>

        {/* Reasoning */}
        <div
          style={{
            background: "#181818",
            borderLeft: "4px solid #00d9ff",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <h4
            style={{
              color: "#00d9ff",
              marginBottom: "10px",
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
            }}
          >
            📖 Reasoning
          </h4>
          <p style={{ color: "#cccccc", lineHeight: 1.7 }}>{result.reasoning}</p>
        </div>

        {/* Timeline */}
        <div
          style={{
            background: "#181818",
            borderLeft: "4px solid #00ff88",
            padding: "24px",
            borderRadius: "10px",
          }}
        >
          <h4
            style={{
              color: "#00ff88",
              marginBottom: "20px",
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
            }}
          >
            ⏱ Decision Timeline
          </h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {result.timeline.map((step, i) => (
              <TimelineStep
                key={i}
                step={step}
                index={i}
                total={result.timeline.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HistorySection() {
  const [history, setHistory] = useState<
    {
      match: string;
      incident: string;
      decision: string;
      confidence: string;
      date: string;
    }[]
  >([]);
  const [loaded, setLoaded] = useState(false);

  function loadHistory() {
    const h = JSON.parse(localStorage.getItem("decisionDNA") || "[]");
    setHistory([...h].reverse());
    setLoaded(true);
  }

  return (
    <section id="history" style={{ padding: "40px 20px 80px" }}>
      <h2
        style={{
          textAlign: "center",
          color: "#00ff88",
          marginBottom: "12px",
          fontSize: "28px",
        }}
      >
        Analysis History
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#888",
          marginBottom: "30px",
          fontSize: "15px",
        }}
      >
        Your previously analyzed incidents (stored locally in your browser)
      </p>

      {!loaded ? (
        <div style={{ textAlign: "center" }}>
          <button
            id="load-history-btn"
            onClick={loadHistory}
            style={{
              padding: "12px 30px",
              border: "1px solid #00ff88",
              borderRadius: "10px",
              background: "transparent",
              color: "#00ff88",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.background =
                "rgba(0,255,136,0.1)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.background = "transparent")
            }
          >
            Load History
          </button>
        </div>
      ) : history.length === 0 ? (
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
            padding: "60px 20px",
            color: "#555",
          }}
        >
          <span style={{ fontSize: "48px" }}>📋</span>
          <p style={{ marginTop: "12px" }}>No history yet. Start analyzing incidents!</p>
        </div>
      ) : (
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {history.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#121212",
                border: "1px solid rgba(0,255,136,0.25)",
                borderRadius: "16px",
                padding: "24px",
                animation: `fadeInUp 0.4s ease ${i * 0.08}s forwards`,
                opacity: 0,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.transform =
                  "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)")
              }
            >
              <h3
                style={{
                  color: "#00ff88",
                  fontSize: "17px",
                  marginBottom: "12px",
                }}
              >
                {item.match}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  fontSize: "14px",
                  color: "#ccc",
                }}
              >
                <p>
                  <b style={{ color: "#888" }}>Incident:</b> {item.incident}
                </p>
                <p>
                  <b style={{ color: "#888" }}>Decision:</b>{" "}
                  <span style={{ color: "#00d9ff" }}>{item.decision}</span>
                </p>
                <p>
                  <b style={{ color: "#888" }}>Confidence:</b> {item.confidence}
                </p>
                <p>
                  <b style={{ color: "#888" }}>Date:</b> {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function AboutSection() {
  const laws = [
    {
      title: "Law 11 — Offside",
      desc: "Analyzes player positioning relative to the last defender when the ball is played.",
      icon: "🚩",
    },
    {
      title: "Law 12 — Fouls & Misconduct",
      desc: "Covers penalties, red cards, yellow cards, dangerous play and violent conduct.",
      icon: "🟥",
    },
    {
      title: "Law 12 — Handball",
      desc: "Determines deliberate handball vs. accidental arm contact based on arm position.",
      icon: "🤚",
    },
    {
      title: "VAR Protocol",
      desc: "Simulates the Video Assistant Referee review process for contentious decisions.",
      icon: "📺",
    },
  ];

  return (
    <section id="about" style={{ padding: "40px 20px 80px" }}>
      <h2
        style={{
          textAlign: "center",
          color: "#00ff88",
          marginBottom: "12px",
          fontSize: "28px",
        }}
      >
        How It Works
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#888",
          marginBottom: "50px",
          fontSize: "15px",
          maxWidth: "500px",
          margin: "0 auto 50px",
        }}
      >
        Decision DNA uses FIFA Laws of the Game to analyze and explain
        referee decisions with confidence scoring.
      </p>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {laws.map((law, i) => (
          <div
            key={i}
            style={{
              background: "#121212",
              border: "1px solid rgba(0,217,255,0.2)",
              borderRadius: "16px",
              padding: "28px",
              transition: "all 0.3s",
              animation: `fadeInUp 0.5s ease ${i * 0.1}s forwards`,
              opacity: 0,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-6px)";
              el.style.borderColor = "rgba(0,217,255,0.5)";
              el.style.boxShadow = "0 10px 30px rgba(0,217,255,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.borderColor = "rgba(0,217,255,0.2)";
              el.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "16px" }}>
              {law.icon}
            </div>
            <h3
              style={{
                color: "#00d9ff",
                fontSize: "17px",
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              {law.title}
            </h3>
            <p style={{ color: "#999", lineHeight: 1.6, fontSize: "14px" }}>
              {law.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "#0d0d0d",
        borderTop: "1px solid rgba(0,255,136,0.2)",
        padding: "30px 50px",
        textAlign: "center",
        color: "#555",
        fontSize: "14px",
      }}
    >
      <div style={{ marginBottom: "8px" }}>
        <span style={{ color: "#00ff88", fontWeight: 700 }}>⚽ Decision DNA AI</span>
      </div>
      <p>
        AI-powered football decision analysis using FIFA Laws of the Game.
      </p>
      <p style={{ marginTop: "6px", fontSize: "12px" }}>
        API:{" "}
        <span style={{ color: "#00d9ff" }}>/api/analyze</span>
        {" "}(Next.js — no Python required)
      </p>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const analyzeSectionRef = useRef<HTMLElement>(null);

  function scrollToAnalyze() {
    analyzeSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection onAnalyzeClick={scrollToAnalyze} />
        <IncidentForm
          sectionRef={analyzeSectionRef}
          onResult={setResult}
          loading={loading}
          setLoading={setLoading}
        />
        <ResultsSection result={result} />
        <HistorySection />
        <AboutSection />
      </main>
      <Footer />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,136,0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(0,255,136,0); }
        }
        @media (max-width: 640px) {
          nav { padding: 16px 20px !important; }
        }
      `}</style>
    </>
  );
}

// useRef import
import { useRef } from "react";
