from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IncidentRequest(BaseModel):
    match: str
    incident: str
    description: str


@app.get("/")
def home():
    return {
        "message": "Decision DNA API Running"
    }


@app.post("/analyze")
def analyze_incident(data: IncidentRequest):

    decision = "Further Review Required"
    confidence = "75%"
    rule = "VAR Protocol"

    controversy = "Medium"
    agreement = "78%"

    reasoning = (
        "The incident requires additional review before a final decision can be made."
    )

    timeline = [
        "Incident Detected",
        "Referee Review",
        "VAR Analysis",
        "Final Recommendation"
    ]

    text = data.description.lower()

    # OFFSIDE

    if data.incident == "Offside":

        rule = "Law 11 - Offside"

        if (
            "ahead" in text
            or "last defender" in text
            or "behind defender" in text
            or "offside" in text
        ):

            decision = "Likely Offside"
            confidence = "94%"
            controversy = "Low"
            agreement = "92%"

            reasoning = (
                "Attacker appears to be ahead of the last defender when the ball was played."
            )

            timeline = [
                "Pass Played",
                "Attacker Advanced",
                "Position Checked",
                "VAR Review",
                "Offside Confirmed"
            ]

        else:

            decision = "Offside Not Clearly Established"
            confidence = "65%"
            controversy = "High"
            agreement = "70%"

            reasoning = (
                "Not enough information is available to confirm an offside offence."
            )

    # PENALTY

    elif data.incident == "Penalty":

        rule = "Law 12 - Fouls and Misconduct"

        if (
            "trip" in text
            or "push" in text
            or "tackle" in text
            or "contact" in text
            or "foul" in text
        ):

            decision = "Likely Penalty"
            confidence = "93%"
            controversy = "Low"
            agreement = "90%"

            reasoning = (
                "The description suggests illegal contact inside the penalty area."
            )

            timeline = [
                "Attacker Entered Box",
                "Defender Made Contact",
                "Foul Assessed",
                "VAR Review",
                "Penalty Awarded"
            ]

        else:

            decision = "Penalty Not Clearly Established"
            confidence = "68%"
            controversy = "High"
            agreement = "72%"

            reasoning = (
                "The incident description does not clearly indicate a foul."
            )

    # RED CARD

    elif data.incident == "Red Card":

        rule = "Law 12 - Serious Foul Play"

        if (
            "dangerous" in text
            or "violent" in text
            or "elbow" in text
            or "kick" in text
            or "serious" in text
        ):

            decision = "Likely Red Card"
            confidence = "91%"
            controversy = "Medium"
            agreement = "87%"

            reasoning = (
                "The incident appears to involve serious foul play or violent conduct."
            )

            timeline = [
                "Dangerous Challenge",
                "Referee Review",
                "VAR Check",
                "Serious Foul Confirmed",
                "Red Card Issued"
            ]

    # HANDBALL

    elif data.incident == "Handball":

        rule = "Law 12 - Handball"

        if (
            "hand" in text
            or "arm" in text
            or "ball hit hand" in text
        ):

            decision = "Likely Handball"
            confidence = "89%"
            controversy = "Medium"
            agreement = "85%"

            reasoning = (
                "The ball appears to have made contact with the player's hand or arm."
            )

            timeline = [
                "Ball Contact Observed",
                "Arm Position Checked",
                "Intent Considered",
                "VAR Review",
                "Handball Confirmed"
            ]

    return {
        "match": data.match,
        "incident": data.incident,
        "decision": decision,
        "confidence": confidence,
        "rule": rule,
        "controversy": controversy,
        "agreement": agreement,
        "reasoning": reasoning,
        "timeline": timeline
    }