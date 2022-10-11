// Global variables
const APIKey2 = '5cf37e04';

//fetch movie info
function fetchOMDB() {

    characterURL = 'http://www.omdbapi.com/?apikey=' + APIKey2 + '&s=thor';
    fetch(characterURL)
      .then(function (response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
}

$(document).ready(fetchOMDB);