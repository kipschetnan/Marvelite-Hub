// Global variables
const APIkey = '447061714da1f776acf1c2d309091175'
const characterInput = document.getElementById('character-input');
const searchBtn = document.getElementById('search-btn');
const heroes = [];
const displayChar = document.getElementById('character-display');


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
        if (data.data.results.length !== 0){
          heroes.push(heroName)
        localStorage.setItem("heroArr", JSON.stringify(heroes))
        buildMenu()
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
        let description = $('<p class="character-desc">' + charDescription + '</p>')
        console.log(typeof character,typeof charDescription,typeof imagePath,typeof imageExtension);
        console.log(imageSrc);
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
function buildMenu() {
  $(".list-group-item").remove()
  var heroArr = JSON.parse(localStorage.getItem("heroArr"));

  for (var i = 0; i < heroArr.length; i++) {
    var li = $("<li>").addClass("list-group-item").text(heroArr[i])

    $(".list-group").append(li)
  }
}


// fetchMarvel()
searchBtn.addEventListener('click', fetchMarvel);     