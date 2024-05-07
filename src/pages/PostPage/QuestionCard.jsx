import React from 'react';
import thumbsButton from '../../assets/icon-thumbs-up.svg';
import thumbsDownButton from '../../assets/icon-thumbs-down.svg';
import Questions from './component/Questions';
import AnswersForm from './component/AnswersForm';

function QuestionCard() {
  const [questionData, setQuestionData] = React.useState(null);
  const isAnsweringEnabled = questionData && questionData.length === 0;

  return (
    <div className='flex flex-col p-[32px] w-[684px] bg-[#FFFFFF] rounded-[16px] gap-[32px]'>
      <div>답변</div>
      <div>
        <span>질문 * 기간</span>
        <Questions subjectId = {5637} setQuestionData={setQuestionData}/> 
        {/* 임시값 */}
      </div>
      <div className='flex'>
        <img src="" alt="프로필 사진" />
        <div className='flex flex-col'>
          <h3>작성자 <span>기간</span></h3>
          <AnswersForm isAnsweringEnabled={isAnsweringEnabled} />
        </div> 
      </div>
      <div className='flex items-center gap-[32px]'>
        <div className='flex gap-[6px]'>
          <img className='w-[24px] h-[24px] cursor-pointer' src={thumbsButton} alt="좋아요 버튼" />
          <span>좋아요</span>
        </div>
        <div className='flex gap-[6px]'>
          <img className='w-[24px] h-[24px] cursor-pointer' src={thumbsDownButton} alt="싫어요 버튼" />
          <span>싫어요</span>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard;