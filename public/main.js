console.log("connected");

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const displaySection = document.querySelector("#display-section");
const baseURL = `http://localhost:4040`;

const addToList = (movieObj) => {
  console.log(movieObj);
  axios
    .post(`${baseURL}/api/list`, { movieObj })
    .then((res) => alert(res.data))
    .catch((err) => console.log(err));
};

const handleSearch = (e) => {
  e.preventDefault();
  const userInput = searchInput.value;
  displaySection.innerHTML = "";
  searchInput.value = ``;
  axios
    .get(`${baseURL}/api/query/?search=${userInput}`)
    .then((res) => {
      // console.log(res.data);
      res.data.results.map((result) => {
        let displayDiv = document.createElement("div");
        displayDiv.classList.add("card");
        displayDiv.style.width = "18rem";
        let resultObj = JSON.stringify({ ...result }).replace(
          /[\/\(\)\']/g,
          "&apos;"
        );
        // console.log(resultObj);
        displayDiv.innerHTML = `
          <img src='https://image.tmdb.org/t/p/w500/${result.poster_path}'/>
          <div class="card-body bg-light">
          <h5 class="card-title">${result.title}</h5>
          <p class="card-text overflow-hidden">${result.overview}</p>
          <a href="#" onclick='addToList(${resultObj})' class="btn btn-primary">Add to list</a>
          </div>
          `;
        displaySection.appendChild(displayDiv);
      });
    })
    .catch((err) => console.log(err));
};

const getTrending = () => {
  axios.get(`${baseURL}/api/trending`).then().catch()
}
const getPopular = () => {
  axios.get(`${baseURL}/api/popular`).then().catch()
}

const handleAuth = (authType) => {
  const login = axios.post(`${baseURL}/api/login`,{
    email:'',
    password:''
  }).then().catch()
  const signUp = axios.post(`${baseURL}/api/signUp`).then().catch()
  authType === 'login' ? login : signUp
}



searchForm.addEventListener("submit", handleSearch);

//bootstrap modal for login/register
var authModal = document.getElementById("signin");
authModal.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  var recipient = button.getAttribute("data-bs-whatever");
  var modalTitle = authModal.querySelector(".modal-title");
  var submitBtn = authModal.querySelector("#formSubmit");
  var optionalMsg = document.querySelector("#optionalMsg");
  var authSubmit = document.querySelector("#authSubmit")
  // var modalBodyInput = exampleModal.querySelector('.modal-body input')

  modalTitle.textContent = button.textContent;
  submitBtn.textContent = button.textContent;
  console.log(modalTitle.textContent.trim())
  modalTitle.textContent.trim() === "Login" ? optionalMsg.style.display = 'none' : optionalMsg.style.display = 'block';
  authSubmit.textContent = button.textContent
  authSubmit.textContent === 'Login' ? handleAuth('login') : handleAuth('signUp')
  
});
//end modal code for login/register
