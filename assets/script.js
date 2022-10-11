// Global variables
const APIkey = '447061714da1f776acf1c2d309091175'
const characterInput = document.getElementById('character-input');
const searchBtn = document.getElementById('search-btn');
const heroes = [];

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
        if (data.data.results.length !== 0){
          heroes.push(heroName)
        localStorage.setItem("heroArr", JSON.stringify(heroes))
        buildMenu()
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