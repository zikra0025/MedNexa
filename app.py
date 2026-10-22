
from flask import Flask, request, jsonify
from urllib.request import Request, urlopen
from urllib.error import URLError
import json

app = Flask(__name__, static_folder=".", static_url_path="")

@app.route("/")
def home():
    return app.send_static_file("index.html")

@app.route("/api/health")
def health_check():
    return jsonify({
        "status": "ok",
        "app": "MedNexa",
        "ai_model": "gemma4:e2b"
    })

@app.route("/api/ask", methods=["POST"])
def ask_gemma():
    data = request.get_json(silent=True) or {}
    question = str(data.get("question", "")).strip()

    if not question:
        return jsonify({"error": "Please enter a question."}), 400

    prompt = (
        "You are MedNexa, a medicine information assistant. "
        "Give clear, simple general information. Never diagnose, "
        "change prescribed doses, or tell users to stop medication. "
        "For personal medicine decisions, advise consulting a doctor "
        "or pharmacist. You may explain medicine labels, but do not "
        "guess missing information.\n\n"
        "User question: " + question
    )

    payload = json.dumps({
        "model": "gemma4:e2b",
        "prompt": prompt,
        "stream": False
    }).encode("utf-8")

    req = Request(
        "http://127.0.0.1:11434/api/generate",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urlopen(req, timeout=180) as response:
            result = json.loads(response.read().decode("utf-8"))
        return jsonify({"answer": result.get("response", "")})

    except Exception:
        return jsonify({
            "error": "Gemma is not responding yet. Please try again."
        }), 503

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
