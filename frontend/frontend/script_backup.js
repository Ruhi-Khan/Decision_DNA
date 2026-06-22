function generateDecision() {

    const match = document.getElementById("matchName").value;
    const incident = document.getElementById("incidentType").value;
    const description = document.getElementById("incidentText").value;

    let decision = "";
    let rule = "";
    let confidence = "";

    if (incident === "Penalty") {
        decision = "Likely Penalty";
        rule = "Law 12";
        confidence = "94%";
    }

    else if (incident === "Offside") {
        decision = "Likely Offside";
        rule = "Law 11";
        confidence = "92%";
    }

    else if (incident === "Handball") {
        decision = "Likely Handball";
        rule = "Law 12";
        confidence = "90%";
    }

    else if (incident === "Red Card") {
        decision = "Likely Red Card";
        rule = "Law 12";
        confidence = "88%";
    }

    else {
        decision = "VAR Review Required";
        rule = "VAR Protocol";
        confidence = "75%";
    }

const report = {
    match,
    incident,
    decision,
    rule,
    confidence,
    description,
    date: new Date().toLocaleString()
};

let history =
    JSON.parse(localStorage.getItem("decisionDNA")) || [];

history.push(report);

localStorage.setItem(
    "decisionDNA",
    JSON.stringify(history)
);





    document.getElementById("results").innerHTML = `
        <h2>Decision DNA Report</h2>

        <p><b>Match:</b> ${match}</p>

        <p><b>Incident:</b> ${incident}</p>

        <p><b>Decision:</b> ${decision}</p>

        <p><b>Rule Applied:</b> ${rule}</p>

        <p><b>Confidence:</b> ${confidence}</p>

        <p><b>Description:</b> ${description}</p>
    `;
}