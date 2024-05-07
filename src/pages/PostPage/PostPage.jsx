import React from 'react';
import logoImage from '../../assets/img-logo.png';
import achoImage from '../../assets/img-acho.png';
import linkImage from '../../assets/icon-link.svg';
import kakaoImage from '../../assets/icon-kakaotalk.svg';
import facebookImage from '../../assets/icon-facebook.svg';
import messageImage from '../../assets/icon-messages.svg';
import QuestionCard from './QuestionCard';

function PostPage() {
  return (
    <div className='flex flex-col h-[234px]'>
      <div className='bg-[#F9F9F9] bg-main1 bg-contain bg-no-repeat'>
        <div className='pt-[50px] gap-[20px] flex flex-col items-center justify-center'>
          <img className='w-[170px] h-[67px]' src={logoImage} alt="로고 이미지" />
          <img className='w-[136px] h-[136px]' src={achoImage} alt="프로필 사진" />
          <h2 className='font-[400] text-[32px] text-[#000000]'>아초는 고양이</h2>
          <div className='flex gap-[12px]'>
            <img className='w-[40px] h-[40px] rounded-[200px] py-[12px] px-[12px] bg-[#542F1A] cursor-pointer' src={linkImage} alt="링크로 공유" />
            <img className='w-[40px] h-[40px] rounded-[200px] py-[12px] px-[12px] bg-[#FEE500] cursor-pointer' src={kakaoImage} alt="카카오 톡으로로 공유" />
            <img className='w-[40px] h-[40px] rounded-[200px] py-[12px] px-[12px] bg-[#1877F2] cursor-pointer' src={facebookImage} alt="페이스북으로로 공유" />
          </div>
        </div>
      </div>
      <div className='flex justify-center pt-[40px] pb-[80px] bg-[#F9F9F9]'>
        <div className='flex flex-col items-center w-[716px] p-[16px] border-[1px] border-[#C7BBB5] rounded-[16px] gap-[18px] bg-[#F5F1EE]'>
          <div className='flex items-center gap-[8px]'>
            <img className='w-[24px] h-[24px]' src={messageImage} alt="메시지 이모티콘" />
            <span className='font-[400] text-[20px] text-[#542F1A]'>?개의 질문이 있습니다</span>
          </div>
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
        </div>
      </div>
    </div>
  )
}

export default PostPage