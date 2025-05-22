// src/components/review/ReviewHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import "../../styles/color.css";

// Styled 컴포넌트 정의
const Header = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 3.7rem;
  display: flex;
  align-items: center;
  padding: 0.625rrem;
  background-color: #fff;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-900);
  font-size: 1.2rem;
  font-weight: 500;

  &:hover {
    opacity: 0.8;
  }
`;

const BackIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  object-fit: contain;
  margin-right: 0.5rem;
`;


const HeaderText = styled.span`
  font-size: 1.2rem;
  margin-left: 0.125rem;
`;

const ReviewHeader = () => {
  const navigate = useNavigate();

  return (
    <Header>
      <BackButton onClick={() => navigate(-1)}>
        <BackIcon src="/img/icon_back.png" alt="Back" />
        <HeaderText>전체 리뷰</HeaderText>
      </BackButton>
    </Header>
  );
};

export default ReviewHeader;
