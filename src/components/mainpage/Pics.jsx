import React, { useEffect, useRef, useState } from "react";
import Pic from "./Pic";
import "./Pics.css";


const Pics = ({ data, selectedIndex, onSelect }) => {
  
  //const [selectedIndex, setSelectedIndex] = useState(null);
  const scrollRef = useRef(null);
  const picRefs = useRef([]);
  
  // scrollEffect
  useEffect(() => {
    if (selectedIndex == null) return;
    const target = picRefs.current[selectedIndex];
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',   // 세로 방향 중앙 정렬
        inline: 'nearest'  // 가로 방향에서는 가까운 위치로
      });
    }
  }, [selectedIndex]);


  
  //const imgsrc = "/img/store-default.jpg"
  return (
    <div
      ref = {scrollRef}
      className="pics-container"
      >
      {data.map((item, idx) => (
        <Pic
          key={item.id}
          ref = {(el) => (picRefs.current[idx] = el)}
          index = {idx}
          id={item.id}
          name={item.name}
          rating={item.rating}
          reviewCount={item.reviewCount}
          tags={item.tags}
          imageSrc={item.imageSrc}
          //imageSrc = {imgsrc}
          isSelected = {selectedIndex === idx}
          onSelect = {onSelect}
        />
      ))}
    </div>
  );
};

export default Pics;
