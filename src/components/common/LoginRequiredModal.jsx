import React from "react";
import styled from "styled-components";

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
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
`;

const LoginRequiredModal = ({ onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <p>로그인이 필요한 서비스입니다.</p>
        <button onClick={onClose}>닫기</button>
      </ModalBox>
    </ModalOverlay>
  );
};

export default LoginRequiredModal;
