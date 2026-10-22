import React, { useState } from 'react';
import './HomeContainerAI.css';
import { useCallAskAiMutation } from '../../Api/aiApi';

function HomeContainerAI() {
        const [title, setTitle] = useState("Fictional Library Notice");
        const [content, setContent] = useState(
            "The community library opens at 9 AM on Monday. " +
            "A maintenance inspection is scheduled for Wednesday. " +
            "The library will remain open during normal business hours."
        );
        const [question, setQuestion] = useState(
            "When is the maintenance inspection?"
        );
        const [documentId, setDocumentId] = useState("");
        const [summary, setSummary] = useState("");
        const [answer, setAnswer] = useState("");
        const [sources, setSources] = useState([]);
        const [error, setError] = useState("");
        const [busy, setBusy] = useState(false);

        const [askAi] = useCallAskAiMutation();
  return (
    <div className="container-ai">
      <h1>Local AI Document Assistant</h1>
      <p>Prototype using React, ASP.NET Core and Ollama.</p>

      {error && <p role="alert" className="error">{error}</p>}

      <section>
        <h2>1. Add a synthetic document</h2>

        <label>
          Document title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Document text
          <textarea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        <button disabled={busy} 
        //onClick={() => run(addDocument)}
        >
          {busy ? "Processing..." : "Index document"}
        </button>

        {documentId && (
          <p>Indexed document ID: {documentId}</p>
        )}
      </section>

      <section>
        <h2>2. Summarize</h2>
        <button
          disabled={busy || !documentId}
          //onClick={() => run(summarize)}
        >
          Generate summary
        </button>

        {summary && <pre className="result">{summary}</pre>}
      </section>

      <section>
        <h2>3. Ask the documents</h2>

        <label>
          Your question
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>

        <button disabled={busy} 
        //onClick={() => run(askQuestion)}
        >
          Search and answer
        </button>

        {answer && (
          <>
            <h3>Answer</h3>
            <pre className="result">{answer}</pre>

            <h3>Retrieved sources</h3>
            {sources.map((source) => (
              <article 
              //key={source.citation}
              >
                {/* <strong>
                  [{source.citation}] {source.title}
                </strong>
                <p>{source.excerpt}</p>
                <small>
                  Chunk {source.chunkIndex}; similarity{" "}
                  {source.similarity}
                </small> */}
              </article>
            ))}
          </>
        )}
      </section>
    </div>
  )
}

export default HomeContainerAI