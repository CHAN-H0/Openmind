import React, { useState, useEffect } from 'react';
import { getQuestionsByUserId } from '../../../api/api';

function Question({ id, subjectId }) {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const questionsData = await getQuestionsByUserId(id, subjectId);
        setQuestion(questionsData[3]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [id, subjectId]);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {question && (
        <div>
          <p>{question.content}</p>
        </div>
      )}
    </div>
  );
}

export default Question;
