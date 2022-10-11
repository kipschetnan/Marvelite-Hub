// Global variables
const APIkey = '447061714da1f776acf1c2d309091175'
const characterInput = document.getElementById('character-input');
const searchBtn = document.getElementById('search-btn');
const displayChar = $('#character-display');
const charName = $('#character-name');
const characterImg = $('#char-img');

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
function fetchMarvel(event) {
    event.preventDefault();
    
    let heroName = $('#character-input').val();
    
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
      });
}

// fetchMarvel()
searchBtn.addEventListener('click', fetchMarvel);     