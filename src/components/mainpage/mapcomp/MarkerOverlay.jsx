import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import MarkerContent from './MarkerContent.jsx';

const MarkerOverlay = ({
  map,
  position: nowPosition,
  index,
  storeName,
  onClick,
  isSelected
}) => {
  const markerRef = useRef();
  const overlayRef = useRef();
  const rootRef = useRef();

  // 1) 마커·오버레이는 map이 세팅될 때 단 한 번만 생성
  useEffect(() => {
    if (!map) return;

    // MarkerImage, Marker 생성
    const markerImage = new window.kakao.maps.MarkerImage(
      '/img/location_color.png',
      new window.kakao.maps.Size(24, 24),
      { offset: new window.kakao.maps.Point(12, 24) }
    );
    const marker = new window.kakao.maps.Marker({
      map,
      position: nowPosition,
      image: markerImage
    });
    markerRef.current = marker;

    // CustomOverlay container + React root
    const container = document.createElement('div');
    container.addEventListener('click', () => onClick(index));
    const root = createRoot(container);
    rootRef.current = root;
    root.render(
      <MarkerContent $isSelected={isSelected}>
        {storeName}
      </MarkerContent>
    );

    // CustomOverlay 생성
    const overlay = new window.kakao.maps.CustomOverlay({
      map,
      position: nowPosition,
      content: container,
      xAnchor: 0.5,  // 가로 중앙
      yAnchor: 1     // 아래쪽 기준
    });
    overlayRef.current = overlay;
    setTimeout(() => {
      overlay.setPosition(nowPosition);
    }, 0);


    // cleanup
    return () => {
      marker.setMap(null);
      overlay.setMap(null);
      // root.unmount();  // 필요시 해제
    };
  }, [map]);  // nowPosition, index, storeName, isSelected 빼고 map만

  // 2) nowPosition이 바뀔 때: 오버레이 위치만 업데이트
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.setPosition(nowPosition);
    }
    if (markerRef.current) {
      markerRef.current.setPosition(nowPosition);
    }
  }, [nowPosition]);

  // 3) map 패닝/줌할 때도 overlay 위치 재계산되도록 이벤트 리스너 등록
  useEffect(() => {
    if (!map || !overlayRef.current) return;

    const handleBounds = () => {
      overlayRef.current.setPosition(nowPosition);
    };

    window.kakao.maps.event.addListener(map, 'bounds_changed', handleBounds);
    return () => {
      window.kakao.maps.event.removeListener(map, 'bounds_changed', handleBounds);
    };
  }, [map, nowPosition]);

  // 4) isSelected 혹은 storeName만 바뀔 때는 content만 리렌더
  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.render(
      <MarkerContent $isSelected={isSelected}>
        {storeName}
      </MarkerContent>
    );
  }, [isSelected, storeName]);

  return null;
};

export default MarkerOverlay;
