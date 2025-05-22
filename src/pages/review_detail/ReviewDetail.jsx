// 예시: src/pages/review/ReviewDetail.jsx
import React from "react";
import ReviewProfile from "../../components/review_detail/ReviewProfile.jsx";
import ReviewHeader from "../../components/review_detail/ReviewHeader.jsx";
import ReviewMain from "../../components/review_detail/ReviewMain.jsx";
import ReviewThumbs from "../../components/review_detail/ReviewThumbs.jsx";
// import Header from "../../components/mainpage/header.jsx";

function ReviewDetail() {
  // 임의의 데이터 (실제 사용시 API나 props로 데이터를 전달)
  const profileData = {
    profileImage: "/img/2. 교표(Symbol).png",
    name: "한유승",
    rating: 4, // 5점 만점 중 4점
    date: "2025-04-10",
  };

  const storeData = {
    storeName: "핵밥 서강대점",
    images: [
      "/img/hackbob.jpg",
      "/img/hackbob.jpg",
      "/img/hackbob.jpg",
      "/img/hackbob.jpg",
      "/img/hackbob.jpg",
      "/img/hackbob.jpg",
      "/img/hackbob.jpg",
    ],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: ["맛있어요", "분위기가 좋아요", "가성비 최고"],
  };

  return (
    <div>
      {/* 상단 기본 헤더 */}
      {/* 없는게 나을거 같기도 함 */}
      {/* <Header /> */}
      {/* 리뷰 헤더 영역 */}
      <ReviewHeader />
      {/* 리뷰 프로필 영역 */}
      <ReviewProfile
        profileImage={profileData.profileImage}
        name={profileData.name}
        rating={profileData.rating}
        date={profileData.date}
      />
      {/* 리뷰 상세 내용 */}
      <ReviewMain
        storeName={storeData.storeName}
        images={storeData.images}
        content={storeData.content}
        tags={storeData.tags}
      />
      {/* 공감 버튼 */}

      {/* 하단 버튼 */}
      {/* <Footer /> */}
    </div>
  );
}

export default ReviewDetail;
