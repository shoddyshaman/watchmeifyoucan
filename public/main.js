console.log("connected");

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const displaySection = document.querySelector("#display-section");
const baseURL = `http://localhost:4040`;

const handleSearch = (e) => {
  e.preventDefault();
  const userInput = searchInput.value;
  displaySection.innerHTML = ''
  searchInput.value = ``
  axios
    .get(`${baseURL}/api/query/?search=${userInput}`)
    .then((res) => {
      console.log(res.data);
      res.data.results.map((result) => {
        let displayDiv = document.createElement("div");
        displayDiv.classList.add("card");
        displayDiv.style.width = "18rem";
        displayDiv.innerHTML = `
          <img src='https://image.tmdb.org/t/p/w500/${result.poster_path}'/>
          <div class="card-body bg-light">
          <h5 class="card-title">${result.title}</h5>
          <p class="card-text overflow-hidden">${result.overview}</p>
          <a href="#" class="btn btn-primary">Add to list</a>
          </div>
          `;
        displaySection.appendChild(displayDiv);
      });
    })
    .catch((err) => console.log(err));
};

searchForm.addEventListener("submit", handleSearch);
