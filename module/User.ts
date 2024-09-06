// 배너, 카테고리 , 추천 상품 데이터
import { Data } from "./Data.js";
const datas = Data();
const data = datas.components;

interface User {
  name: string;
  userPw: string;
  isLogin: boolean;
}
// 유저 데이터 복사
let userDatas: string | null;
let userID: string | null;

// 로그인 시도
const loginForm = document.getElementById("login-form") as HTMLFormElement;
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 서버 제출 제한

  // 유저 아이디
  const userId = document.getElementById("login-id") as HTMLInputElement;
  // 유저 비밀번호
  const userPw = document.getElementById("login-pw") as HTMLInputElement;

  // 로컬 스토리지의 유저 데이터 - 가입한 유저 데이터
  const userData = localStorage.getItem(userId.value);
  userDatas = userData;
  userID = userId.value;
  // 유저 이름
  const userNameElement = document.querySelector(
    ".user-name"
  ) as HTMLSpanElement;
  userNameElement.classList.add("user-name");
  if (userData) {
    userNameElement.innerText = `${JSON.parse(userData).name}님`;
    // 아이디 검사
    const user: User = JSON.parse(userData);
    if (user && user.userPw === userPw.value) {
      // 비밀번호 검사
      window.alert(`${user.name}님, 환영합니다!`);
      user.isLogin = true; // 로그인 상태로 변경
      localStorage.setItem(userId.value, JSON.stringify(user)); // 로그인 상태로 저장

      if (user.isLogin) {
        // 유저 페이지
        const userELement = document.querySelector(
          ".user-container"
        ) as HTMLElementTagNameMap["section"];
        userELement.style.transform = "scale(1)";
      }
    } else {
      window.alert("아이디 혹은 비밀번호가 일치하지 않습니다!");
    }
  } else {
    window.alert("아이디 혹은 비밀번호가 일치하지 않습니다!");
  }
});

// 회원가입 모달 나오는 버튼
const signupNav = document.querySelector(".signup-nav") as HTMLSpanElement;
// 회원가입 컨테이너
const signupContainer = document.querySelector(
  ".signup-container"
) as HTMLElementTagNameMap["section"];
// 회원가입 폼
const signupForm = document.getElementById("signup-form") as HTMLFormElement;
// 회원가입 모달 나가기 버튼
const signupX = document.querySelector(".signup-x") as HTMLElement;
// 회원가입 모달 등장 이벤트
signupNav.addEventListener("click", () => {
  signupContainer.style.transform = "scale(1)";
});
// 회원가입 모달 나가기 이벤트
signupX.addEventListener("click", () => {
  signupContainer.style.transform = "scale(0)";
});

// 회원가입
signupForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 서버 제출 제한

  // 유저 이름
  const userName = document.getElementById("signup-name") as HTMLInputElement;
  // 유저 아이디
  const userId = document.getElementById("signup-id") as HTMLInputElement;
  const userPw = document.getElementById("signup-pw") as HTMLInputElement;

  // 입력값이 모두 충족할 때
  if (userId.value && userName.value && userPw) {
    // 유저 정보를 로컬 스토리지에 저장
    localStorage.setItem(
      userId.value,
      JSON.stringify({
        userPw: userPw.value,
        name: userName.value,
        isLogin: false,
      })
    );
    window.alert(`${userName.value}님 환영합니다!`);
    signupContainer.style.transform = "scale(0)";
  }
});

// 로그아웃 버튼
const logout = document.querySelector(".logout") as HTMLSpanElement;

logout.addEventListener("click", () => {
  if (userDatas && userID) {
    const user: User = JSON.parse(userDatas);
    user.isLogin = false;
    localStorage.setItem(userID, JSON.stringify(user));

    // 유저 페이지 나가기
    const userELement = document.querySelector(
      ".user-container"
    ) as HTMLElementTagNameMap["section"];
    userELement.style.transform = "scale(0)";

    window.alert("로그아웃하였습니다.");
  }
});

// -----------------------------------------------------
// 추천 상품 데이터 타입
interface Item3 {
  image?: string;
  market_name?: string;
  name?: string;
  price?: number;
  discount_rate?: number;
}

const d3 = data[3].entity.item_list; // 데이터 추출

// 추천상품 타이틀
const RtitleElement = document.querySelector(
  ".recommended-products-title"
) as HTMLSpanElement;
// 스폰서
const textElement = document.querySelector(
  ".recommended-products-text"
) as HTMLSpanElement;
RtitleElement.innerText = `${data[3].entity.header?.item.title}`;
textElement.innerHTML = `${data[3].entity.header?.item.text}`;

// 추천 상품 박스
const recommendedProductsBox = document.querySelector(
  ".recommended-products-box"
) as HTMLDivElement;

// 추천 상품 엘리먼트 생성
d3.map(({ item }: { item: Item3 }, i) => {
  // console.log(item); // 데이터 확인

  // 상품 박스 생성
  const recommendedProducts = document.createElement("div") as HTMLDivElement;
  recommendedProducts.classList.add("recommended-Products-item");

  // 이미지 생성
  const recommendedProductsImg = document.createElement(
    "img"
  ) as HTMLImageElement;
  recommendedProductsImg.src = `${item.image}`;
  recommendedProductsImg.classList.add("recommended-Products-img");

  // 상품 가격 박스 생성
  const recommendedProductsPriceBox = document.createElement(
    "div"
  ) as HTMLDivElement;
  recommendedProductsPriceBox.classList.add("recommended-Products-price-box");

  // 상품 할인율 생성
  const recommendedProductsSale = document.createElement(
    "div"
  ) as HTMLDivElement;
  recommendedProductsSale.innerText = `${item.discount_rate}%`;
  recommendedProductsSale.classList.add("recommended-Products-sale");

  // 상품 가격 생성
  const recommendedProductsPrice = document.createElement(
    "div"
  ) as HTMLDivElement;
  recommendedProductsPrice.innerText = `${item.price?.toLocaleString()}`;

  // 브랜드 생성
  const recommendedProductsBrand = document.createElement(
    "div"
  ) as HTMLDivElement;
  recommendedProductsBrand.innerText = `${item.market_name}`;
  recommendedProductsBrand.classList.add("recommended-Products-brand");

  // 상품 내용 생성
  const recommendedProductsExplanation = document.createElement(
    "div"
  ) as HTMLDivElement;
  recommendedProductsExplanation.innerText = `${item.name}`;
  recommendedProductsExplanation.classList.add(
    "recommended-Products-explanation"
  );

  // 가격 박스 렌더링
  recommendedProductsPriceBox.appendChild(recommendedProductsSale);
  recommendedProductsPriceBox.appendChild(recommendedProductsPrice);

  // 렌더링
  recommendedProducts.appendChild(recommendedProductsImg);
  recommendedProducts.appendChild(recommendedProductsPriceBox);
  recommendedProducts.appendChild(recommendedProductsBrand);
  recommendedProducts.appendChild(recommendedProductsExplanation);
  recommendedProductsBox.appendChild(recommendedProducts);
});
