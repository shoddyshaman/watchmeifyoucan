console.log("connected");

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

const addToList = (movieObj) => {
  console.log(movieObj);
  let token = sessionStorage.getItem("token");
  let userId = sessionStorage.getItem("userId");
  token == null
    ? alert("Please login to add to list")
    : axios
        .post(`${baseURL}/api/list/${userId}`,movieObj, {
          headers: {
            authorization: token,
          },
        })
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
      createCard(res.data);
    })
    .catch((err) => console.log(err));
};

const login = (body) =>
  axios
    .post(`${baseURL}/api/login`, body)
    .then((res) => {
      console.log(res.data);
      let token = res.data.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", res.data.watch_user_id);
      window.location.href = `/`;
    })
    .catch((err) => console.log(err));

const signUp = (body) =>
  axios
    .post(`${baseURL}/api/signUp`, body)
    .then(async (res) => {
      // console.log("hit signup");
      let token = await res.data.token;
      console.log(res.data);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", res.data.watch_user_id);
      window.location.href = `/`;
    })
    .catch((err) => console.log(err));

const handleAuth = (authType, body) => {
  authType === "SignUp" ? signUp(body) : login(body);
};

searchForm.addEventListener("submit", handleSearch);

//bootstrap modal for login/register starts
var authModal = document.getElementById("signin");
authModal.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  var recipient = button.getAttribute("data-bs-whatever");
  var modalTitle = authModal.querySelector(".modal-title");
  // var submitBtn = authModal.querySelector("#formSubmit");
  var optionalMsg = document.querySelector("#optionalMsg");
  var authSubmit = document.querySelector("#authSubmit");
  const email = document.querySelector("#floatingInput");
  const password = document.querySelector("#floatingPassword");
  // var modalBodyInput = exampleModal.querySelector('.modal-body input')

  modalTitle.textContent = button.textContent;
  // submitBtn.textContent = button.textContent;
  // console.log(modalTitle.textContent.trim());
  modalTitle.textContent.trim() === "Login"
    ? (optionalMsg.style.display = "none")
    : (optionalMsg.style.display = "block");
  authSubmit.textContent = button.textContent;
  authSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const body = { email: email.value, password: password.value };
    console.log(authSubmit.textContent);
    authSubmit.textContent.trim() === "Login"
      ? handleAuth("Login", body)
      : handleAuth("SignUp", body);
  });
});
//end modal code for login/register

//get top rated movies
const getTopRated = () => {
  axios
    .get(`${baseURL}/api/topRated`)
    .then((res) => {
      createCard(res.data);
    })
    .catch((err) => console.log(err));
};

getTopRated();
