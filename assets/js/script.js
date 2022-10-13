// Global variables
const APIkey = '447061714da1f776acf1c2d309091175'
const characterInput = document.getElementById('character-input');
const searchBtn = document.getElementById('search-btn');
const redirectBtn = document.getElementById('redirect');
let history = JSON.parse(localStorage.getItem('history')) || [];
const displayChar = $('#character-display');
const movieBtnEl = document.getElementById('movieBtn');
const clearHistBtn = document.getElementById('clearHistoryBtn');
const clearHistDiv = document.getElementById('clear-history');


function fetchComics(ID) {
  let comicId = ID;
  let getComicURL = `https://gateway.marvel.com:443/v1/public/comics/${comicId}?apikey=447061714da1f776acf1c2d309091175`

  fetch(getComicURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (comicData) {
      if(comicData.code !== 200) {
        return;
      }
      console.log(comicData);

    })
}
// fetch character and subdomain
function fetchMarvel(heroName) {
  
  //let heroName = $('#character-input').val();
  
  let getCharURL = `https://gateway.marvel.com:443/v1/public/characters?name=${heroName}&apikey=${APIkey}`
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
      if (characterData.data.results.length !== 0){
        //looks to see if the hero is in the array
        findHero = history.find( e => e.description == heroName);
        console.log(findHero);
        //if the hero is already on the array then returns true otherwise false
        heroExists = findHero ? true : false;
        console.log(heroExists);

        if(!heroExists) {
          history.push( { description: heroName })
        }
        buildHistory()
        
      }

      // append character's name, thumbnail, and description
      let results = characterData.data.results[0];
      let character = results.name;
      let charDescription = results.description;
      let imagePath = results.thumbnail.path;
      let imageExtension = results.thumbnail.extension;
      let imageSrc = `${imagePath}/portrait_xlarge.${imageExtension}`
      let characterName = $('<p class="character-name">' + character + '</p>');
      let thumbnail = $(`<img src=${imageSrc}>`);
      let description = $('<p class="character-desc">' + charDescription + '</p>');
      // Append character's name, thumbnail and description on the page
      displayChar.append(characterName);
      displayChar.append(thumbnail);
      displayChar.append(description);
      // Gather data of the first 10 comics
      for (let i = 0; i < 10; i++) {
        // get comic IDs
        let comics = results.comics.items;
        let resourceURI = comics[i].resourceURI;
        let splitArray = resourceURI.split('/');
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
  $(".search-history").empty()
  history.forEach(h => {
    let li = $("<li>").text(h.description)
    //when clicking on one of the characters in the history it searches that character
    li.click(function (event) {
      event.preventDefault();
      fetchMarvel(event.target.textContent);
    })
    $(".search-history").append(li)
  })
}
//displays the clear history button and clears the history array
function displayClearHistoryButton () {
  clearHistDiv.style.display = 'block';
  clearHistBtn.onclick = function () {
    history = [];
    buildHistory()
  }
}
//displays redirect btn
function displayMovieRedirectButton() {
  //displays the button
  redirectBtn.style.display = 'block';

  //redirects to the other html page
  movieBtnEl.onclick = function () {
    location.href = "redirect.html";
  };
}

function searchBtnHandler(event) {
  event.preventDefault();
  let heroName = $('#character-input').val();
  fetchMarvel(heroName)
}

searchBtn.addEventListener('click', searchBtnHandler);    

