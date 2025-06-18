import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { instance } from "../api/instance";

const ReviewWrite = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState("");
  const [placeList, setPlaceList] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await instance.get("/place");
        setPlaceList(res.data.data);
      } catch (err) {
        console.error("장소 목록 불러오기 실패", err);
      }
    };

    fetchPlaces();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };
  const [showModal, setShowModal] = useState(false);

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setShowModal(false);
  };

  const [rating, setRating] = useState(0);
  const handleStarClick = (e, index) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;
    const isHalf = clickX < width / 2;
    const selectedRating = isHalf ? index + 0.5 : index + 1;
    setRating(selectedRating);
  };

  const location = useLocation();
  const fromPath = location.state?.from; // 예: "/restaurant/1"
  const token = localStorage.getItem("accessToken");

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    const storedEmail = localStorage.getItem("email");

    if (storedNickname) setNickname(storedNickname);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [openList, setOpenList] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const maxTags = 3;
  const [tagListVisible, setTagListVisible] = useState(false);
  const handleRemoveTag = (tag) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };


  const handleAddTag = (tag) => {
    if (!selectedTags.includes(tag) && selectedTags.length < maxTags) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const tagNameMap = {
    "분위기가 좋아요": "분위기",
    "가성비가 좋아요": "가성비",
    "안주가 맛있어요": "안주맛집",
    "직원들이 친절해요": "직원친절",
    "화장실이 깨끗해요": "화장실굿",
    "단체회식하기 좋아요": "단체회식",
    "2차로 좋아요": "적합2차",
    "대화하기 좋아요": "대화하기좋음",
    "그냥 그래요": "그냥그래",
    "비추천": "비추천"
  };

  const tagOptions = Object.keys(tagNameMap);

  const handleSubmit = async () => {
    if (!selectedPlace?.id) {
      alert("장소를 선택해주세요.");
      return;
    }

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }

    if (!comment.trim()) {
      alert("리뷰 본문을 작성해주세요.");
      return;
    }

    try {
      await instance.post(
        `/review/${selectedPlace.id}`,
        {
          title,
          comment,
          score: rating,
          tags: mappedTags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("리뷰가 등록되었습니다!");
      navigate(`/restaurant/${selectedPlace.id}`);
    } catch (err) {
      console.error("리뷰 등록 실패", err);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  

  const mappedTags = selectedTags.map((tag) => tagNameMap[tag]);

  return (
    <Container>
      <Header>
        <CancelButton onClick={() => navigate(-1)}>취소</CancelButton>
        <DoneButton onClick={handleSubmit}>완료</DoneButton>
      </Header>

      <UserInfo>
        <Avatar />
        <UserText>
          <Name>{nickname || "닉네임 없음"}</Name>
          <Username>{email || "이메일 없음"}</Username>
        </UserText>
      </UserInfo>
      <TitleInput
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <PhotoLocationRow>
        <ImageUploadArea>
          <label htmlFor="image-upload">
            {image ? (
              <UploadedContainer>
                <UploadedImage src={image} alt="uploaded" />
                <DeleteButton
                  onClick={(e) => {
                    e.preventDefault();
                    setImage(null);
                  }}
                >
                  ×
                </DeleteButton>
              </UploadedContainer>
            ) : (
              <UploadPlaceholder>
                <FaCamera size={40} />
                <span>사진을 추가하세요</span>
              </UploadPlaceholder>
            )}
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </ImageUploadArea>
        <TagColumn>
          <AddTagButton
            onClick={() => setTagListVisible((prev) => !prev)}
            disabled={selectedTags.length >= maxTags && !tagListVisible}
          >
            + 태그추가
          </AddTagButton>
          {tagListVisible && (
            <TagOptionsBox>
              {tagOptions.map((tag) => (
                <TagOption
                  key={tag}
                  onClick={() => {
                    handleAddTag(tag);
                    if (selectedTags.length + 1 >= maxTags) {
                      setTagListVisible(false);
                    }
                  }}
                  disabled={selectedTags.includes(tag)}
                >
                  {tag}
                </TagOption>
              ))}
            </TagOptionsBox>
          )}

          <TagList>
            {selectedTags.map((tag) => (
              <Tag key={tag}>
                {tag}
                <RemoveX onClick={() => handleRemoveTag(tag)}>×</RemoveX>
              </Tag>
            ))}
          </TagList>
        </TagColumn>
      </PhotoLocationRow>
      <LocationSelector>
        <LocationDisplay onClick={() => setOpenList((prev) => !prev)}>
          <FaMapMarkerAlt /> 장소: {selectedPlace?.name || "(선택하세요)"}
        </LocationDisplay>

        {openList && (
          <LocationList>
            {placeList.map((store) => (
              <LocationItem
                key={store.id}
                onClick={() => {
                  setSelectedPlace(store);
                  setOpenList(false);
                }}
              >
                {store.name}
              </LocationItem>
            ))}
          </LocationList>
        )}
      </LocationSelector>
      <StarRow>
        {[0, 1, 2, 3, 4].map((i) => (
          <StarWrapper key={i} onClick={(e) => handleStarClick(e, i)}>
            <Star filled={rating >= i + 1} half={rating === i + 0.5}>
              ★
            </Star>
          </StarWrapper>
        ))}
      </StarRow>
      <RatingText>{rating.toFixed(1)} / 5.0</RatingText>

      <FormWrapper>
        <TextArea
          placeholder="리뷰를 작성해 주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </FormWrapper>
    </Container>
  );
};

export default ReviewWrite;

// ---------- styled-components ----------

const Container = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: #f6f6f6;
  padding: 1rem;
  position: relative;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -0.3rem;
  margin-bottom: 0.5rem;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #ff6f61;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const DoneButton = styled.button`
  background-color: #ffdab9;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 1rem;
  font-weight: bold;
  color: #ff6f61;
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-image: url("/img/profile-default.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Name = styled.span`
  font-weight: bold;
`;

const Username = styled.span`
  font-size: 0.875rem;
  color: #aaa;
`;

const FormWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 0.4rem;
  padding-bottom: 3.2rem;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  height: 2.75rem;
  font-size: 1.05rem;
  font-weight: 600;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  background-color: #fff;
  box-sizing: border-box;
  margin-bottom: 0.5rem;

  ::placeholder {
    color: #bbb;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border-color: #ff6f61;
    box-shadow: 0 0 0 2px #ffece9;
  }
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  resize: none;
  color: #333;
  background-color: #fff;
  outline: none;
  min-height: 12rem;
  box-sizing: border-box;

  ::placeholder {
    color: #aaa;
  }
`;

const ImageUploadArea = styled.div`
  width: 45%;
  aspect-ratio: 4 / 3;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #e0e0e0;
  margin: 0 auto 0 auto;
  cursor: pointer;
`;

const UploadPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  color: #999;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.05);
`;

const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PhotoLocationRow = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  align-items: flex-start;
`;

const StarRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.25rem 0 0.5rem;
`;

const StarWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const Star = styled.div`
  color: ${({ filled, half }) => (filled || half ? "#ff6f61" : "#ddd")};
  font-size: 2rem;
  line-height: 1;
  position: relative;

  ${({ half }) =>
    half &&
    `
    background: linear-gradient(to right, #ff6f61 50%, #ddd 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`;

const RatingText = styled.div`
  text-align: center;
  font-size: 0.95rem;
  color: #ff6f61;
  font-weight: bold;
`;

const UploadedContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: center;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const LocationSelector = styled.div`
  margin: 0.2rem 0;
  position: relative;
`;

const LocationDisplay = styled.div`
  color: #ff6f61;
  font-weight: bold;
  cursor: pointer;
`;

const LocationList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  padding: 0.5rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  z-index: 20;
  width: 100%;
  box-sizing: border-box;
`;

const LocationItem = styled.li`
  padding: 0.5rem 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: #ffece9;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Tag = styled.div`
  background-color: #ffece9;
  border: 1px solid #ff6f61;
  color: #ff6f61;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
`;

const RemoveX = styled.span`
  margin-left: 0.4rem;
  cursor: pointer;
  font-weight: bold;
`;

const TagColumn = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const AddTagButton = styled.button`
  background: none;
  color: #ff6f61;
  border: none;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: left;
  padding: 0;
  margin-bottom: 0.5rem;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const TagOptionsBox = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 0;
  z-index: 10;
  max-width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  box-sizing: border-box;
  overflow: hidden;
`;

const TagOption = styled.button`
  background-color: #ffece9;
  border: 1px solid #ff6f61;
  color: #ff6f61;
  border-radius: 1rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.85rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
