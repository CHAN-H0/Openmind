import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData, fetchQuestionsByUser } from '../../api/api';
import logoImage from '../../assets/img-logo.png';
import achoImage from '../../assets/img-acho.png';
import emptyImage from '../../assets/img-no-questions-asked.png';
import messageImage from '../../assets/icon-messages.svg';
import QuestionCard from './components/QuestionCard';
import Share from './components/Share';
import QuestionModal from '../QuestionPage/components/QuestionModal';

function PostPage() {
  const [questionCardCount, setQuestionCardCount] = useState(1);

  const nav = useNavigate();

  const onMoveBack = () => {
    nav(-1);
  };

  const popUpModal = () => {
    // 내용 작성
  };

  const [userData, setUserData] = useState('');
  const [questionData, setQuestionData] = useState([]);

  // 컴포넌트가 마운트될 때 API를 호출해 이름 가져옴
  useEffect(() => {
    async function fetchName() {
      try {
        const userDatas = await getUserData(5637);
        setUserData(userDatas);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다.', error);
      }
    }
    fetchName();
  }, []);

  // 사용자 데이터가 변경될 때마다 질문 데이터를 가져와 상태 설정
  useEffect(() => {
    async function fetchQuestionsWrapper() {
      await fetchQuestionsByUser(userData, setQuestionData);
    }
    fetchQuestionsWrapper();
  }, [userData]);

  // 새로운 질문을 추가해 상태 업데이트
  const addQuestion = (newQuestion) => {
    setQuestionData((prevQuestions) => [newQuestion, ...prevQuestions]);
  };

  return (
    <div className="flex flex-col h-[234px]">
      <div className="bg-[#F9F9F9] bg-main1 bg-contain bg-no-repeat">
        <div className="pt-[50px] gap-[20px] flex flex-col items-center justify-center">
          <Link to="/">
            <img
              className="w-[170px] h-[67px]"
              src={logoImage}
              alt="로고 이미지"
            />
          </Link>
          <img
            className="w-[136px] h-[136px]"
            src={achoImage}
            alt="프로필 사진"
          />
          <h2 className="font-[400] text-[32px] text-[#000000]">
            아초는 고양이
          </h2>
          <Share />
        </div>
      </div>
      <div className="flex justify-center pt-[30px] pb-[80px] bg-[#F9F9F9]">
        <div className="flex flex-col items-center w-[716px] p-[16px] border-[1px] border-[#C7BBB5] rounded-[16px] gap-[18px] bg-[#F5F1EE]">
          <div className="flex items-center gap-[8px]">
            {questionCardCount === 0 ? (
              <div className="flex flex-col items-center gap-2 w-[716px] h-[330px]">
                <div className="flex justify-center gap-2">
                  <img
                    className="w-[24px] h-[24px]"
                    src={messageImage}
                    alt="메시지 이모티콘"
                  />
                  <span className="font-[400] text-[20px] text-[#542F1A]">
                    아직 질문이 없습니다.
                  </span>
                </div>
                <img
                  className="w-[150px] h-[154px] translate-y-[30%]"
                  src={emptyImage}
                  alt="비어있는 상태 이미지"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-2">
                  <img
                    className="w-[24px] h-[24px]"
                    src={messageImage}
                    alt="메시지 이모티콘"
                  />
                  <span className="font-[400] text-[20px] text-[#542F1A]">
                    {questionCardCount}개의 질문이 있습니다.
                  </span>
                </div>
                <QuestionCard isAskPage />
              </div>
            )}
          </div>
          {/* 카드 데이터를 받아오게끔 구현 
          {cardList?.map((card) => (
            <QuestionCard item={card} key={card.id} />
          ))}
          */}
          <QuestionCard />
        </div>
      </div>
      <div className="relative flex justify-between bottom-[80px] px-[30px]">
        <button
          className="rounded-[200px] py-[12px] px-[24px] bg-[#542F1A] text-[20px] text-[#FFFFFF] font-[400]"
          onClick={onMoveBack}
        >
          뒤로 가기
        </button>
        <QuestionModal
          userData={userData}
          onQuestionSubmitted={addQuestion}
          className="rounded-[200px] py-[12px] px-[24px] bg-[#542F1A] text-[20px] text-[#FFFFFF] font-[400]"
        />
      </div>
    </div>
  );
}

export default PostPage;
