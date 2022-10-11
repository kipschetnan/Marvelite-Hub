// Global variables
const APIKey2 = '5cf37e04';
const characterInp = $('#character-input');
const search = $("#search-btn");

//fetch movie info
function fetchOMDB() {

    var hero = characterInp.val();
    characterURL = 'http://www.omdbapi.com/?apikey=' + APIKey2 + '&s=' + hero;
    fetch(characterURL)
      .then(function (response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
}

search.on('click', fetchOMDB);