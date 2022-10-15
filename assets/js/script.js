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
const modalsSection = $('#modals');

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
      // store data in variables
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
      let cardDiv = $(`<div class="card column is-3 js-modal-trigger" data-target="modal-js-${comicId}">`);
      // create card-image class inside card
      let cardImg = $(`<div class="card-image"><figure id="${comicId}" class="image is-2by3"></div>`);
      comicsList.append(cardDiv);
      cardDiv.append(cardImg);
      let figureEl = $(`#${comicId}`);
      let imgEl = $(`<img src='${coverImage.path}/portrait_uncanny.${coverImage.extension}'>`);
      figureEl.append(imgEl);
      // create card-header class inside card
      let cardHeader = $('<header class="card-header">')
      cardDiv.append(cardHeader);
      let pEl = $(`<p class="card-header-title">${comicTitle}</p>`)
      cardHeader.append(pEl);

      // create modals
      let sectionModal = $(`<section id="modal-js-${comicId}" class="modal">`);
      modalsSection.append(sectionModal);
      let modalBackground = $('<div class="modal-background">');
      let modalCard = $('<div class="modal-card">');
      sectionModal.append(modalBackground);
      sectionModal.append(modalCard);
      // create content inside modals
        // thumbnail
      let pImageEl = $('<figure class="image is-2by3">');
      let modalImg = $(`<img src='${coverImage.path}/portrait_uncanny.${coverImage.extension}'>`);
      modalCard.append(pImageEl);
      pImageEl.append(modalImg);
        // Title
      let modalHeader = $('<div class="modal-card-head">');
      let pHeaderEl = $(`<p class="modal-card-title">${comicTitle}</p>`);
      modalCard.append(modalHeader);
      modalHeader.append(pHeaderEl);
        // Body content
      let modalBody = $('<div class="modal-card-body">');
      modalCard.append(modalBody);
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
      let charURL = results.urls[0].url;
      let thumbnail = $(`<a target="blank" href=${charURL}><img src=${imageSrc}>`);
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
      displayMovieRedirectButton(heroName);
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
function displayMovieRedirectButton(heroName) {
  //displays the button
  redirectBtn.style.display = "block";
  //redirects to the other html page
  movieBtnEl.onclick = function () {
    location.href = "redirect.html?hero=" + heroName;
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

// Snippet paste from BULMA
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.code === 27) { // Escape key
      closeAllModals();
    }
  });
});
