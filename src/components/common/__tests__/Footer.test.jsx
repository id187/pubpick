// components/common/__tests__/Footer.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';

// react-router-dom의 useNavigate를 mock 처리
import { useNavigate } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Footer 컴포넌트', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('메뉴 아이템 3개(리뷰쓰기, 메인, 마이)가 렌더링된다', () => {
    render(<Footer />);
    // 버튼(role="button") 개수 확인
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);

    // 각 레이블 확인
    expect(screen.getByText('리뷰쓰기')).toBeInTheDocument();
    expect(screen.getByText('메인')).toBeInTheDocument();
    expect(screen.getByText('마이')).toBeInTheDocument();
  });

  test('각 버튼 클릭 시 올바른 경로로 navigate가 호출된다', () => {
    render(<Footer />);

    // 리뷰쓰기 클릭
    fireEvent.click(screen.getByText('리뷰쓰기'));
    expect(mockNavigate).toHaveBeenCalledWith('/write');

    // 메인 클릭
    fireEvent.click(screen.getByText('메인'));
    expect(mockNavigate).toHaveBeenCalledWith('/');

    // 마이 클릭
    fireEvent.click(screen.getByText('마이'));
    expect(mockNavigate).toHaveBeenCalledWith('/mypage');

    // 총 3번 호출되었는지 확인
    expect(mockNavigate).toHaveBeenCalledTimes(3);
  });
});
