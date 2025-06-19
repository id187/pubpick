import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { instance } from "../../api/instance";
import { getRestaurantImage } from "../../components/common/restaurantImages";

const RestaurantDetail = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    instance
      .get(`/place/${id}`)
      .then((res) => {
        const data = res.data.data;
        setRestaurant(data);
        setReviews(data.reviews || []);
      })
      .catch((err) => {
        console.error("음식점 상세 조회 실패:", err);
      });
  }, [id]);

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
  if (!restaurant) return <div>불러오는 중...</div>;
  return (
    <Wrapper>
      {/* <BackButton to="/">← 메인으로</BackButton>  */}
      <Content>
        <Image
          src={getRestaurantImage(restaurant.id) || "/img/store-default.jpg"}
          alt="음식 이미지"
        />
        <TitleRow>
          <Title>{restaurant.name}</Title>
          <Rating>★{restaurant.score}</Rating>
        </TitleRow>
        <TagList>
          {(restaurant.tags || restaurant.tagList || []).map((tag, i) => (
            <Tag key={i}>#{tag}</Tag>
          ))}
        </TagList>
        <Time>{restaurant.cuisine || "정보 없음"}</Time>
        <Time>{restaurant.location || "정보 없음"}</Time>

        <ReviewList>
          {paginatedReviews.map((r) => (
            <StyledLink key={r.id} to={`/restaurant/${id}/review/${r.id}`}>
              <ReviewCard>
                <FaUser />
                <span>
                  ★{r.score} - {r.title}
                </span>
              </ReviewCard>
            </StyledLink>
          ))}
        </ReviewList>
        <Pagination>
          <PageButton onClick={handlePrev} disabled={page === 1}>
            이전
          </PageButton>
          <PageButton
            onClick={handleNext}
            disabled={page >= totalPages || totalPages === 0}
          >
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
  margin-top: 0.2rem;
  width: 100%;
  max-width: 24rem;
`;

const Image = styled.img`
  width: 100%;
  max-width: 24rem; /* 원하는 가로 사이즈 */
  height: 13rem; /* 원하는 세로 고정 */
  object-fit: cover; /* ✅ 박스 채우기 (잘릴 수 있음) */
  object-position: center; /* ✅ 중앙 기준으로 잘리게 */
  border-radius: 0.5rem;
  display: block;
  margin: 0 auto 0rem auto;
  background-color: #fff; /* 로딩 중 배경 */
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
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
  padding: 0.2rem 0.5rem;
  border: 1px solid #ff6f61;
  border-radius: 1rem;
  font-size: 0.6875rem;
  color: #ff6f61;
  font-weight: 500;
  margin-bottom: 0.25rem;
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
  margin-top: 0.1rem;
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
