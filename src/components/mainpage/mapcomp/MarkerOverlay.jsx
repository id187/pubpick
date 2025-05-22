import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import MarkerContent from './MarkerContent.jsx';

const MarkerOverlay = ({ 
  map, 
  position, 
  index, 
  storeName, 
  onClick, 
  isSelected 
}) => {
  const markerRef = useRef();
  const overlayRef = useRef();
  const rootRef = useRef();

  useEffect(() => {
    if (!map) return;

    // 1) MarkerImage 옵션 정의 (필요시)
    const imageSrc = '/img/location_color.png';
    const imageSize = new window.kakao.maps.Size(24, 24);
    const imageOption = { offset: new window.kakao.maps.Point(12, 35) };
    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    // 2) Marker 생성
    const marker = new window.kakao.maps.Marker({
      map,
      position,
      image: markerImage,
    });
    markerRef.current = marker;

    // 3) Overlay 용 container + React root 생성
    const container = document.createElement('div');
    container.addEventListener('click', () => onClick(index));
    const root = createRoot(container);
    rootRef.current = root;

    // initial render
    root.render(
      <MarkerContent isSelected={isSelected}>
        {storeName}
      </MarkerContent>
    );

    // 4) CustomOverlay 생성
    const overlay = new window.kakao.maps.CustomOverlay({
      map,
      position,
      content: container,
      yAnchor: 1,
    });
    overlayRef.current = overlay;

    // cleanup
    return () => {
      marker.setMap(null);
      overlay.setMap(null);
      root.unmount();
    };
  }, [map, position, index, onClick, storeName]);

  // 5) isSelected 변경 시에는 overlay content만 다시 렌더링
  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.render(
      <MarkerContent isSelected={isSelected}>
        {storeName}
      </MarkerContent>
    );
  }, [isSelected, storeName]);

  return null;
};

export default MarkerOverlay;
