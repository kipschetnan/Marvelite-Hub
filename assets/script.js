// Global variables
const APIkey = '447061714da1f776acf1c2d309091175'
const characterInput = document.getElementById('character-input');
const searchBtn = document.getElementById('search-btn');

// fetch character and subdomain
function fetchMarvel(event) {
    event.preventDefault();
    
    let heroName = $('#character-input').val();
    
    let characterAPIkey = `https://gateway.marvel.com:443/v1/public/characters?name=${heroName}&apikey=${APIkey}`
    fetch(characterAPIkey)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.code !== 200) {
          return
        }
        
      });
}


// fetchMarvel()
searchBtn.addEventListener('click', fetchMarvel);     