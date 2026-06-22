import sqlite3

DB_NAME = "database/decision_dna.db"

def create_table():

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS reports(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        match_name TEXT,
        incident TEXT,
        decision TEXT,
        confidence TEXT,
        description TEXT
    )
    """)

    conn.commit()
    conn.close()


def save_report(match_name,
                incident,
                decision,
                confidence,
                description):

    conn = sqlite3.connect(DB_NAME)

    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO reports
    (match_name, incident, decision,
     confidence, description)

    VALUES (?, ?, ?, ?, ?)
    """,
    (
        match_name,
        incident,
        decision,
        confidence,
        description
    ))

    conn.commit()
    conn.close()


def get_reports():

    conn = sqlite3.connect(DB_NAME)

    cursor = conn.cursor()

    cursor.execute("""
    SELECT *
    FROM reports
    ORDER BY id DESC
    """)

    reports = cursor.fetchall()

    conn.close()

    return reports