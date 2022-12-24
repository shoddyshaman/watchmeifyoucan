const baseURL = `http://localhost:4040`;
const displaySection = document.querySelector("#display-section");
const displayListSection = document.querySelector("#display-list-section");

const createCard = (movieArr) => {
    movieArr.results.map((result) => {
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
  };

  const createList = (movieArr) => {
    movieArr.map((result) => {
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
        <a href="#" onclick='removeFromList(${resultObj})' class="btn btn-danger">Remove from list</a>
        </div>
        `;
      displayListSection.appendChild(displayDiv);
    });
  }