// components/common/__tests__/Footer.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';

// react-router-dom의 useNavigate를 mock 처리
import { useNavigate } from 'react-router-dom';
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

describe('Footer 컴포넌트', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // 매번 깨끗한 환경을 위해
    localStorage.clear();
    useNavigate.mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('메뉴 아이템 3개(리뷰쓰기, 메인, 마이)가 렌더링된다', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Footer />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(screen.getByText('리뷰쓰기')).toBeInTheDocument();
    expect(screen.getByText('메인')).toBeInTheDocument();
    expect(screen.getByText('마이')).toBeInTheDocument();
  });

  test('로그인된 상태에서 “리뷰쓰기”, “메인”, “마이” 클릭 시 올바른 경로로 navigate 호출', () => {
    // 로그인 토큰 세팅
    localStorage.setItem('accessToken', 'dummy-token');

    render(
      <MemoryRouter initialEntries={['/current']}>
        <Footer />
      </MemoryRouter>
    );

    // 리뷰쓰기 클릭
    fireEvent.click(screen.getByText('리뷰쓰기'));
    expect(mockNavigate).toHaveBeenCalledWith('/write', { state: { from: '/current' } });

    // 메인 클릭
    fireEvent.click(screen.getByText('메인'));
    expect(mockNavigate).toHaveBeenCalledWith('/');

    // 마이 클릭
    fireEvent.click(screen.getByText('마이'));
    expect(mockNavigate).toHaveBeenCalledWith('/mypage');

    // 총 3번 호출
    expect(mockNavigate).toHaveBeenCalledTimes(3);
  });


});
