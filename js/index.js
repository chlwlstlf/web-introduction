import myInfo from "../data/myInfo.js";
import movies from "../data/movies.js";

const $myInfoContent = document.querySelector(".my-info-content");
const $tableBody = document.querySelector(".table-body");
const $guestBookCheckBox = document.querySelector(".guest-book-check-box");
const $submitBtn = document.querySelector(".submit-btn");
const $guestBookList = document.querySelector(".guest-book-list");

$myInfoContent.innerHTML = Object.entries(myInfo)
  .map(([key, value]) => {
    return `<li>${key}: ${value}</li>`;
  })
  .join("");

$tableBody.innerHTML = movies
  .map((movie, index) => {
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${movie.title}</td>
        <td><img src="${movie.poster}" alt="${movie.title}"/></td>
        <td>${movie.plot}</td>
        <td><a href="${movie.link}">클릭</a></td>
      </tr>
    `;
  })
  .join("");

$guestBookCheckBox.innerHTML = movies
  .map((movie, index) => {
    return `            
      <input
        type="checkbox"
        id="${movie.title}"
        name="${movie.title}"
        value="${movie.title}"
        required
      />
      <label for="${movie.title}">${movie.title}</label>
    `;
  })
  .join("");

$submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const $nameInput = document.querySelector("#name");
  const $checkedboxes = document.querySelectorAll('input[type="checkbox"]:checked');

  const name = $nameInput.value;
  const checkedOptions = Array.from($checkedboxes).map((checkbox) => checkbox.value);

  console.log("Name:", name);
  console.log("Checked options:", checkedOptions);
  alert(`${name}님, 저와 ${checkedOptions.length}개의 취향이 같으시네요!`);
  addEntry(name, checkedOptions);
  showGuestbook();
  inputClear();
});

const inputClear = () => {
  const $nameInput = document.querySelector("#name");
  const $checkboxes = document.querySelectorAll('input[type="checkbox"]');

  $nameInput.value = "";
  $checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

// 방명록 항목 추가
const addEntry = (name, options) => {
  const entries = JSON.parse(localStorage.getItem("guestbook")) || [];

  const entry = { name, options };

  entries.push(entry);

  localStorage.setItem("guestbook", JSON.stringify(entries));
};

// 방명록 업데이트
const showGuestbook = () => {
  const entries = JSON.parse(localStorage.getItem("guestbook")) || [];
  $guestBookList.innerHTML = entries
    .map((entry, index) => {
      return `  
        <div>${index + 1}빠</div>          
        <div>${entry.name}</div>
        <div>${entry.options}</div>
      `;
    })
    .join("");
};

showGuestbook();
