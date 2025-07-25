import React, { useState } from 'react';

// Mock data for demonstration
const mockHistory = [
  {
    id: 1,
    date: '2024-05-01',
    title: 'Maths Midterm',
    totalMarks: 80,
    questions: [
      { chapter: 'Chapter 1', type: 'mcq', difficulty: 'easy', marks: 2, question: 'What is 2+2?', answer: '4' },
      { chapter: 'Chapter 2', type: 'short', difficulty: 'medium', marks: 5, question: 'Explain Pythagoras theorem.', answer: 'A^2 + B^2 = C^2' },
    ],
  },
  {
    id: 2,
    date: '2024-04-15',
    title: 'Physics Unit Test',
    totalMarks: 50,
    questions: [
      { chapter: 'Chapter 3', type: 'long', difficulty: 'hard', marks: 10, question: 'Describe Newton’s Laws.', answer: 'First, Second, Third Laws...' },
    ],
  },
];

const History = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="history-container">
      <h2>Generated Papers History</h2>
      <div className="history-list">
        {mockHistory.map(paper => (
          <div key={paper.id} className="history-card">
            <div className="history-header">
              <div>
                <strong>{paper.title}</strong> <span className="history-date">({paper.date})</span>
              </div>
              <div>Total Marks: {paper.totalMarks}</div>
              <button className="view-btn" onClick={() => setSelected(paper)}>View Details</button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{selected.title} ({selected.date})</h3>
            <div><strong>Total Marks:</strong> {selected.totalMarks}</div>
            <h4>Questions</h4>
            <ol>
              {selected.questions.map((q, idx) => (
                <li key={idx}>
                  <strong>[{q.chapter}] [{q.type.toUpperCase()}] [{q.difficulty}] ({q.marks} marks):</strong> {q.question}
                </li>
              ))}
            </ol>
            <h4>Answer Key</h4>
            <ol>
              {selected.questions.map((q, idx) => (
                <li key={idx}><strong>Q{idx + 1}:</strong> {q.answer}</li>
              ))}
            </ol>
            <button className="close-btn" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}

      <style>{`
        .history-container { max-width: 700px; margin: 40px auto; background: #fff; padding: 32px 24px; border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
        .history-list { display: flex; flex-direction: column; gap: 18px; }
        .history-card { background: #f7f7f7; border-radius: 8px; padding: 18px 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); display: flex; justify-content: space-between; align-items: center; }
        .history-header { display: flex; flex-direction: column; gap: 6px; }
        .history-date { color: #888; font-size: 13px; margin-left: 8px; }
        .view-btn, .close-btn { background: #1976d2; color: #fff; border: none; border-radius: 4px; padding: 7px 16px; font-weight: 600; cursor: pointer; margin-top: 8px; }
        .close-btn { background: #e53935; margin-left: 12px; }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: #fff; border-radius: 10px; padding: 32px 24px; max-width: 500px; width: 100%; box-shadow: 0 2px 12px rgba(0,0,0,0.18); position: relative; }
        ol { padding-left: 22px; }
      `}</style>
    </div>
  );
};

export default History;
