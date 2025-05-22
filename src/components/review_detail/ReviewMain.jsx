// src/components/review/ReviewMain.jsx
import React from 'react';
import styled from 'styled-components';
import "../../styles/color.css";
import BookmarkToggle from '../common/BookMarkToggle';

const ReviewMainContainer = styled.div`
  /* 전체 컨테이너 스타일 */
  
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #fff;
`;

const TitleContainer = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  `;

const StoreName = styled.h1`
  /* 가게 이름 스타일: 볼드체 */
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
`;


const ImageScrollContainer = styled.div`
  /* 가게 사진 영역: 가로 스크롤 */
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
`;

const StoreImage = styled.img`
  /* 사진 크기 및 스타일 */
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.25rem;
`;

const ReviewContent = styled.p`
  /* 리뷰 본문 스타일 */
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #333;
`;

const TagContainer = styled.div`
  /* 태그 리스트 */
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  /* 개별 태그 스타일 */
  padding: 0.25rem 0.5rem;
  background-color: #ffffff;
  border : 1px solid #ff6f61;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  color: #000000;
`;



function ReviewMain({ storeName, images, content, tags }) {
  return (
    <ReviewMainContainer>
      {/* 1. 가게 이름, 북마크 버튼 영역역 */}
      <TitleContainer>
        <StoreName>{storeName}</StoreName>
        <BookmarkToggle />
      </TitleContainer>
      

      {/* 2. 가게 사진 (가로 스크롤) */}
      <ImageScrollContainer>
        {images.map((img, index) => (
          <StoreImage 
            key={index} 
            src={img} 
            alt={`${storeName} 사진 ${index + 1}`} 
          />
        ))}
      </ImageScrollContainer>

      {/* 3. 가게 리뷰 본문 */}
      <ReviewContent>{content}</ReviewContent>

      {/* 4. 가게 태그 */}
      <TagContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
    </ReviewMainContainer>
  );
}

export default ReviewMain;
