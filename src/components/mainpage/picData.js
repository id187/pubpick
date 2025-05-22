/* 형식
* id : num
* name : str
* rating: float
* reviewCount: num
* tags : str[]
* imageSrc: str
* position: {lat: , lng: }
*/

/***** 더미 데이터 ******/
export const picData = [
    {
      id: 1,
      name: "고주파",
      rating: 4.8,
      reviewCount: 500,
      tags: ["맛", "분위기", "가성비"],
      imageSrc: "/img/store-default.jpg", 
      position: {lat: 37.5486606311127, lng: 126.938718112055},
    },
    {
      id: 2,
      name: "홍등롱",
      rating: 4.7,
      reviewCount: 350,
      tags: ["맛", "분위기"],
      imageSrc: "/img/store-default.jpg",
      position: {lat: 37.5494973285501, lng: 126.937742516216},
    },
    {
      id: 3,
      name: "서강포차",
      rating: 4.9,
      reviewCount: 420,
      tags: ["가성비"],
      imageSrc: "/img/store-default.jpg",
      position: {lat: 37.5510951397867, lng: 126.937535676355},
    },
    {
      id: 4,
      name: "낭만 오지",
      rating: 4.5,
      reviewCount: 420,
      tags: ["가성비"],
      imageSrc: "/img/store-default.jpg",
      position: {lat: 37.5536693063558, lng: 126.93807799194},
    },
    // 필요에 따라 더 많은 아이템 추가
  ];