import React, { useState } from "react";
import "./MainPage.css";
import KakaoMap from "../../components/mainpage/KaKaoMap";
import Header from "../../components/common/Header";

const MainPage = () => {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="mainpage">
      <Header keyword={keyword} setKeyword={setKeyword} />
      <KakaoMap keyword={keyword} />
    </div>
  );
};

export default MainPage;
