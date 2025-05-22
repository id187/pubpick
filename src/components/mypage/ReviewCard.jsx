import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../styles/color.css";

/**
 * 단일 리뷰 카드
 * @param {string} id - 리뷰 ID
 * @param {string} name - 음식점 이름
 * @param {number} rating - 별점
 * @param {string[]} tags - 태그 배열
 * @param {string} imageSrc - 이미지 경로
 * @param {boolean} isSelected - 선택 여부
 * @param {function} onSelect - 선택 시 호출될 함수
 * @param {number} index - 카드 인덱스
 */
const ReviewCard = forwardRef(
  ({ id, name, rating, tags, imageSrc, isSelected, onSelect, index }, ref) => {
    const navigate = useNavigate();

    const handleClick = () => {
      onSelect(index);
      navigate(`/myreview/${id}`);
    };

    return (
      <CardContainer ref={ref} onClick={handleClick} isSelected={isSelected}>
        {/* 왼쪽 이미지 영역 */}
        <ImageWrapper>
          <Image src={imageSrc} alt={name} />
        </ImageWrapper>

        {/* 오른쪽 텍스트 영역 */}
        <TextWrapper>
          <Header>
            <Title>{name}</Title>
            <Rating>★ {rating}</Rating>
          </Header>
          <TagContainer>
            {tags.map((tag, idx) => (
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
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--coral-main)" : "#ffffff"};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  min-height: 80px;
`;

const ImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 8px 0 0 8px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  flex-grow: 1;
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.65rem;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 0.98rem;
`;

const Rating = styled.span`
  font-size: 0.8rem;
  color: #555;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`;

const Tag = styled.span`
  background-color: #f4f4f4;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #555;
`;
