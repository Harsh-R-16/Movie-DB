let articleSingleMovie = document.querySelector("#singleMovie");
let article = document.querySelector("article");
async function showMovies(category, page = 1) {
  // https://api.themoviedb.org/3/search/movie?api_key=7f27f853ad781602c5800b97bab7fef6&language=en-US&query=ave&page=1&include_adult=false
  let url = `https://api.themoviedb.org/3/movie/${category}?api_key=7f27f853ad781602c5800b97bab7fef6&language=en-US&page=${page}`;
  if (category == "trending") {
    url = `https://api.themoviedb.org/3/trending/all/day?api_key=7f27f853ad781602c5800b97bab7fef6&language=en-US&page=${page}`;
  }
  let a = await fetch(url);
  let b = await a.json();
  window.scroll(0, 0);
  if (b.results.length) displayMovies(b.results);
  else showMovies(category);
}
showMovies("popular");

function displayMovies(arr) {
  article.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let { title, release_date, poster_path, id } = arr[i];
    // console.log(arr[i]);
    let src;
    if (poster_path)
      src = `https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`;
    else
      src =
        "https://th.bing.com/th/id/OIP.Ro3cYp7onBge22q_yJG_xgAAAA?w=182&h=182&c=7&r=0&o=5&dpr=1.25&pid=1.7";
    article.innerHTML += `   <div id=${id}>
                <img src=${src} alt="" class="mainImgs">
                <p>${getDate(release_date ? release_date : "2000-03-16")}</p>
                <h2>${title}</h2>
            </div>`;
  }
}

let categories = [
  "trending",
  "now_playing",
  "popular",
  "top_rated",
  "upcoming",
];
let asideDivs = document.querySelectorAll("aside div");
let tempCategory = "popular";
let tempCount = 1;
let h1 = document.querySelector("h1");
for (let i = 0; i < asideDivs.length; i++) {
  asideDivs[i].addEventListener("click", function () {
    tempCategory = categories[i];
    tempCount = 1;
    articleSingleMovie.classList.add("display");
    showMovies(tempCategory);
    h1.innerHTML = categories[i].split("_").join(" ") + " Movies";
  });
}

async function getMovies(inp) {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=7f27f853ad781602c5800b97bab7fef6&language=en-US&query=${inp}&page=1&include_adult=false`;

  let a = await fetch(url);
  let b = await a.json();
  articleSingleMovie.classList.add("display");
  window.scroll(0, 0);
  if (inp == "") h1.innerHTML = "Type Movie Name...";
  if (b.results.length) {
    displayMovies(b.results);
    h1.innerHTML = "Showing results for " + inp;
  } else {
    h1.innerHTML = "no movies found for " + inp;
  }
}

let inp = document.querySelector("input");
inp.addEventListener("input", function () {
  getMovies(inp.value);
});

let buttons = document.querySelectorAll("div > button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (buttons[i].innerText == "Previous" && tempCount !== 1) tempCount--;
    else tempCount++;
    h1.innerHTML = showMovies(tempCategory, tempCount);
    h1.innerHTML = tempCategory.split("_").join(" ") + " Movies";
  });
}

article.addEventListener("click", function (e) {
  if (e.target.parentElement.tagName == "DIV") {
    singleMovie(e.target.parentElement.id);
  }
});

// https://api.themoviedb.org/3/movie/19404?api_key=7f27f853ad781602c5800b97bab7fef6&language=en-US

async function singleMovie(id) {
  let a = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=7f27f853ad781602c5800b97bab7fef6&language=en-US`
  );
  let b = await a.json();
  let { overview, release_date, genres, runtime, title, poster_path } = b;
  let src;
  if (poster_path)
    src = `https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`;
  else
    src =
      "https://th.bing.com/th/id/OIP.Ro3cYp7onBge22q_yJG_xgAAAA?w=182&h=182&c=7&r=0&o=5&dpr=1.25&pid=1.7";

  articleSingleMovie.innerHTML = `<div>
            <img src=${src} alt="">
            <summary>
                <h2>
                    <button>X</button>
                    ${title}
                </h2>
                <p>Genres: ${getGenres(genres)}</p>
                <p> Runtime: ${getRunTime(runtime)}</p>
                <p>Release date: ${getDate(release_date)}</p>
                <h3>Overview:</h3>
                <h4>${overview}</h4>
            </summary>
        </div>`;
  articleSingleMovie.classList.remove("display");
  console.log(b);
}

articleSingleMovie.addEventListener("click", function (e) {
  //   document.querySelector("#singleMovie").classList.add("display");
  if (e.target.tagName == "BUTTON") articleSingleMovie.classList.add("display");
});

const getGenres = (genres) => {
  res = "";
  for (let i = 0; i < genres.length; i++) {
    res += genres[i].name + " ";
  }
  return res;
};

const getRunTime = (time) => {
  let h = Math.floor(time / 60);
  let min = time % 60;
  return `${h} Hours ${min} Minutes`;
};

const getDate = (str) => str.split("-").reverse().join("/");
