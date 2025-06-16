import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ReviewCard = React.forwardRef(
  ({ id, name, rating, reviewCount, tags, imageSrc }, ref) => {
    const handleClick = () => {
      window.location.href = `/myreview/${id}`;
    };

    return (
      <CardContainer ref={ref} onClick={handleClick}>
        <ImageWrapper>
          <Image src={imageSrc} alt={name} />
        </ImageWrapper>
        <TextWrapper>
          <Header>
            <Title>{name}</Title>
            <Rating>
              ★ {rating} ({reviewCount} reviews)
            </Rating>
          </Header>
          <TagContainer>
            {(tags || []).map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </TagContainer>
        </TextWrapper>
      </CardContainer>
    );
  }
);

export default ReviewCard;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--coral-main);
  border-radius: 0.5rem;
  padding: 0.6rem;
  margin-bottom: 0.75rem;
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--coral-main)" : "#ffffff"};
  cursor: pointer;
  &:hover {
    box-shadow: inset 0 0 0.375rem rgba(0, 0, 0, 0.2);
  }
`;

const ImageWrapper = styled.div`
  margin-right: 0.625rem;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 4.3rem;
  aspect-ratio: 1 / 1;
  border-radius: 0.25rem;
  object-fit: cover;
  display: block;
  margin-right: 0.3rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

const Title = styled.span`
  font-size: 1.05rem;
  font-weight: bold;
  color: var(--gray-800);
`;

const Rating = styled.span`
  font-size: 0.875rem;
  color: var(--gray-600);
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
  margin-top: 0.1rem;
`;

const Tag = styled.span`
  border: 1px solid #000000;
  border-radius: 0.75rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  color: #000000;
  white-space: nowrap;
  background-color: var(--coral-200);
`;
