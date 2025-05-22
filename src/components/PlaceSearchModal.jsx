import React, { useState } from "react";
import styled from "styled-components";
import { picData } from "./mainpage/picData"; // 실제 경로 맞게 수정

const PlaceSearchModal = ({ onSelect, onClose }) => {
  const [keyword, setKeyword] = useState("");

  const filtered = picData.filter((place) =>
    place.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <Overlay>
      <Modal>
        <ModalHeader>
          <input
            type="text"
            placeholder="장소를 검색하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            autoFocus
          />
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <ResultList>
          {filtered.map((place) => (
            <ResultItem key={place.id} onClick={() => onSelect(place)}>
              {place.name}
            </ResultItem>
          ))}
          {filtered.length === 0 && <Empty>검색 결과가 없습니다.</Empty>}
        </ResultList>
      </Modal>
    </Overlay>
  );
};

export default PlaceSearchModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: white;
  padding: 1rem;
  width: 70%;
  max-width: 300px;
  border-radius: 1rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  input {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
`;

const ResultList = styled.ul`
  max-height: 300px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
`;

const ResultItem = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const Empty = styled.p`
  text-align: center;
  color: #aaa;
  padding: 1rem;
`;
