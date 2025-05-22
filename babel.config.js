// babel.config.js (프로젝트 루트에 생성)
// JSX → import/export ,jsx를 이해해서 테스트코드로 전환.
module.exports = {
  presets: [
    '@babel/preset-env',    // 최신 JS → CommonJS
    '@babel/preset-react'   // JSX → React.createElement
  ]
};
