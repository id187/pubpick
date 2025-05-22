import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Pic.css";
import "../../styles/color.css";
/**
 * 단일 아이템(가게 정보) 카드
 * @param {string} name         - 가게 이름 (예: '핵밥 서강대점')
 * @param {number} rating       - 별점 (예: 4.8)
 * @param {number} reviewCount  - 리뷰 개수 (예: 500)
 * @param {string[]} tags       - 태그 배열 (예: ['맛', '분위기', '가성비'])
 * @param {string} imageSrc     - 이미지 경로 (예: '/img/cutlery.png')
 */
const Pic = forwardRef (({ id, name, rating, reviewCount, tags, imageSrc,
   isSelected, onSelect, index  }, ref) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onSelect(index);
    navigate(`/restaurant/${id}`);
  };

  return (
    <div 
      ref={ref}
      className="pic-box" 
      onClick={handleClick}
      style={{ backgroundColor: isSelected ? 'var(--coral-main)' : '#ffffff' }}
      >
      {/* 왼쪽 이미지 영역 */}
      <div className="pic-box-left">
        <img src={imageSrc} alt={name} className="pic-box-img" />
      </div>

      {/* 오른쪽 텍스트 영역 */}
      <div className="pic-box-right">
        {/* 상단: 가게 이름 + 별점/리뷰 */}
        <div className="pic-box-header">
          <span className="pic-box-title">{name}</span>
          <span className="pic-box-rating">
            ★ {rating} ({reviewCount} reviews)
          </span>
        </div>

        {/* 하단: 태그 목록 */}
        <div className="pic-box-tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="pic-box-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Pic;
