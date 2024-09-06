import { CategoryData } from "./Category_Data.js";
const d = CategoryData();
const datas = d.serverQueryClient.queries[0].state.data.itemList; // 데이터 추출
// console.log(datas);
// 카테고리 사이드 바
const sidebar = document.querySelector(".category-sidebar");
// 카테고리 종류 컨테이너
const itemBox = document.querySelector(".category-itemBox");
let listTop = [];
// 사이드 바 카테고리 아이템 생성
datas.map((data, i) => {
    const listElement = document.createElement("span");
    listElement.innerText = `${data.item.name}`;
    listElement.classList.add("category-sidebar-list");
    // 클릭 시 이동 이벤트
    listElement.addEventListener("click", () => {
        datas.forEach((d, index) => {
            const list = document.querySelector(`.category-sidebar-list:nth-child(${index + 1})`);
            //   클릭한 엘리먼트만 변경
            if (index === i) {
                list.style.backgroundColor = "#fff";
                itemBox.scrollTo({
                    top: listTop[index] - 50,
                    left: 0,
                    behavior: 'smooth'
                });
            }
            else {
                list.style.backgroundColor = "#ddd";
            }
        });
    });
    //카테고리 타이틀
    const categoryTilte = document.createElement("span");
    categoryTilte.classList.add("category-title");
    categoryTilte.innerText = `${data.item.name}`;
    //   카테고리 박스
    const categoryBox = document.createElement("div");
    categoryBox.classList.add("category-box");
    categoryBox.appendChild(categoryTilte);
    //   카테고리 그리드 아이템 박스
    const itemElementBox = document.createElement("div");
    itemElementBox.classList.add("items-box");
    itemElementBox.style.gridTemplateRows = `repeat(${data.item.subCategoryList.length / 3}, minmax(0, 1fr))`;
    // 카테고리 종류 생성
    data.item.subCategoryList.map((subData, i) => {
        // console.log(subData);
        // 카테고리 아이템
        const itemElement = document.createElement("div");
        itemElement.classList.add("item-box");
        const imgBox = document.createElement("div");
        imgBox.classList.add("category-img-Box");
        // 아이템 이미지
        const imgItemElement = document.createElement("img");
        imgItemElement.src = `${subData.item.image}`;
        imgItemElement.classList.add("item-img");
        // 아이템 이름
        const itemNameElement = document.createElement("span");
        itemNameElement.innerText = `${subData.item.name}`;
        itemNameElement.classList.add("item-name");
        imgBox.appendChild(imgItemElement);
        itemElement.appendChild(imgBox);
        itemElement.appendChild(itemNameElement);
        itemElementBox.appendChild(itemElement);
    });
    categoryBox.appendChild(itemElementBox);
    itemBox.appendChild(categoryBox);
    sidebar.appendChild(listElement);
    listTop.push(categoryTilte.offsetTop); // 카테고리 별 위치 값
});
// 전체보기 컨테이너
const categoryOverView = document.querySelector(".category-all");
// 전체보기 이동 아이콘
const n2 = document.getElementById("n2");
// 뒤로가기 버튼
const back = document.getElementById("category-back");
let isOverViewOn = false; // 오버 뷰 제어값
// 오버 뷰 등장 이벤트
n2.addEventListener("click", () => {
    if (isOverViewOn) {
        categoryOverView.style.top = "100vh";
        isOverViewOn = false;
    }
    else {
        categoryOverView.style.top = "50px";
        isOverViewOn = true;
    }
});
// 뒤로가기 이벤트
back.addEventListener("click", () => {
    if (isOverViewOn) {
        categoryOverView.style.top = "100vh";
        isOverViewOn = false;
    }
});
