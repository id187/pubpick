import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginRequiredModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose(); // 모달 먼저 닫고
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>x</CloseButton>
        <ModalText>로그인이 필요한 서비스입니다.</ModalText>
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      </ModalBox>
    </ModalOverlay>
  );
};

export default LoginRequiredModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem 2rem 1.3rem 2rem;
  border-radius: 0.8rem;
  text-align: center;
  position: relative;
`;

const ModalText = styled.p`
  margin-bottom: 0rem;
  font-size: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.35rem;
  right: 0.7rem;
  background: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
`;

const LoginButton = styled.button`
  margin-top: 0.7rem;
  padding: 0.35rem 0.8rem;
  background-color: var(--coral-main);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  // &:hover {
  //   background-color: var(--coral-dark);
  // }
`;
