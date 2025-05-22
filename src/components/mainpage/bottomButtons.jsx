import React from 'react';
import './bottomButtons.css';

/**
 * 하단에 고정된 버튼 바 컴포넌트
 * - 왼쪽: 편집 버튼 -> 나중에 mypage로 연결
 * - 중앙: 홈 버튼 -> 나중에 mainpage로 연결
 * - 오른쪽: 프로필 버튼 -> 나중에 myprofile로 연결
 */
const BottomButtons = () => {
  // 추후 라우팅 연동 시 onClick 핸들러에서 navigate("/mypage") 등 구현
  const handleEditClick = () => {
    console.log('Edit button clicked - will navigate to mypage');
  };

  const handleHomeClick = () => {
    console.log('Home button clicked - will navigate to mainpage');
  };

  const handleProfileClick = () => {
    console.log('Profile button clicked - will navigate to myprofile');
  };

  return (
    <div className="bottom-buttons">
      {/* 왼쪽 버튼 (네모 음영) */}
      <button className="bottom-button left-button" onClick={handleEditClick}>
        <img src="/img/edit.png" alt="edit" />
      </button>

      {/* 가운데 버튼 (동그라미 음영) */}
      <button className="bottom-button center-button" onClick={handleHomeClick}>
        <img src="/img/home.svg" alt="home" />
      </button>

      {/* 오른쪽 버튼 (네모 음영) */}
      <button className="bottom-button right-button" onClick={handleProfileClick}>
        <img src="/img/person.svg" alt="person" />
      </button>
    </div>
  );
};

export default BottomButtons;
