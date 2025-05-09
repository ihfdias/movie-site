const API_KEY = "159e045fc1267fe7b1b6f1cf1e074618";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const loader = document.getElementById('loader');


let currentPage = 1;
let currentQuery = '';
let isLoading = false;


const container = document.getElementById("movies-container");

async function getPopularMovies(page = 1) {
  isLoading = true;
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`);
  const data = await res.json();
  showMovies(data.results);
  isLoading = false;
}


function showMovies(movies) {
  container.innerHTML = "";
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <span>⭐ ${movie.vote_average}</span>
    `;

    container.appendChild(movieEl);
  });
}

getPopularMovies();

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();

  if (query) {
    container.innerHTML = '';
    currentQuery = query;
    currentPage = 1;
    fetchMovies(query, currentPage);
  }

  async function fetchMovies(query, page = 1) {
    isLoading = true;
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&page=${page}`);
    const data = await res.json();
    showMovies(data.results);
    isLoading = false;
  }
});

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 && !isLoading) {
    currentPage++;
    if (currentQuery) {
      fetchMovies(currentQuery, currentPage);
    } else {
      getPopularMovies(currentPage);
    }
  }
});

