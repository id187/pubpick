# 로컬에 git clone 하고, 파워쉘 터미널에서 npm install styled-components react-router-dom 하고 npm start 하면 로컬에서 보입니다!

# 🥘 Sogang Food Map

서강대학교 주변의 맛집 정보를 공유하고, 카테고리별로 정리된 정보를 확인할 수 있는 웹 애플리케이션입니다.

---

## 🚀 프로젝트 소개

- 사용 기술: React, Spring
- 주요 기능:
  - 주변 맛집 리스트 보기
  - 카테고리 필터링
  - 사용자 평점/리뷰 보기

---

## 📁 프로젝트 폴더 구조

```
├── public/ # 정적 파일 (favicon, index.html 등)
├── src/ 
│ ├── assets/ # 폰트, 이미지 등 정적 리소스 
│ │ └── fonts/ 
│ ├── components/ # 재사용 가능한 컴포넌트 모음
│ ├── pages/ # 페이지 단위 컴포넌트
│ ├── styles/ # 전역 스타일(css 변수, 폰트 등)
│ │ ├── color.css 
│ │ └── font.css
│ ├── App.js # 메인 컴포넌트
│ └── index.js # 앱 진입점
├── package.json # 프로젝트 메타 정보 및 의존성
└── README.md # 프로젝트 설명

```

- 전역 색상은 `styles/color.css`, 커스텀 폰트는 `styles/font.css`에 정의되어 있습니다.
- `styled-components`를 활용하여 컴포넌트 단위로 스타일을 관리합니다.

### css 변수 사용 예시
const Button = styled.button`
  background-color: var(--pink-main);
  color: var(--gray-900);
`;

## 🙋‍♀️ 팀 소개

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
