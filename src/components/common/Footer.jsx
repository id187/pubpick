import styled from "styled-components";
import "../../styles/color.css";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useLoginRequired } from "../../hooks/useLoginRequired"; // ✅ 추가
import LoginRequiredModal from "../common/LoginRequiredModal"; // ✅ 추가

import { ReactComponent as penIcon } from "../../assets/icons/penIcon.svg";
import { ReactComponent as homeIcon } from "../../assets/icons/homeIcon.svg";
import { ReactComponent as userIcon } from "../../assets/icons/userIcon.svg";

export default function Footer() {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  const { showModal, setShowModal, checkLogin } = useLoginRequired(); // ✅ 추가

  const handleClick = (key) => {
    setActive(key);

    if (key === "write" || key === "mypage") {
      if (!checkLogin()) return;
    }

    if (key === "home") navigate("/");
    if (key === "write") {
      navigate("/write", {
        state: { from: location.pathname }
      });
    }
    if (key === "mypage") navigate("/mypage");
  };

  const menuItems = [
    { key: "write", icon: penIcon, label: "리뷰쓰기" },
    { key: "home", icon: homeIcon, label: "메인" },
    { key: "mypage", icon: userIcon, label: "마이" },
  ];

  return (
    <>
      <FooterBar>
        {menuItems.map(({ key, icon, label }) => (
          <IconButton key={key} onClick={() => handleClick(key)}>
            <StyledIcon as={icon} selected={active === key} />
            <Label selected={active === key}>{label}</Label>
          </IconButton>
        ))}
      </FooterBar>
      {showModal && <LoginRequiredModal onClose={() => setShowModal(false)} />}{" "}
      {/* ✅ 모달 렌더링 */}
    </>
  );
}

const FooterBar = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 56.25vh;
  height: 3.7rem;
  background: white;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  box-shadow: 0 -0.125rem 0.3125rem var(--shadow-color););
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0.375rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.span`
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: ${({ selected }) =>
    selected ? "var(--coral-main)" : "var(--gray-700)"};
  font-weight: ${({ selected }) => (selected ? "600" : "400")};
  transition: color 0.2s ease;
`;

const StyledIcon = styled.svg`
  width: 1.625rem;
  height: 1.625rem;
  stroke: ${({ selected }) =>
    selected ? "var(--coral-main)" : "var(--gray-400)"};
  stroke-width: ${({ selected }) => (selected ? "2.1" : "1.8")};
  transition: stroke 0.2s ease, stroke-width 0.2s ease;
`;
