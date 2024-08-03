import os
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz 
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Suppress the huggingface_hub symlinks warning
os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING'] = '1'

# Print start message when the application starts
print(f"{datetime.datetime.now()} - Flask app started.")

def extract_text_from_pdf(pdf):
    print(f"{datetime.datetime.now()} - Starting PDF text extraction.")
    try:
        doc = fitz.open(stream=pdf.read(), filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        print(f"{datetime.datetime.now()} - Completed PDF text extraction.")
        return text
    except Exception as e:
        print(f"{datetime.datetime.now()} - Error during PDF text extraction: {str(e)}")
        raise

def format_answer(answer):
    if not answer.endswith('.'):
        answer += '.'
    return answer.capitalize()

def answer_question(question, context):
    try:
        print(f"{datetime.datetime.now()} - Starting question answering.")
        qa_pipeline = pipeline("question-answering", model="distilbert-base-uncased-distilled-squad")
        result = qa_pipeline(question=question, context=context)
        formatted_answer = format_answer(result['answer'])
        print(f"{datetime.datetime.now()} - Completed question answering.")
        return formatted_answer
    except Exception as e:
        print(f"{datetime.datetime.now()} - Error during question answering: {str(e)}")
        raise

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        print(f"{datetime.datetime.now()} - File upload request received.")
        if 'file' not in request.files and 'text' not in request.form:
            print(f"{datetime.datetime.now()} - No file or text part in the request.")
            return jsonify({"error": "No file or text part"}), 400

        if 'question' not in request.form:
            print(f"{datetime.datetime.now()} - No question provided.")
            return jsonify({"error": "No question provided"}), 400

        question = request.form['question']
        context = ""

        if 'file' in request.files:
            file = request.files['file']
            if file.filename == '':
                print(f"{datetime.datetime.now()} - No selected file.")
                return jsonify({"error": "No selected file"}), 400
            if file:
                context = extract_text_from_pdf(file)
        elif 'text' in request.form:
            context = request.form['text']

        if context:
            answer = answer_question(question, context)

            # Print end message when question is answered
            print(f"{datetime.datetime.now()} - Question answering ended.")

            return jsonify({"question": question, "answer": answer})
    except Exception as e:
        print(f"{datetime.datetime.now()} - Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
