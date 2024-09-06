// 배너, 카테고리 , 추천 상품 데이터
import { Data } from "./Data.js";
const datas = Data();
const data = datas.components;

// 상품 데이터
import { Data1 } from "./Data1.js";
const datas1 = Data1();
const data1 = datas1.components;

// console.log(data);
// console.log(data1);

/*
    component 95 : 배너
    component 33 : 카테고리
    component 2 : 상단 과 메인 섹션 나누는 데이터
    component 79 : 상품 리스트
*/

// 배너 데이터 타입 정의
interface Itme1 {
  image_url?: string;
}
//  베너 데이터 추출
const d1 = data[0].entity.item_list;

let imgWidth : number;

// 배너 광고 박스
const EventContentBox = document.getElementById("e-content") as HTMLDivElement;
// 왼쪽 버튼
const leftBtn = document.getElementById("left-btn") as HTMLButtonElement;
// 오른쪽 버튼
const rightBtn = document.getElementById("right-btn") as HTMLButtonElement;
// 컨텐츠 카운터
const counter = document.querySelector(".counter") as HTMLSpanElement;

let contentCount = 1; // 컨텐츠 카운터
let contentValue = 0; // 컨텐츠 위치 값

// 배너 엘리먼트 생성
d1.map(({ item }: { item: Itme1 }, i) => {
  const contentElement = document.createElement("img") as HTMLImageElement;
  contentElement.classList.add("content-item");

  // 데이터 확인
  if (item.image_url) {
    contentElement.src = item.image_url;
    contentElement.classList.add("e-content-img");
    // console.log(item.image_url); // 이미지 데이터 확인
  }
  EventContentBox.appendChild(contentElement); // 렌더링
});

// 오른쪽 넘기기 동작
function rightslide() {
  if (contentCount < d1.length + 1) {
    const w = document.querySelector(".content-item") as HTMLImageElement;
    imgWidth = w.offsetWidth;
    // 오른쪽으로 넘기기
    contentValue -= imgWidth;
    contentCount += 1;
    // console.log("광고 위치 값" + contentValue); // 위치 값 확인
    EventContentBox.style.left = `${contentValue}px`;
    counter.innerText = `${contentCount} / ${d1.length - 1}`;
  }
  if (contentCount >= d1.length) {
    // 마지막 컨텐츠일 때
    contentCount = 1;
    contentValue = 0;
    EventContentBox.style.left = `${contentValue}px`;
    counter.innerText = `${contentCount} / ${d1.length - 1}`;
  }
}

// 오른쪽 버튼 핸들러
rightBtn.addEventListener("click", () => {
  rightslide();
});

// 왼쪽 버튼 핸들러
leftBtn.addEventListener("click", () => {
  const w = document.querySelector(".content-item") as HTMLImageElement;
  imgWidth = w.offsetWidth;
  if (contentCount > 0) {
    // 오른쪽으로 넘기기
    contentValue += imgWidth;
    contentCount -= 1;
    // console.log("광고 위치 값" + contentValue); // 위치 값 확인
    EventContentBox.style.left = `${contentValue}px`;
    counter.innerText = `${contentCount} / ${d1.length - 1}`;
  }
  if (contentCount === 0) {
    // 마지막 컨텐츠일 때
    contentCount = 16;
    contentValue = -9600;
    EventContentBox.style.left = `${contentValue}px`;
    counter.innerText = `${contentCount} / ${d1.length - 1}`;
  }
});

// 배너 넘기기 자동화
setInterval(() => {
  rightslide();
}, 3000);

// -----------------------------------------------------------

// 카테고리 데이터 타입
interface Item2 {
  name?: string;
  representative_image?: string;
}
// 데이터 추출
const d2 = data[1].entity.item_list;
// console.log(d2) // 데이터 추출 확인

// 카테고리 박스
const categoryBox = document.querySelector(
  ".category"
) as HTMLElementTagNameMap["section"];

// 카테고리 엘리먼트 생성
d2.map(({ item }: { item: Item2 }, i) => {
  // console.log(item) // 데이터 요소 확인
  const categoryElement = document.createElement("div") as HTMLDivElement;
  categoryElement.classList.add("category-item");

  // 이미지 엘리먼트 생성 및 설정
  const categoryImg = document.createElement("img") as HTMLImageElement;
  categoryImg.src = `${item.representative_image}`;
  categoryImg.classList.add("category-img");

  // 이름 엘리먼트 생성 및 설정
  const nameElement = document.createElement("div") as HTMLDivElement;
  nameElement.innerText = `${item.name}`;

  categoryElement.appendChild(categoryImg);
  categoryElement.appendChild(nameElement);
  categoryBox.appendChild(categoryElement);
});

// ---------------------------------------------------------------------

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
const titleElement = document.querySelector(
  ".recommended-products-title"
) as HTMLSpanElement;
// 스폰서
const textElement = document.querySelector(
  ".recommended-products-text"
) as HTMLSpanElement;
titleElement.innerText = `${data[3].entity.header?.item.title}`;
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

// -------------------------------------------------------------------

interface Item1_1 {
  // 데이터 타입
  image?: string;
  market_name?: string;
  name?: string;
  price?: number;
  discount_rate?: number;
  sell_count?: number;
}

interface DataItem {
  // 추출 및 매개변수로 전달할 데이터의 타입
  item_entity: {
    item: Item1_1;
    logging: any;
    render: any;
  };
  type: string;
}

const d1_1 = data1[0].entity.item_list; // 데이터 추출

// 상품 컨테이너
const productsContainer = document.querySelector(
  ".products"
) as HTMLElementTagNameMap["section"];
// 상품 넣을 그리드
const products = document.createElement("div") as HTMLDivElement;
products.style.width = "100%";
products.style.height = `${(400 * (d1_1.length + 1)) / 2}px`; // 행 당 430px * 행의 수
products.style.display = "grid";
products.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
products.style.gridTemplateRows = `repeat(${
  (d1_1.length + 1) / 2
}, minmax(0, 1fr))`; // 데이터 수 만큼 행 생성
products.style.rowGap = "5px";
products.style.columnGap = "10px";
products.style.paddingBottom = "200px";
productsContainer.appendChild(products);

function productCreate(data: DataItem[]) {
  data.map((d: DataItem, i: number) => {
    const item: Item1_1 = d.item_entity.item; // 데이터 추출

    // 상품 박스
    const product = document.createElement("div") as HTMLDivElement;
    product.classList.add("product");

    // 상품 이미지
    const productImg = document.createElement("img") as HTMLImageElement;
    productImg.src = `${item.image}`;
    productImg.classList.add("product-img");

    // 상품 가격 박스
    const productPriceBox = document.createElement("div") as HTMLDivElement;
    productPriceBox.classList.add("product-price-box");

    // 상품 할인율
    const productSale = document.createElement("span") as HTMLSpanElement;
    productSale.innerText = `${item.discount_rate}%`;
    productSale.classList.add("product-sale");

    // 상품 가격
    const productPrice = document.createElement("span") as HTMLSpanElement;
    productPrice.innerText = `${item.price?.toLocaleString()}`;
    productPrice.classList.add("product-price");

    // 브랜드 이름
    const productBrand = document.createElement("span") as HTMLSpanElement;
    productBrand.innerText = `${item.market_name}`;
    productBrand.classList.add("product-brand");

    // 상품 내용
    const productExplanation = document.createElement(
      "span"
    ) as HTMLSpanElement;
    productExplanation.innerText = `${item.name}`;
    productExplanation.classList.add("product-explanation");

    // 구매 수
    const productSellCount = document.createElement("span") as HTMLSpanElement;
    productSellCount.innerText = `${item.sell_count?.toLocaleString()}개 구매중`;
    productSellCount.classList.add("product-sell-count");

    // 상품 가격 박스에 엘리먼트 추가
    productPriceBox.appendChild(productSale);
    productPriceBox.appendChild(productPrice);

    // 상품박스에 엘리먼트 추가
    product.appendChild(productImg);
    product.appendChild(productPriceBox);
    product.appendChild(productBrand);
    product.appendChild(productExplanation);
    product.appendChild(productSellCount);

    // 렌더링
    products.appendChild(product);
  });
}
// 첫 렌더링
productCreate(d1_1);

// 데이터 불러오기
window.addEventListener("scroll", () => {
  if (!input.value) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 스크롤 끝에 도달 했을 때
    if (scrollTop + windowHeight >= documentHeight - 50) {
      // 데이터를 두 배로 늘리기
      const d1_1clone: DataItem[] = d1_1.concat(
        d1_1.map((data) => ({ ...data }))
      );
      productCreate(d1_1clone); // 데이터를 추가한 데이터를 렌더링
    }
  }
});

// -------------------------------------------------

// 검색창
const input = document.getElementById("search-input") as HTMLInputElement;

// 입력값이 바뀔 때 마다 필터링 이벤트 실행
input.addEventListener("input", () => {
  const filterData = d1_1.filter((data, i) => {
    return data.item_entity.item.market_name.includes(input.value);
  });

  // console.log(filterData);

  products.innerHTML = ""; // 기존 상품 초기화

  if (input.value) {
    productCreate(filterData);
    const product = document.querySelectorAll(
      ".product"
    ) as NodeListOf<HTMLDivElement>;
    product.forEach((element) => {
      element.style.height = "25%";
    });

    // 데이터 불러오기
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 50) {
        // 데이터를 두 배로 늘리기
        const d1_1clone = filterData.concat(
          filterData.map((data) => ({ ...data }))
        );

        products.innerHTML = ""; // 기존 상품 초기화

        productCreate(filterData); // 필터링 된 데이터로 렌더링
        const product = document.querySelectorAll(
          ".product"
        ) as NodeListOf<HTMLDivElement>;
        product.forEach((element) => {
          element.style.height = "25%";
        });
      }
    });
  } else {
    products.innerHTML = ""; // 기존 데이터 삭제
    productCreate(d1_1); // 입력값이 없으면 기존의 모든 데이터 렌더링
  }
});
