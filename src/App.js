import React from "react";
import * as Sentry from "@sentry/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "./styles/font.css";
import GlobalStyle from "./styles/GlobalStyle";

import Layout from "./components/Layout";
import MainPage from "./pages/mainpage/MainPage";
import ReviewDetail from "./pages/review_detail/ReviewDetail";
import RestaurantDetail from "./pages/restaurant/RestaurantDetail";
import MyPage from "./components/mypage/MyPage";
import ReviewWrite from "./pages/ReviewWrite";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";

import LogRocket from "logrocket";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^http:\/\/13\.124\.170\.215:8081/],
});

LogRocket.init(process.env.REACT_APP_LOGROCKET_ID);
// LogRocket ↔ Sentry 연동
LogRocket.getSessionURL((sessionURL) => {
  Sentry.setContext("logrocket", {
    sessionURL,
  });
});

function App() {
  // React.useEffect(() => {
  //   throw new Error("Sentry 연동 테스트 오류");
  // }, []);

  return (
    <AppContainer>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* Footer 없는 풀스크린 페이지 */}

          {/* Footer 포함되는 페이지들 */}
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route
              path="/restaurant/:id/review/:id"
              element={<ReviewDetail />}
            />
            <Route path="/myreview/:id" element={<ReviewDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/write" element={<ReviewWrite />} />
          </Route>
        </Routes>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 56.25vh;
  margin: 0 auto;
  background-color: var(--bg-color);
`;

export default App;
