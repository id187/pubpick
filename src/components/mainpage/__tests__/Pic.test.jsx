// src/components/common/__tests__/Pic.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pic from '../Pic';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import "../../styles/color.css";

// useNavigate 모킹
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Pic 컴포넌트', () => {
  const mockNavigate = jest.fn();
  const onSelectMock = jest.fn();
  const defaultProps = {
    id: 1,
    name: "Test Store",
    rating: 4.5,
    reviewCount: 500,
    tags: ["Tag1", "Tag2"],
    imageSrc: "/img/store-default.jpg", 
    position: {lat: 37.5486606311127, lng: 126.938718112055},
isSelected: false,
    onSelect: onSelectMock,
    index: 1,
  };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('이미지, 텍스트, 별점·리뷰·태그가 올바르게 렌더링된다', () => {
    render(<Pic {...defaultProps} />);

    // 이미지
    const img = screen.getByAltText('Test Store');
    expect(img).toHaveAttribute('src', "/img/store-default.jpg");

    // 가게 이름
    expect(screen.getByText('Test Store')).toBeInTheDocument();
    // 별점 · 리뷰 개수
    expect(screen.getByText('★ 4.5 (500 reviews)')).toBeInTheDocument();
    // 태그들
    expect(screen.getByText('Tag1')).toBeInTheDocument();
    expect(screen.getByText('Tag2')).toBeInTheDocument();
  });

  test('isSelected=false 일 때 배경색이 흰색(#ffffff)이다', () => {
    const { container } = render(<Pic {...defaultProps} isSelected={false} />);
    const box = container.querySelector('.pic-box');
    expect(box).toHaveStyle({ backgroundColor: '#ffffff' });
  });

  test('isSelected=true 일 때 배경색이 var(--coral-main)이다', () => {
    const { container } = render(<Pic {...defaultProps} isSelected={true} />);
    const box = container.querySelector('.pic-box');
    expect(box).toHaveStyle({ backgroundColor: 'var(--coral-main)' });
  });

  test('클릭 시 onSelect(index)와 navigate(`/restaurant/${id}`)가 호출된다', () => {
    render(<Pic {...defaultProps} />);

    const box = screen.getByAltText('Test Store').closest('.pic-box');
    fireEvent.click(box);

    expect(onSelectMock).toHaveBeenCalledWith(1);
    expect(mockNavigate).toHaveBeenCalledWith('/restaurant/1');
  });
});
