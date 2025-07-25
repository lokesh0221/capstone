import React, { useState } from 'react';

const chapterOptions = [
  'Chapter 1',
  'Chapter 2',
  'Chapter 3',
  'Chapter 4',
  'Chapter 5',
];

const questionTypes = [
  { label: 'MCQ', value: 'mcq' },
  { label: 'Short Answer', value: 'short' },
  { label: 'Long Answer', value: 'long' },
];

const difficultyLevels = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

const defaultQuestion = {
  chapter: '',
  type: 'mcq',
  difficulty: 'easy',
  marks: '',
  question: '',
  answer: '',
};

const GenerateQuestionPaper = () => {
  const [questions, setQuestions] = useState([{ ...defaultQuestion }]);
  const [totalMarks, setTotalMarks] = useState('');
  const [generated, setGenerated] = useState(false);

  const handleQuestionChange = (idx, field, value) => {
    const updated = [...questions];
    updated[idx][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { ...defaultQuestion }]);
  };

  const removeQuestion = (idx) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setGenerated(true);
  };

  const totalAssignedMarks = questions.reduce((sum, q) => sum + Number(q.marks || 0), 0);

  return (
    <div className="generate-container">
      <h2>Intelligent Question Paper Generator</h2>
      <form onSubmit={handleGenerate} className="generate-form">
        <div className="form-group">
          <label>Total Marks for Paper:</label>
          <input
            type="number"
            min="1"
            value={totalMarks}
            onChange={e => setTotalMarks(e.target.value)}
            required
          />
        </div>
        <hr />
        <h3>Questions</h3>
        {questions.map((q, idx) => (
          <div key={idx} className="question-block">
            <div className="form-row">
              <label>Chapter:</label>
              <select
                value={q.chapter}
                onChange={e => handleQuestionChange(idx, 'chapter', e.target.value)}
                required
              >
                <option value="">Select Chapter</option>
                {chapterOptions.map(ch => (
                  <option key={ch} value={ch}>{ch}</option>
                ))}
              </select>
              <label>Type:</label>
              <select
                value={q.type}
                onChange={e => handleQuestionChange(idx, 'type', e.target.value)}
              >
                {questionTypes.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <label>Difficulty:</label>
              <select
                value={q.difficulty}
                onChange={e => handleQuestionChange(idx, 'difficulty', e.target.value)}
              >
                {difficultyLevels.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
              <label>Marks:</label>
              <input
                type="number"
                min="1"
                value={q.marks}
                onChange={e => handleQuestionChange(idx, 'marks', e.target.value)}
                required
              />
              <button type="button" onClick={() => removeQuestion(idx)} disabled={questions.length === 1} className="remove-btn">Remove</button>
            </div>
            <div className="form-row">
              <label>Question:</label>
              <input
                type="text"
                value={q.question}
                onChange={e => handleQuestionChange(idx, 'question', e.target.value)}
                required
                placeholder="Enter question text"
              />
              <label>Answer:</label>
              <input
                type="text"
                value={q.answer}
                onChange={e => handleQuestionChange(idx, 'answer', e.target.value)}
                required
                placeholder="Enter answer key"
              />
            </div>
          </div>
        ))}
        <div className="form-group">
          <button type="button" onClick={addQuestion} className="add-btn">Add Question</button>
        </div>
        <div className="form-group">
          <strong>Total Assigned Marks: {totalAssignedMarks}</strong>
          {totalMarks && Number(totalMarks) !== totalAssignedMarks && (
            <span className="warning"> (Assigned marks do not match total marks!)</span>
          )}
        </div>
        <button type="submit" className="generate-btn">Generate Paper & Answer Key</button>
      </form>

      {generated && (
        <div className="output-section">
          <h3>Generated Question Paper</h3>
          <ol>
            {questions.map((q, idx) => (
              <li key={idx}>
                <strong>[{q.chapter}] [{q.type.toUpperCase()}] [{q.difficulty}] ({q.marks} marks):</strong> {q.question}
              </li>
            ))}
          </ol>
          <h3>Answer Key</h3>
          <ol>
            {questions.map((q, idx) => (
              <li key={idx}>
                <strong>Q{idx + 1}:</strong> {q.answer}
              </li>
            ))}
          </ol>
        </div>
      )}

      <style>{`
        .generate-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 32px 24px; border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
        .generate-form { margin-bottom: 32px; }
        .form-group { margin-bottom: 18px; }
        .form-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 10px; }
        .question-block { background: #f7f7f7; border-radius: 8px; padding: 18px 12px; margin-bottom: 18px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
        label { font-weight: 500; margin-right: 6px; }
        input, select { padding: 6px 8px; border-radius: 4px; border: 1px solid #ccc; min-width: 120px; }
        .add-btn, .remove-btn, .generate-btn { background: #4CAF50; color: #fff; border: none; border-radius: 4px; padding: 7px 16px; font-weight: 600; cursor: pointer; margin-left: 8px; }
        .remove-btn { background: #e53935; }
        .add-btn { background: #1976d2; }
        .generate-btn { background: #4CAF50; margin-top: 10px; }
        .warning { color: #e53935; margin-left: 8px; font-weight: 500; }
        .output-section { background: #f9f9f9; border-radius: 8px; padding: 24px 18px; margin-top: 32px; box-shadow: 0 1px 6px rgba(0,0,0,0.06); }
        ol { padding-left: 22px; }
      `}</style>
    </div>
  );
};

export default GenerateQuestionPaper;
