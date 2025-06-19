import React, { useEffect, useRef, useMemo } from "react";
import Pic from "./Pic";
import "./Pics.css";
import { getRestaurantImage } from "../common/restaurantImages";

const Pics = ({ data, selectedIndex, onSelect }) => {
  const scrollRef = useRef(null);
  const picRefs = useRef([]);

  useEffect(() => {
    console.log("restaurant data:", data);
  }, [data]);

  // data를 id 오름차순으로 정렬한 새 배열 생성
  // const sortedData = useMemo(
  //   () => [...data].sort((a, b) => a.id - b.id),
  //   [data]
  // );

  // selectedIndex 변경 시 해당 Pic으로 스크롤
  useEffect(() => {
    if (selectedIndex == null) return;
    const target = picRefs.current[selectedIndex];
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [selectedIndex]);

  return (
    <div ref={scrollRef} className="pics-container">
      {data.map((item, idx) => (
        <Pic
          key={item.id}
          ref={(el) => (picRefs.current[idx] = el)}
          index={idx}
          id={item.id}
          name={item.name}
          rating={item.score}
          reviewCount={item.totalReviews}
          tags={item.tagList}
          imageSrc={getRestaurantImage(item.id)}
          isSelected={selectedIndex === idx}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default Pics;
