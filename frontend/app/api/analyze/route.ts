import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Types — mirrors Python's IncidentRequest / response dict exactly
// ---------------------------------------------------------------------------

interface IncidentRequest {
  match: string;
  incident: string;
  description: string;
}

interface AnalysisResponse {
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

// ---------------------------------------------------------------------------
// GET /api/analyze — health-check (mirrors Python's GET /)
// ---------------------------------------------------------------------------

export async function GET() {
  return NextResponse.json({ message: "Decision DNA API Running" });
}

// ---------------------------------------------------------------------------
// POST /api/analyze — full faithful port of Python's analyze_incident()
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  let body: IncidentRequest;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { detail: "Invalid JSON body" },
      { status: 422 }
    );
  }

  const { match, incident, description } = body;

  if (
    typeof match !== "string" ||
    typeof incident !== "string" ||
    typeof description !== "string"
  ) {
    return NextResponse.json(
      { detail: "Fields match, incident and description are required strings." },
      { status: 422 }
    );
  }

  // ── Defaults (same as Python) ──────────────────────────────────────────────
  let decision = "Further Review Required";
  let confidence = "75%";
  let rule = "VAR Protocol";
  let controversy = "Medium";
  let agreement = "78%";
  let reasoning =
    "The incident requires additional review before a final decision can be made.";
  let timeline: string[] = [
    "Incident Detected",
    "Referee Review",
    "VAR Analysis",
    "Final Recommendation",
  ];

  const text = description.toLowerCase();

  // ── OFFSIDE — Law 11 ───────────────────────────────────────────────────────
  if (incident === "Offside") {
    rule = "Law 11 - Offside";

    if (
      text.includes("ahead") ||
      text.includes("last defender") ||
      text.includes("behind defender") ||
      text.includes("offside")
    ) {
      decision = "Likely Offside";
      confidence = "94%";
      controversy = "Low";
      agreement = "92%";
      reasoning =
        "Attacker appears to be ahead of the last defender when the ball was played.";
      timeline = [
        "Pass Played",
        "Attacker Advanced",
        "Position Checked",
        "VAR Review",
        "Offside Confirmed",
      ];
    } else {
      decision = "Offside Not Clearly Established";
      confidence = "65%";
      controversy = "High";
      agreement = "70%";
      reasoning =
        "Not enough information is available to confirm an offside offence.";
      // timeline stays as default (not reassigned in Python either)
    }
  }

  // ── PENALTY — Law 12 ───────────────────────────────────────────────────────
  else if (incident === "Penalty") {
    rule = "Law 12 - Fouls and Misconduct";

    if (
      text.includes("trip") ||
      text.includes("push") ||
      text.includes("tackle") ||
      text.includes("contact") ||
      text.includes("foul")
    ) {
      decision = "Likely Penalty";
      confidence = "93%";
      controversy = "Low";
      agreement = "90%";
      reasoning =
        "The description suggests illegal contact inside the penalty area.";
      timeline = [
        "Attacker Entered Box",
        "Defender Made Contact",
        "Foul Assessed",
        "VAR Review",
        "Penalty Awarded",
      ];
    } else {
      decision = "Penalty Not Clearly Established";
      confidence = "68%";
      controversy = "High";
      agreement = "72%";
      reasoning =
        "The incident description does not clearly indicate a foul.";
      // timeline stays as default
    }
  }

  // ── RED CARD — Law 12 Serious Foul Play ────────────────────────────────────
  else if (incident === "Red Card") {
    rule = "Law 12 - Serious Foul Play";

    if (
      text.includes("dangerous") ||
      text.includes("violent") ||
      text.includes("elbow") ||
      text.includes("kick") ||
      text.includes("serious")
    ) {
      decision = "Likely Red Card";
      confidence = "91%";
      controversy = "Medium";
      agreement = "87%";
      reasoning =
        "The incident appears to involve serious foul play or violent conduct.";
      timeline = [
        "Dangerous Challenge",
        "Referee Review",
        "VAR Check",
        "Serious Foul Confirmed",
        "Red Card Issued",
      ];
    }
    // else: no else-branch in Python for Red Card — defaults remain
  }

  // ── HANDBALL — Law 12 Handball ─────────────────────────────────────────────
  else if (incident === "Handball") {
    rule = "Law 12 - Handball";

    if (
      text.includes("hand") ||
      text.includes("arm") ||
      text.includes("ball hit hand")
    ) {
      decision = "Likely Handball";
      confidence = "89%";
      controversy = "Medium";
      agreement = "85%";
      reasoning =
        "The ball appears to have made contact with the player's hand or arm.";
      timeline = [
        "Ball Contact Observed",
        "Arm Position Checked",
        "Intent Considered",
        "VAR Review",
        "Handball Confirmed",
      ];
    }
    // else: no else-branch in Python for Handball — defaults remain
  }

  // ── VAR Review — falls through to defaults (no explicit branch in Python) ──

  // ── Build response — every field present ──────────────────────────────────
  const response: AnalysisResponse = {
    match,
    incident,
    decision,
    confidence,
    rule,
    controversy,
    agreement,
    reasoning,
    timeline,
  };

  return NextResponse.json(response);
}
