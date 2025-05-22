// import React from "react";
// import "./header.css";
// import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const navigate = useNavigate(); // ✅ 선언

//   // 로고 또는 텍스트 클릭 시 홈으로 이동
//   const handleNavigateHome = () => {
//     navigate("/");
//   };

//   return (
//     <div className="headbox">
//       {/* 왼쪽: 로고 + 텍스트 한 덩어리 */}
//       <div
//         className="headbox-brand"
//         onClick={handleNavigateHome}
//         style={{ cursor: "pointer" }}
//       >
//         <img
//           src={"/img/pubpicklogo.png"}
//           alt="Pub Pick Logo"
//           className="cutlery-icon"
//         />
//         <h1 className="brand-title">Pub Pick</h1>
//       </div>

//       {/* 오른쪽: 검색창 */}
//       <div className="headbox-search">
//         <div className="search-wrapper">
//           <FaSearch className="search-icon" />
//           <input
//             type="text"
//             className="search-input"
//             placeholder="서강대 로컬술집을 검색해보세요."
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React from "react";
import "./header.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * @param {string} keyword - 검색어 상태
 * @param {function} setKeyword - 검색어 변경 함수
 */
const Header = ({ keyword, setKeyword }) => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setKeyword(e.target.value); // 상위 컴포넌트로 검색어 전달
  };

  return (
    <div className="headbox">
      {/* 왼쪽: 로고 */}
      <div
        className="headbox-brand"
        onClick={handleNavigateHome}
        style={{ cursor: "pointer" }}
      >
        <img
          src={"/img/pubpicklogo.png"}
          alt="Pub Pick Logo"
          className="cutlery-icon"
        />
        <h1 className="brand-title">Pub Pick</h1>
      </div>

      {/* 오른쪽: 검색창 */}
      <div className="headbox-search">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="서강대 로컬술집을 검색해보세요."
            value={keyword}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
