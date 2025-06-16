import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeaderWithoutSearch from "../../components/common/HeaderWithoutSearch";
import { instance } from "../../api/instance";

const SignupPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !nickname) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await instance.post("/auth/signup", {
        email,
        password,
        nickname,
        profilePath: "", // 선택 항목. 필요시 이미지 업로드 로직 추가 가능
      });

      alert(`환영합니다, ${nickname}님!`);
      navigate("/login"); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      if (error.response) {
        alert(`회원가입 실패: ${error.response.data.message || "서버 오류"}`);
      } else {
        alert("회원가입 실패: 네트워크 오류");
      }
    }
  };

  return (
    <>
      <HeaderWithoutSearch />
      <SignupWrapper>
        <SignupBox onSubmit={handleSignup}>
          <Title>회원가입</Title>
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
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <SignupBtn type="submit">회원가입</SignupBtn>
        </SignupBox>
      </SignupWrapper>
    </>
  );
};

export default SignupPage;

const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--gray-800);
`;

const SignupBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 1.5rem;
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

const SignupBtn = styled.button`
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
