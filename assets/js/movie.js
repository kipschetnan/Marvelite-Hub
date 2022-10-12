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
        if (!data.Response) {
          return;
        }

        var results = data.Search;
        for (var i =0; i < results.length; i++) {
          var movieTitle = results[i].Title;
          var movieYear = results[i].Year;
          var posterPath = results[i].Poster;
          var imageSrc = $(`<img src=${posterPath}>`);
          var title = $('<p class="title">' + movieTitle + '</p>');
          var year = $('<p class="year">' + movieYear + '</p>');
        }
      });
}

$(document).ready(fetchOMDB);