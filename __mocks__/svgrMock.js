// SVG를 ReactComponent로도 임포트할 수 있게끔 빈 컴포넌트 제공
const React = require('react');

module.exports = {
  __esModule: true,
  // default import
  default: 'SvgrURL',
  // named import으로 쓸 ReactComponent
  ReactComponent: () => React.createElement('svg', null),
};
