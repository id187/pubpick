import React, { useEffect, useRef, useState } from 'react';
import MarkerOverlay from './MarkerOverlay';

const Map = ({data, selectedIndex, onMarkerClick }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;
    window.kakao.maps.load(() => {
      const instance = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.5509442, 126.9410023), // 서강대학교 위치
        level: 4,
        minLevel: 4,
        maxLevel: 4,
        zoomable: false,
      });
      setMap(instance);
    });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
    >
      {map &&
        data.map((item, idx) => (
          <MarkerOverlay
            key={item.id}
            map={map}
            position={
              new window.kakao.maps.LatLng(
                item.position.lat,
                item.position.lng
              )
            }
            index={idx}
            storeName={item.name}
            isSelected={selectedIndex === idx}
            onClick={onMarkerClick}
          />
        ))}
    </div>
  );
};

export default Map;