// components/common/__tests__/Header.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

// useNavigate 모킹
import { useNavigate } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header 컴포넌트', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('로고 이미지와 브랜드 타이틀이 화면에 나타난다', () => {
    render(<Header />);
    const logo = screen.getByAltText('Pub Pick Logo');
    expect(logo).toBeInTheDocument();

    const title = screen.getByRole('heading', { level: 1, name: 'Pub Pick' });
    expect(title).toBeInTheDocument();
  });

  test('검색 인풋(placeholder)이 렌더링된다', () => {
    render(<Header />);
    const input = screen.getByPlaceholderText('서강대 로컬술집을 검색해보세요.');
    expect(input).toBeInTheDocument();
  });

  test('브랜드 클릭 시 "/" 경로로 navigate 호출', () => {
    render(<Header />);
    // h1 텍스트를 클릭해도 부모 div의 onClick이 동작합니다
    const brandTitle = screen.getByText('Pub Pick');
    fireEvent.click(brandTitle);

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
