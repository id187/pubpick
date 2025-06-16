// src/pages/review/ReviewDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewProfile from "../../components/review_detail/ReviewProfile.jsx";
import ReviewHeader from "../../components/review_detail/ReviewHeader.jsx";
import ReviewMain from "../../components/review_detail/ReviewMain.jsx";
import ReviewThumbs from "../../components/review_detail/ReviewThumbs.jsx";
import {instance} from "../../api/instance.js";

function ReviewDetail() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    instance
      .get(`/review/${id}`)
      .then((response) => {
        if (response.data.success) {
          setReview(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>리뷰를 불러오는 중 오류가 발생했습니다: {error}</div>;
  }

  // API에서 받은 데이터 매핑
  const profileData = {
    profileImage: review.profileImage || "/default-profile.png",
    name: review.writer,
    rating: Math.round(review.score),
    date: review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "",
  };

  const mainData = {
    storeName: review.placeName,
    images: review.images || [],
    content: review.comment,
    tags: review.tags || [],
  };

  return (
    <div>
      <ReviewHeader title={review.title} />
      <ReviewProfile
        profileImage={profileData.profileImage}
        name={profileData.name}
        rating={profileData.rating}
        date={profileData.date}
      />
      <ReviewMain
        storeName={mainData.storeName}
        images={mainData.images}
        content={mainData.content}
        tags={mainData.tags}
      />
      <ReviewThumbs reviewId={id} />
    </div>
  );
}

export default ReviewDetail;
