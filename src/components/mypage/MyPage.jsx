import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { instance } from "../../api/instance";
import LogRocket from "logrocket";
import { getRestaurantImage } from "../common/restaurantImages";

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("email");

    // 기존 유저 로그 종료 + 새로운 빈 세션 시작
    try {
      await LogRocket.startNewSessionSameConfig();
      console.log("LogRocket 새 세션 시작됨");
    } catch (err) {
      console.error("LogRocket 세션 초기화 실패:", err);
    }

    alert("로그아웃되었습니다");
    navigate("/");
  };

  // 샘플 데이터
  // const reviews = [
  //   {
  //     id: 1,
  //     name: "고주파",
  //     rating: 4.8,
  //     reviewCount: 500,
  //     tags: ["맛", "분위기", "가성비"],
  //     imageSrc: "/img/store-default.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "홍등롱",
  //     rating: 4.8,
  //     reviewCount: 500,
  //     tags: ["맛", "분위기", "가성비"],
  //     imageSrc: "/img/store-default.jpg",
  //   },
  // ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("현재 저장된 토큰:", token);

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return; // ✅ 토큰 없으면 API 호출하지 않음
    }

    const fetchProfile = async () => {
      try {
        const res = await instance.get("/user/profile"); // headers 생략해도 됨 (interceptor로 처리)
        const { data } = res.data;

        console.log("리뷰 원본 구조:", data.reviews);

        localStorage.setItem("nickname", data.nickname);
        localStorage.setItem("email", data.email);

        setUser(data);
        console.log("리뷰 구조 확인:", data.reviews[0]);

        setReviews(
          (data.reviews || []).map((r) => {
            const image = getRestaurantImage(r.placeId ?? r.placeName); // ✅ 경로 받아오고
            console.log(
              "리뷰 이미지 경로 확인:",
              r.placeId ?? r.placeName,
              image
            ); // ✅ 콘솔 출력

            return {
              ...r,
              name: r.title ?? "(제목 없음)",
              storeName: r.placeName ?? "(가게 없음)",
              rating: r.score ?? 0,
              reviewCount: r.reviewCount ?? r.totalReviews ?? 0,
              tags: Array.isArray(r.tagList) ? r.tagList : [],
              imageSrc: image, // ✅ 실제 적용
            };
          })
        );
      } catch (err) {
        alert("마이페이지 정보를 불러오지 못했습니다.");
        console.error(err);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return <div>로딩 중...</div>;

  return (
    <PageWrapper>
      <ProfileContainer>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        <ProfileImage> </ProfileImage>
        <InfoBox>{user.nickname}</InfoBox>
        <InfoBox>{user.email}</InfoBox>
      </ProfileContainer>

      <ReviewContainer>
        <h3>작성한 리뷰 목록</h3>
        {reviews.length === 0 ? (
          <p>작성한 리뷰가 없습니다.</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              name={review.name}
              storeName={review.storeName}
              rating={review.rating}
              reviewCount={review.reviewCount}
              tags={review.tags}
              imageSrc={review.imageSrc}
            />
          ))
        )}
      </ReviewContainer>
    </PageWrapper>
  );
};

export default MyPage;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f4f4f4;
`;

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
  background-color: var(--gray-200);
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.7rem;
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
  background-color: white;
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
