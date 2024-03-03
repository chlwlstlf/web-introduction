import movies from "../data/movies.js";

const $tableBody = document.querySelector(".table-body");

console.log(movies);
$tableBody.innerHTML = movies
  .map((movie, index) => {
    return `<tr>
      <td>${index + 1}</td>
      <td>${movie.title}</td>
      <td><img src="${movie.poster}" alt="${movie.title}"/></td>
      <td>${movie.plot}</td>
      <td><a href="${movie.link}">클릭</a></td>
    </tr>`;
  })
  .join("");
