import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeaderWithoutSearch from "../../components/common/HeaderWithoutSearch";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 간단한 로그인 시뮬레이션
    if (email && password) {
      localStorage.setItem("accessToken", "fake-token");
      alert("로그인되었습니다.");
      navigate("/"); // 로그인 성공 시 메인페이지로 이동
    } else {
      alert("이메일과 비밀번호를 입력하세요.");
    }
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <HeaderWithoutSearch />
      <LoginWrapper>
        <LoginBox onSubmit={handleLogin}>
          <Title>로그인</Title>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginBtn type="submit">로그인</LoginBtn>
          <SignupBtn type="button" onClick={goToSignup}>
            회원가입
          </SignupBtn>
        </LoginBox>
      </LoginWrapper>
    </>
  );
};

export default LoginPage;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--gray-800);
`;

const LoginBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 1.5em;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Input = styled.input`
  padding: 0.6rem;
  margin-top: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const LoginBtn = styled.button`
  margin-top: 1.5rem;
  padding: 0.6rem;
  font-size: 1rem;
  background-color: var(--coral-main);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
`;

const SignupBtn = styled.button`
  margin-top: 0.8rem;
  background: none;
  border: none;
  color: var(--coral-main);
  font-size: 1rem;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 500;
`;
