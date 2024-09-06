var _a, _b;
// 배너, 카테고리 , 추천 상품 데이터
import { Data } from "./Data.js";
const datas = Data();
const data = datas.components;
// 유저 데이터 복사
let userDatas;
let userID;
// 로그인 시도
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // 서버 제출 제한
    // 유저 아이디
    const userId = document.getElementById("login-id");
    // 유저 비밀번호
    const userPw = document.getElementById("login-pw");
    // 로컬 스토리지의 유저 데이터 - 가입한 유저 데이터
    const userData = localStorage.getItem(userId.value);
    userDatas = userData;
    userID = userId.value;
    // 유저 이름
    const userNameElement = document.querySelector(".user-name");
    userNameElement.classList.add("user-name");
    if (userData) {
        userNameElement.innerText = `${JSON.parse(userData).name}님`;
        // 아이디 검사
        const user = JSON.parse(userData);
        if (user && user.userPw === userPw.value) {
            // 비밀번호 검사
            window.alert(`${user.name}님, 환영합니다!`);
            user.isLogin = true; // 로그인 상태로 변경
            localStorage.setItem(userId.value, JSON.stringify(user)); // 로그인 상태로 저장
            if (user.isLogin) {
                // 유저 페이지
                const userELement = document.querySelector(".user-container");
                userELement.style.transform = "scale(1)";
            }
        }
        else {
            window.alert("아이디 혹은 비밀번호가 일치하지 않습니다!");
        }
    }
    else {
        window.alert("아이디 혹은 비밀번호가 일치하지 않습니다!");
    }
});
// 회원가입 모달 나오는 버튼
const signupNav = document.querySelector(".signup-nav");
// 회원가입 컨테이너
const signupContainer = document.querySelector(".signup-container");
// 회원가입 폼
const signupForm = document.getElementById("signup-form");
// 회원가입 모달 나가기 버튼
const signupX = document.querySelector(".signup-x");
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
    const userName = document.getElementById("signup-name");
    // 유저 아이디
    const userId = document.getElementById("signup-id");
    const userPw = document.getElementById("signup-pw");
    // 입력값이 모두 충족할 때
    if (userId.value && userName.value && userPw) {
        // 유저 정보를 로컬 스토리지에 저장
        localStorage.setItem(userId.value, JSON.stringify({
            userPw: userPw.value,
            name: userName.value,
            isLogin: false,
        }));
        window.alert(`${userName.value}님 환영합니다!`);
        signupContainer.style.transform = "scale(0)";
    }
});
// 로그아웃 버튼
const logout = document.querySelector(".logout");
logout.addEventListener("click", () => {
    if (userDatas && userID) {
        const user = JSON.parse(userDatas);
        user.isLogin = false;
        localStorage.setItem(userID, JSON.stringify(user));
        // 유저 페이지 나가기
        const userELement = document.querySelector(".user-container");
        userELement.style.transform = "scale(0)";
        window.alert("로그아웃하였습니다.");
    }
});
const d3 = data[3].entity.item_list; // 데이터 추출
// 추천상품 타이틀
const RtitleElement = document.querySelector(".recommended-products-title");
// 스폰서
const textElement = document.querySelector(".recommended-products-text");
RtitleElement.innerText = `${(_a = data[3].entity.header) === null || _a === void 0 ? void 0 : _a.item.title}`;
textElement.innerHTML = `${(_b = data[3].entity.header) === null || _b === void 0 ? void 0 : _b.item.text}`;
// 추천 상품 박스
const recommendedProductsBox = document.querySelector(".recommended-products-box");
// 추천 상품 엘리먼트 생성
d3.map(({ item }, i) => {
    // console.log(item); // 데이터 확인
    var _a;
    // 상품 박스 생성
    const recommendedProducts = document.createElement("div");
    recommendedProducts.classList.add("recommended-Products-item");
    // 이미지 생성
    const recommendedProductsImg = document.createElement("img");
    recommendedProductsImg.src = `${item.image}`;
    recommendedProductsImg.classList.add("recommended-Products-img");
    // 상품 가격 박스 생성
    const recommendedProductsPriceBox = document.createElement("div");
    recommendedProductsPriceBox.classList.add("recommended-Products-price-box");
    // 상품 할인율 생성
    const recommendedProductsSale = document.createElement("div");
    recommendedProductsSale.innerText = `${item.discount_rate}%`;
    recommendedProductsSale.classList.add("recommended-Products-sale");
    // 상품 가격 생성
    const recommendedProductsPrice = document.createElement("div");
    recommendedProductsPrice.innerText = `${(_a = item.price) === null || _a === void 0 ? void 0 : _a.toLocaleString()}`;
    // 브랜드 생성
    const recommendedProductsBrand = document.createElement("div");
    recommendedProductsBrand.innerText = `${item.market_name}`;
    recommendedProductsBrand.classList.add("recommended-Products-brand");
    // 상품 내용 생성
    const recommendedProductsExplanation = document.createElement("div");
    recommendedProductsExplanation.innerText = `${item.name}`;
    recommendedProductsExplanation.classList.add("recommended-Products-explanation");
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
