// 날짜 가져오기
const date = new Date();
const month = `${date.getMonth() + 1}월`;
const day = `${date.getDate()}일`;
const time = `${date.getHours()}`;

interface Data {
  title: string;
  current_time: string;
  menu_item: string[];
  search_lists: object;
}

// 데이터
const data: Data = {
  title: "인기검색어",
  current_time: `${month}${day} ${time}:00 기준`,
  menu_item: [
    "전체",
    "10대",
    "20대 초반",
    "20대 중반",
    "20대 후반",
    "30대 이상",
  ],
  search_lists: {
    search_list_all: [
      "메신저백",
      "커플링",
      "필통",
      "집업",
      "드레스",
      "크롭반팔",
      "샤프",
      "트레이닝바지",
      "선글라스",
      "후드티",
    ],
    search_list_10: [
      "메신저백",
      "책가방",
      "드레스",
      "운동화",
      "간식",
      "샤프",
      "선글라스",
      "생일선물",
      "미니백팩",
      "브라탑",
    ],
    search_list_20_1: [
      "아디다스 저지",
      "넥타이",
      "지갑",
      "레깅스",
      "커플케이스",
      "인형",
      "블러셔",
      "래쉬가드",
      "향수",
      "필통",
    ],
    search_list_20_2: [
      "필통",
      "출근룩",
      "여름슬랙스",
      "집업",
      "커플링",
      "여름 긴팔",
      "컨실러",
      "후드티",
      "카드케이스",
      "카드 지갑",
    ],
    search_list_20_3: [
      "흠뻑쇼",
      "멜빵",
      "모자",
      "반지",
      "폰케이스",
      "래쉬가드",
      "파우치",
      "카고바지",
      "여름",
      "양말",
    ],
    search_list_30: [
      "랩원피스",
      "점프슈트",
      "맨투맨",
      "시계",
      "안경",
      "청자켓",
      "카고반바지",
      "빅사이즈 바지",
      "끈나시",
      "인형",
    ],
  },
};

// 각 섹션 컨테이너
const titleBox = document.querySelector(
  ".title-box"
) as HTMLElementTagNameMap["section"];
const menuBox = document.querySelector(
  ".menu-box"
) as HTMLElementTagNameMap["section"];
const serachBox = document.querySelector(
  ".serach-box"
) as HTMLElementTagNameMap["section"];

// 타이틀 엘리먼트
const titleElement = document.createElement("span") as HTMLSpanElement;
titleElement.innerText = `${data.title}`;
titleElement.classList.add("title");

// 기준 날짜 엘리먼트
const timeElement = document.createElement("span") as HTMLSpanElement;
timeElement.innerText = `${data.current_time}`;
timeElement.classList.add("time");

titleBox.appendChild(titleElement);
titleBox.appendChild(timeElement);

let isChoiceFilter = 0; // 필터 제어 값
// 메뉴 리스트 생성
data.menu_item.forEach((item, i) => {
  const itemElement = document.createElement("span") as HTMLSpanElement;
  itemElement.innerText = `${item}`;
  itemElement.classList.add("menu-item");

//  메뉴 클릭 시 스타일 변경 및 검색어 엘리먼트 데이터 변경 
  itemElement.addEventListener("click", () => {
    data.menu_item.forEach((item, j) => {
        // 생성한 메뉴 엘리먼트에서 클릭한 엘리먼트를 가져오기
      const menu_item = document.querySelector(
        `.menu-item:nth-child(${j + 1})`
      ) as HTMLDivElement;
      if (i === j) { // 클릭한 엘리먼트만
        menu_item.style.backgroundColor = "gray";
        menu_item.style.color = "#fff";
        isChoiceFilter = j; // 클릭한 필터 값 변경
        serachBox.innerHTML = ""; // 기존의 데이터를 초기화
        searchElementCtrate(); // 바뀐 데이터로 생성
      } else {
        menu_item.style.backgroundColor = "#fff";
        menu_item.style.color = "#000";
      }
    });
  });

  menuBox.appendChild(itemElement);
});

// 데이터 추출
const serachData = Object.values(data.search_lists);

// 검색어 순위 엘리먼트 렌더링
function searchElementCtrate() {
  serachData.forEach((items: string[], i: number) => {
    items.forEach((item: string, j: number) => {
      if (isChoiceFilter === i) {
        const searchElement = document.createElement("span") as HTMLSpanElement;
        searchElement.innerText = `${j+1}. ${item}`;
        searchElement.classList.add("search-item");

        serachBox.appendChild(searchElement);
      }
    });
  });
};
searchElementCtrate();


const input = document.getElementById('input') as HTMLInputElement;
const xIcon = document.querySelector('.x-icon') as HTMLElement;

xIcon.addEventListener('click' , () => {
  input.value = "";
});

