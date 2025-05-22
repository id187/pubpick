import { useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const RestaurantDetail = () => {
  const { id } = useParams();

  const restaurant = {
    name: "고주파",
    rating: 4.1,
    type: "구이",
    best: "가성비",
    hours: "11:00 ~ 21:00",
    breakTime: "14:00 ~ 15:00",
    image: "/img/store-default.jpg",
  };

  const reviews = [
    { id: 1, title: "맛있는데 비쌈", rating: 4.2 },
    { id: 2, title: "존맛탱 인정", rating: 5.0 },
    { id: 3, title: "두 번은 안 감", rating: 2.0 },
    { id: 4, title: "또 갈 듯", rating: 4.5 },
    { id: 5, title: "비싸지만 맛있음", rating: 4.4 },
    { id: 6, title: "평범함", rating: 3.2 },
    { id: 7, title: "먹고 배탈남", rating: 1.0 },
  ];

  const pageSize = 3;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(reviews.length / pageSize);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const paginatedReviews = reviews.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <Wrapper>
      <BackButton to="/">← 메인으로</BackButton> 
      <Content>
        <Image src={restaurant.image} alt="음식 이미지" />
        <TitleRow>
          <Title>{restaurant.name}</Title>
          <Rating>★{restaurant.rating}</Rating>
        </TitleRow>
        <TagList>
          <Tag>#{restaurant.type}</Tag>
          <Tag>#{restaurant.best}</Tag>
          <Tag>#맛</Tag>
        </TagList>
        <Time>
          영업 시간: {restaurant.hours}
          <br />
          휴게 시간: {restaurant.breakTime}
        </Time>

        <ReviewList>
          {paginatedReviews.map((r) => (
            <StyledLink key={r.id} to={`/restaurant/${id}/review/${r.id}`}>
              <ReviewCard>
                <FaUser />
                <span>
                  ★{r.rating} - {r.title}
                </span>
              </ReviewCard>
            </StyledLink>
          ))}
        </ReviewList>
        <Pagination>
        <PageButton onClick={handlePrev} disabled={page === 1}>
          이전
        </PageButton>
        <PageButton onClick={handleNext} disabled={page === totalPages}>
          다음
        </PageButton>
      </Pagination>
      </Content>
    </Wrapper>
  );
};

export default RestaurantDetail;

// ---------- styled-components ----------

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  padding: 1.25rem;
  text-align: center;
  background-color: #f6f6f6;
`;

const Content = styled.div`
  margin-top: 3rem;
  width: 100%;
  max-width: 24rem;
`;

const Image = styled.img`
  width: 100%;
  max-width: 24rem; /* 원하는 가로 사이즈 */
  height: 12rem; /* 원하는 세로 고정 */
  object-fit: cover; /* ✅ 박스 채우기 (잘릴 수 있음) */
  object-position: center; /* ✅ 중앙 기준으로 잘리게 */
  border-radius: 0.5rem;
  display: block;
  margin: 0 auto 0rem auto;
  background-color: #fff; /* 로딩 중 배경 */
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: center; /* 또는 space-between, flex-start 등도 가능 */
  align-items: baseline; /* 제목과 별점 수평 정렬 */
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
`;

const Title = styled.h2`
  font-size: 1.375rem;
  font-weight: 700;
  color: #ff6f61;
`;

const Rating = styled.p`
  color: #ff6f61;
  font-weight: bold;
  font-size: 1.125rem;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.2rem;
  justify-content: center;
`;

const Tag = styled.div`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border: 0.125rem solid #ff6f61;
  border-radius: 1.875rem;
  font-size: 0.8125rem;
  color: #ff6f61;
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const Time = styled.p`
  font-size: 0.8125rem;
  color: rgb(129, 129, 129);
  margin-bottom: 0rem;
  line-height: 1.4;
`;

const ReviewList = styled.ul`
  margin-top: 1rem;
  padding: 0;
  list-style: none;
  width: 100%;
  min-height: 12rem; 
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const ReviewCard = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 0.125rem solid #ff6f61;
  border-radius: 1.875rem;
  margin-bottom: 0.75rem;
  background-color: #fff;
  color: #ff6f61;
  font-weight: 600;
  font-size: 0.9375rem;
  gap: 0.625rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    background-color: #ff6f61;
    color: #fff;
  }

  svg {
    font-size: 1.125rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 6rem;
  margin-top: 1.5rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: bold;
  border: none;
  border-radius: 1rem;
  background-color: ${({ disabled }) => (disabled ? "#ddd" : "#ff6f61")};
  color: ${({ disabled }) => (disabled ? "#999" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ddd" : "#ff3b2f")};
  }
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background-color: #ff6f61;
  color: #fff;
  border-radius: 1rem;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ff3b2f;
  }
`;