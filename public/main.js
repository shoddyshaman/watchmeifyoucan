console.log("connected");

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

const baseURL = `http://localhost:4040`;

const handleSearch = (e) => {
  e.preventDefault();
  const userInput = searchInput.value;
  axios
    .get(`${baseURL}/api/query/?search=${userInput}`)
    .then((res) => {
        
    })
    .catch((err) => console.log(err));
};

searchForm.addEventListener("submit", handleSearch);
