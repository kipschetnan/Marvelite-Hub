// Global variables
const APIKey2 = '5cf37e04';
const movieDisplay = $('#');
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
        for (var i=0; i < results.length; i++) {
          var title = results[i].Title;
          var year = results[i].Year;
          var posterPath = results[i].Poster;
          var poster = $(`<img src=${posterPath}>`);
          var movieTitle = $('<p class = "movie">' + title + '</p>');
          var movieYear = $('<p class="year">' + year + '</p>');
        }
      });
}

$(document).ready(fetchOMDB);