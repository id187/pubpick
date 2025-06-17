// src/components/review_detail/ReviewMain.jsx
import React from "react";
import styled from "styled-components";
import "../../styles/color.css";
import BookmarkToggle from "../common/BookMarkToggle";

const ReviewMainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #fff;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const StoreName = styled.h1`
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0;
`;

const ImageScrollContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
`;

const StoreImage = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.25rem;
`;

const ReviewContent = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #333;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: #fff;
  border: 1px solid #ff6f61;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  color: #000;
`;

function ReviewMain({ storeName, images, content, tags }) {
  return (
    <ReviewMainContainer>
      <TitleContainer>
        <StoreName>{storeName}</StoreName>
        {/* <BookmarkToggle /> */}
      </TitleContainer>

      <ImageScrollContainer>
        {images.map((img, idx) => (
          <StoreImage
            key={idx}
            src={img}
            alt={`${storeName} 사진 ${idx + 1}`}
          />
        ))}
      </ImageScrollContainer>

      <ReviewContent>{content}</ReviewContent>

      <TagContainer>
        {tags.map((tag, idx) => (
          <Tag key={idx}>{tag}</Tag>
        ))}
      </TagContainer>
    </ReviewMainContainer>
  );
}

export default ReviewMain;
