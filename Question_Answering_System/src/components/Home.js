// Home.js
import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

const Home = () => {
  const optionsRef = useRef([]);
  const vantaRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const options = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, options);

    optionsRef.current.forEach(option => {
      if (option) {
        observer.observe(option);
      }
    });

    return () => {
      optionsRef.current.forEach(option => {
        if (option) {
          observer.unobserve(option);
        }
      });
    };
  }, []);

  useEffect(() => {
    const vantaEffect = NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!file && !text) {
      setError("Please provide a PDF file or text.");
      return;
    }
    if (!question) {
      setError("Please provide a question.");
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else {
      formData.append('text', text);
    }
    formData.append('question', question);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setAnswer(data.answer);
        setError("");
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Error uploading file");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="home">
      <div className="video-container">
        <video autoPlay loop muted>
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="overlay">
          <h2>Access Denied X</h2>
          <h3>Question Answering System</h3>
          <ul>
            <li>Team Members:</li>
            <li>Akshaya Katepally</li>
            <li>Medagam Shishira Reddy</li>
            <li>Varshita Pasala</li>
          </ul>
        </div>
      </div>

      <div className="qna-container" ref={vantaRef}>
        <div className="qna-content">
          <h1>QnA System</h1>
          <p>Upload a PDF file or enter text along with a question to get an answer.</p>
          <form onSubmit={handleFormSubmit}>
            <div className="input-container">
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text here"
              />
            </div>
            <input type="file" onChange={handleFileChange} />
            <input
              type="text"
              value={question}
              onChange={handleQuestionChange}
              placeholder="Enter your question"
            />
            <button type="submit">Get Answer</button>
          </form>
          {error && <p className="error">{error}</p>}
          {answer && (
            <div className="qna-answer">
              <p><strong>Answer:</strong> {answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
