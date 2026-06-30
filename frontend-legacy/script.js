async function generateDecision() {

    const match =
        document.getElementById("matchName").value;

    const incident =
        document.getElementById("incidentType").value;

    const description =
        document.getElementById("incidentText").value;

    const response = await fetch(
        "http://127.0.0.1:8000/analyze",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                match: match,
                incident: incident,
                description: description
            })
        }
    );

    const data = await response.json();

    document.getElementById("results").innerHTML = `

    <h2 style="color:#00ff88;">
        DECISION DNA REPORT
    </h2>

    <p><b>Match:</b> ${data.match}</p>

    <p><b>Incident:</b> ${data.incident}</p>

    <p><b>Decision:</b> ${data.decision}</p>

    <p><b>Confidence:</b> ${data.confidence}</p>

    <p><b>Rule:</b> ${data.rule}</p>

    `;
}