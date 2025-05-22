// src/components/review/ReviewThumbs.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import "../../styles/color.css";

// 전체 컨테이너
const ThumbsContainer = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  gap: 0.5rem; /* 버튼 간격 */
  padding-top: 1rem;

  background-color: #fff;
`;

// 각 버튼 스타일
const ThumbsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px; /* 이미지와 텍스트 간격 */
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => (props.active ? 'var(--coral-main)' : '#ccc')};
  border-radius: 1.25rem;
  background-color: var(--white);
  cursor: pointer;
  font-size: 0.875rem;
  color: ${props => (props.active ? 'var(--coral-main)' : 'var(--gray-900)')};
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;

  img {
    width: 1rem;
    height: 1rem;
    object-fit: contain;
  }
`;

function ReviewThumbs() {
  // 초기 개수 및 토글 상태
  const [likeCount, setLikeCount] = useState(61);
  const [confusedCount, setConfusedCount] = useState(10);

  const [isLikeActive, setIsLikeActive] = useState(false);
  const [isConfusedActive, setIsConfusedActive] = useState(false);

  // '공감해요' 버튼 클릭 처리
  const handleLikeClick = () => {
    if (isLikeActive) {
      setIsLikeActive(false);
      setLikeCount(likeCount - 1);
    } else {
      setIsLikeActive(true);
      setLikeCount(likeCount + 1);
    }
  };

  // '모르겠어요' 버튼 클릭 처리
  const handleConfusedClick = () => {
    if (isConfusedActive) {
      setIsConfusedActive(false);
      setConfusedCount(confusedCount - 1);
    } else {
      setIsConfusedActive(true);
      setConfusedCount(confusedCount + 1);
    }
  };

  return (
    <ThumbsContainer>
      {/* 공감해요 버튼 */}
      <ThumbsButton active={isLikeActive} onClick={handleLikeClick}>
        <IconWrapper>
          <img src="/img/icon_thumbsup.png" alt="Thumbs Up" />
        </IconWrapper>
        <span>{likeCount}명이 공감해요</span>
      </ThumbsButton>

      {/* 모르겠어요 버튼 */}
      <ThumbsButton active={isConfusedActive} onClick={handleConfusedClick}>
        <IconWrapper>
          <img src="/img/icon_thumbsdown.png" alt="Thumbs Down" />
        </IconWrapper>
        <span>{confusedCount}명이 모르겠대요</span>
      </ThumbsButton>
    </ThumbsContainer>
  );
}

export default ReviewThumbs;
