import React, { useRef } from "react";
import styled from "styled-components";

const ReviewCard = React.forwardRef(
  ({ id, name, storeName, rating, imageSrc, tags }, ref) => {
    const handleClick = () => {
      window.location.href = `/myreview/${id}`;
    };

    return (
      <CardContainer ref={ref} onClick={handleClick}>
        <HeaderRow>{storeName}</HeaderRow> {/* ✅ 새 컴포넌트로 분리 */}
        <ContentWrapper>
          <ImageWrapper>
            <Image src={imageSrc} alt={name} />
          </ImageWrapper>
          <TextWrapper>
            <Header>
              <Title>{name}</Title>
              <Rating>
                <Star>★</Star> <Score>{rating}</Score>
              </Rating>
            </Header>
            <TagContainer>
              {(tags || []).map((tag, idx) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </TagContainer>
          </TextWrapper>
        </ContentWrapper>
      </CardContainer>
    );
  }
);

export default ReviewCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--coral-main);
  border-radius: 0.5rem;
  padding: 0.6rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--coral-main)" : "#ffffff"};
`;

const HeaderRow = styled.div`
  width: 100%;
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-left: 0.2rem;
  margin-top: -0.1rem;
  margin-bottom: -0.1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
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

const Title = styled.div`
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0.15rem 0;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const Star = styled.span`
  color: var(--coral-main); /* 주황색 */
  font-weight: bold;
  font-size: 0.9rem;
`;

const Score = styled.span`
  color: #000000; /* 검정 */
  font-size: 0.85rem;
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
