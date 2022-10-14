// Global variables
const APIkey = "447061714da1f776acf1c2d309091175";
const characterInput = document.getElementById("character-input");
const searchBtn = document.getElementById("search-btn");
const redirectBtn = document.getElementById("redirect");
let history = JSON.parse(localStorage.getItem("heroArr")) || [];
const displayChar = $("#character-display");
const comicsList = $("#comics-list");
const movieBtnEl = document.getElementById("movieBtn");
const clearHistBtn = document.getElementById("clearHistoryBtn");
const clearHistDiv = document.getElementById("clear-history");

// Use comics data to create a list of 10 comic
function fetchComics(ID) {
  let comicId = ID;
  let getComicURL = `https://gateway.marvel.com:443/v1/public/comics/${comicId}?apikey=447061714da1f776acf1c2d309091175`;

  fetch(getComicURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (comicData) {
      if (comicData.code !== 200) {
        return;
      }
      console.log(comicData);
      let comicResult = comicData.data.results[0];
      let comicId = comicResult.id;
      let coverImage = comicResult.thumbnail;
      let comicTitle = comicResult.title;
      let sypnosis = comicResult.description;
      let creator = comicResult.creators.items
      let characters = comicResult.characters.items;
      let numberOfPage = comicResult.pageCount;
      let price = comicResult.prices;
      let comicURL = comicResult.urls[0].url
      // create card
      let cardDiv = $('<div class="card column is-one-third">');
      // // card-image inside card
      let cardImg = $(`<div class="card-image"><figure id="${comicId}" class="image is-2by3"></div>`);
      let figureEl = $(`#${comicId}`);
      let imgEl = $(`<img src='${coverImage.path}/portrait_incredible.${coverImage.extension}'>`);
      comicsList.append(cardDiv);
      figureEl.append(imgEl);
      cardDiv.append(cardImg);
    });
}
// fetch character and subdomain
function fetchMarvel(heroName) {
  let getCharURL = `https://gateway.marvel.com:443/v1/public/characters?name=${heroName}&apikey=${APIkey}`;
  fetch(getCharURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (characterData) {
      if (characterData.code !== 200) {
        return;
      }
      console.log(characterData);
      // check if user's input can be save in local storage
      if (characterData.data.results.length !== 0) {
        //looks to see if the hero is in the array
        findHero = history.find((e) => e.description == heroName);
        console.log(findHero);
        //if the hero is already on the array then returns true otherwise false
        heroExists = findHero ? true : false;
        console.log(heroExists);
        // If heroName is not existed in history array, save to local and render search list
        if (!heroExists) {
          history.push({ description: heroName });
          localStorage.setItem("heroArr", JSON.stringify(history));
          buildHistory();
        }
      }

      // append character's name, thumbnail, and description
      let results = characterData.data.results[0];
      let character = results.name;
      let charDescription = results.description;
      let imagePath = results.thumbnail.path;
      let imageExtension = results.thumbnail.extension;
      let imageSrc = `${imagePath}/portrait_xlarge.${imageExtension}`;
      let characterName = $('<p class="character-name">' + character + "</p>");
      let thumbnail = $(`<img src=${imageSrc}>`);
      let description = $(
        '<p class="character-desc">' + charDescription + "</p>"
      );
      // Append character's name, thumbnail and description on the page
      displayChar.append(characterName);
      displayChar.append(thumbnail);
      displayChar.append(description);
      // Gather data of the first 10 comics
      for (let i = 0; i < 9; i++) {
        // get comic IDs
        let comics = results.comics.items;
        let resourceURI = comics[i].resourceURI;
        let splitArray = resourceURI.split("/");
        let comicID = splitArray[6];
        // display a list of comics
        fetchComics(comicID);
      }
      displayMovieRedirectButton();
      displayClearHistoryButton();
    });
}
//Builds the history block
function buildHistory() {
  $(".search-history").empty();
  history.forEach((h) => {
    let li = $("<li>").addClass("button is-light is-fullwidth").text(h.description);
    //when clicking on one of the characters in the history it searches that character
    li.click(function (event) {
      event.preventDefault();
      displayChar.empty();
      comicsList.empty();
      fetchMarvel(event.target.textContent);
    });
    $(".search-history").append(li);
  });
}
//displays the clear history button and clears the history array
function displayClearHistoryButton() {
  clearHistDiv.style.display = "block";
  clearHistBtn.onclick = function () {
    history = [];
    localStorage.clear();
    buildHistory();
  };
}
//displays redirect btn
function displayMovieRedirectButton() {
  //displays the button
  redirectBtn.style.display = "block";

  //redirects to the other html page
  movieBtnEl.onclick = function () {
    location.href = "redirect.html";
  };
}

function searchBtnHandler(event) {
  event.preventDefault();
  let heroName = $("#character-input").val();
  displayChar.empty();
  comicsList.empty();
  fetchMarvel(heroName);
}
// Invoke on load, render search history
buildHistory();

searchBtn.addEventListener("click", searchBtnHandler);
