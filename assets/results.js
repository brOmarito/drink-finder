var ingredientUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i="
var nameUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
var randomUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

// Checks document location for values passed from homepage.js, runs function for either name, ingredient, or random
function urlCheck() {
    var url = document.location.search;
    var split = url.split("=")
    var searchset = split[1]
    var splitset = searchset.split("/")
    var input = splitset[0]
    var type = splitset[1]

    if (type == "ingredient") {
        fetchIngredient(input)
    } else if (type == "name") {
        fetchName(input)
    } else if (type == "random") {
        randomDrink()
    }
}
// Fetches api for ingredient
function fetchIngredient(input) {
    var url = ingredientUrl + input

    fetch(url)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data)
                })
            }
        })
}
// Fetches api for name
function fetchName(input) {
    var url = nameUrl + input
    
    fetch(url)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data)
                })
            }
        })
}
// Fetches api for random
function randomDrink() {   
    fetch(randomUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data)
                })
            }
        })  
}

urlCheck()