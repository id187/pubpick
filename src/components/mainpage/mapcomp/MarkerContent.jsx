import styled from "styled-components";

const MarkerContent = styled.div`
  position: relative;       /* 부모(오버레이 컨테이너)를 기준으로 이동 */
  bottom: 10px;             /* 마커 꼭대기 위로 10px 올리기 */

  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background: rgba(255,255,255,0.7);
  color: #000;
  border: 0.1rem solid 
    ${props => (props.$isSelected ? "coral" : "rgb(6, 6, 7)")};
  transition: border-color 0.3s ease;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;

  img {
    width: 1.0rem;
    height: 1.0rem;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export default MarkerContent;
