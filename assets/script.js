var APIkey = 'https://gateway.marvel.com:443/v1/public/characters?name=thor&apikey=447061714da1f776acf1c2d309091175'
var searchBtn = document.getElementById('search-btn');

function fetchMarvel(event) {
    event.preventDefault();
    fetch(APIkey)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
}
// fetchMarvel()
searchBtn.addEventListener('click', fetchMarvel);     