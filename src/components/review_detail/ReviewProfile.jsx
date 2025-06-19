// src/components/review/ReviewProfile.jsx
import React from "react";
import styled from "styled-components";
import "../../styles/color.css";

// 스타일드 컴포넌트 정의
const ReviewProfileContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #fff;
  border-top: 1px solid #000001;
`;

const ProfileImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%; /* 원형으로 표현 */
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.75rem;
`;

const NameText = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const SubInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: -0.2rem;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  color: ${(props) => (props.active ? "var(--coral-main)" : "#ccc")};
  font-size: 1.3rem;
  margin-right: 0.125rem;
`;

const DateText = styled.span`
  font-size: 0.75rem;
  color: var(--gray-600);
  margin-left: 0.5rem;
`;

// ReviewProfile 컴포넌트 구현
const ReviewProfile = ({ profileImage, name, rating, date }) => {
  const totalStars = 5;

  // rating 값에 따라 활성화된 별(★)과 비활성화된 별(☆)을 보여줍니다.
  const stars = Array.from({ length: totalStars }, (_, index) => (
    <Star key={index} active={index < rating}>
      ★
    </Star>
  ));

  return (
    <ReviewProfileContainer>
      <ProfileImage
        src="/img/profile-default.svg"
        alt={`${name}의 프로필 사진`}
      />
      <InfoContainer>
        <NameText>{name}</NameText>
        <SubInfoContainer>
          <RatingContainer>{stars}</RatingContainer>
          <DateText>{date}</DateText>
        </SubInfoContainer>
      </InfoContainer>
    </ReviewProfileContainer>
  );
};

export default ReviewProfile;
