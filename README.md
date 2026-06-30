# ⚽ Decision DNA AI

An AI-powered referee and VAR decision explanation system that uses FIFA rules and historical football incidents to analyze and explain why football decisions (penalties, red cards, offsides, handballs, VAR reviews) are made.

---

## 📋 Project Structure

```
Decision_DNA/
├── backend/                  # FastAPI Python backend
│   ├── main.py               # API entry point — /analyze endpoint
│   ├── database.py           # Database setup
│   ├── models.py             # SQLAlchemy models
│   ├── schema.py             # Pydantic schemas
│   ├── services/
│   │   ├── ai_engine.py      # AI decision logic
│   │   ├── rule_engine.py    # FIFA rule matching engine
│   │   └── similarity_engine.py  # Historical case similarity
│   ├── requirements.txt      # Python dependencies
│   └── venv/                 # Python virtual environment
│
├── frontend/                 # Next.js 16 app (Tailwind CSS v4)
│   └── app/
│       ├── page.tsx          # Main page (Decision DNA UI)
│       ├── layout.tsx        # Root layout
│       └── globals.css       # Global styles
│
├── frontend-legacy/          # Original HTML/CSS/JS frontend
│   ├── index.html            # Main page
│   ├── history.html          # Decision history page
│   ├── style.css             # Dark green/cyan theme styles
│   └── script.js             # Fetch calls to backend /analyze
│
├── data/
│   ├── fifa_rules.json       # FIFA Laws of the Game reference data
│   └── historical_cases.json # Historical football incident cases
│
└── README.md
```

---

## 🚀 How to Run

### 1. Python Backend (FastAPI)

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn pydantic

# Start the server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The API will be available at: `http://127.0.0.1:8000`

**Endpoints:**
- `GET /` — Health check
- `POST /analyze` — Analyze a football incident

### 2. Legacy HTML Frontend

Simply open `frontend-legacy/index.html` in a browser (make sure the backend is running on port 8000).

### 3. Next.js Frontend

```bash
cd frontend

# Install dependencies (uses pnpm)
pnpm install

# Start the dev server
pnpm dev
```

The app will be available at: `http://localhost:3000`

---

## 🛠 Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Backend       | Python 3.12, FastAPI, Uvicorn       |
| API Schema    | Pydantic                            |
| Frontend (new)| Next.js 16, React 19, TypeScript    |
| Styling       | Tailwind CSS v4                     |
| Frontend (old)| Vanilla HTML, CSS, JavaScript       |
| Data          | JSON (FIFA rules + historical cases)|

---

## 🔌 API Usage

**POST** `/analyze`

```json
{
  "match": "France vs Germany",
  "incident": "Penalty",
  "description": "Defender pushed attacker inside penalty area causing him to fall."
}
```

**Response:**
```json
{
  "match": "France vs Germany",
  "incident": "Penalty",
  "decision": "Likely Penalty",
  "confidence": "93%",
  "rule": "Law 12 - Fouls and Misconduct",
  "controversy": "Low",
  "agreement": "90%",
  "reasoning": "The description suggests illegal contact inside the penalty area.",
  "timeline": ["Attacker Entered Box", "Defender Made Contact", "Foul Assessed", "VAR Review", "Penalty Awarded"]
}
```

---

## ⚙️ Environment Variables

No environment variables are required for the default setup. The frontend calls the backend at `http://127.0.0.1:8000` by default.

If deploying to a different host, update the API base URL in `frontend/app/page.tsx`.

---

## 📌 Supported Incident Types

- **Penalty** — Law 12 (Fouls and Misconduct)
- **Red Card** — Law 12 (Serious Foul Play)
- **Offside** — Law 11 (Offside)
- **Handball** — Law 12 (Handball)
- **VAR Review** — VAR Protocol