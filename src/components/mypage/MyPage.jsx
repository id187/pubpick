import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const MyPage = () => {
  const navigate = useNavigate();

  const nickname = localStorage.getItem("nickname") || "닉네임 없음";
  const email = localStorage.getItem("email") || "이메일 없음";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("email");
    alert("로그아웃되었습니다");
    navigate("/");
  };

  // 샘플 데이터
  const reviews = [
    {
      id: 1,
      name: "고주파",
      rating: 4.8,
      reviewCount: 500,
      tags: ["맛", "분위기", "가성비"],
      imageSrc: "/img/store-default.jpg",
    },
    {
      id: 2,
      name: "홍등롱",
      rating: 4.8,
      reviewCount: 500,
      tags: ["맛", "분위기", "가성비"],
      imageSrc: "/img/store-default.jpg",
    },
  ];

  return (
    <div>
      <ProfileContainer>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        <ProfileImage> </ProfileImage>
        <InfoBox>{nickname}</InfoBox>
        <InfoBox> {email} </InfoBox>
      </ProfileContainer>
      <ReviewContainer>
        <h3>작성한 리뷰 목록</h3>
        {reviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            name={review.name}
            rating={review.rating}
            reviewCount={review.reviewCount}
            tags={review.tags}
            imageSrc={review.imageSrc}
            isSelected={false}
            onSelect={() => {}}
            index={index}
          />
        ))}
      </ReviewContainer>
    </div>
  );
};

export default MyPage;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #f4f4f4;
  border-radius: 8px;
  margin-bottom: -0.5rem;
`;

const LogoutButton = styled.button`
  align-self: flex-end;
  margin-bottom: 0.5rem;
  background-color: #ccc;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  background-color: #d9d9d9;
  border-radius: 50%;
  margin-bottom: 1rem;
  background-image: url("/img/profile-default.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const InfoBox = styled.div`
  width: 60%;
  padding: 0.05rem;
  background-color: #e0e0e0;
  border-radius: 4px;
  text-align: center;
`;

const ReviewContainer = styled.div`
  padding: 1rem;
  background-color: #f4f4f4;
  border-radius: 8px;
  margin-bottom: 0.8rem;

  h3 {
    margin-bottom: 0.75rem; /* 제목 밑 간격 */
    font-size: 1.1rem; /* 폰트 크기 조절 */
  }
`;
