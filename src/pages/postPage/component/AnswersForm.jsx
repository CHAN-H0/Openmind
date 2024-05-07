import React, { useState } from "react";

function AnswersForm() {
  const [answers, setAnswers] = useState([]);
  const [answerTitle, setAnswerTitle] = useState("");
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editingAnswerTitle, setEditingAnswerTitle] = useState("");

  const addAnswer = (e) => {
    e.preventDefault(); // 폼의 기본 동작(페이지 새로고침) 방지
    setAnswers([
      ...answers,
      { id: crypto.randomUUID(), title: answerTitle, isDone: false },
    ]);
    setAnswerTitle(""); // 입력 필드 초기화
  };

  const deleteAnswer = (id) => {
    setAnswers(answers.filter((answer) => answer.id !== id));
  };

  const startEditing = (id, title) => {
    setEditingAnswerId(id);
    setEditingAnswerTitle(title);
  };

  const saveEditing = (id) => {
    setAnswers(
      answers.map((answer) =>
        answer.id === id ? { ...answer, title: editingAnswerTitle } : answer
      )
    );
    setEditingAnswerId(null);
    setEditingAnswerTitle("");
  };

  const isAnsweringEnabled = answers.length === 0;
  // 답변이 없는 경우에만 답변 입력 가능하도록 함

  return (
    <>
      <ul>
        {answers.map((answer) => (
          <div key={answer.id}>
            {editingAnswerId === answer.id ? (
              <>
                <input
                  type="text"
                  value={editingAnswerTitle}
                  onChange={(e) => setEditingAnswerTitle(e.target.value)}
                />
                <button onClick={() => saveEditing(answer.id)}>저장</button>
              </>
            ) : (
              <>
                <span>{answer.title}</span>
                <button onClick={() => deleteAnswer(answer.id)}>삭제</button>
                <button onClick={() => startEditing(answer.id, answer.title)}>
                  수정
                </button>
              </>
            )}
          </div>
        ))}
      </ul>
      <form onSubmit={addAnswer}>
        <input
          type="text"
          value={answerTitle}
          onChange={(e) => setAnswerTitle(e.target.value)}
          disabled={!isAnsweringEnabled}
        />
        <button type="submit" disabled={!isAnsweringEnabled}>
          등록하기
        </button>
      </form>
    </>
  );
}

export default AnswersForm;
