
// Checks document location for values passed from homepage.js
// Runs function for either name, ingredient, or random
function SliderCheck() {

    var url = document.location.search;

    var split = url.split("=")
    
    var searchset = split[1]
    var splitset = searchset.split("/")

    var input = splitset[0]
    var type = splitset[1]

    if (type == "ingredient") {
        FetchIngredient(input)
    } else if (type == "name") {
        FetchName(input)
    } else if (type == "random") {
        RandomDrink()
    }
}

// Fetches api for ingredient
function FetchIngredient(input) {
    var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + input

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
function FetchName(input) {

    var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + input

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
function RandomDrink() {

    var url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

    fetch(url)

        .then(function(response) {

            if (response.ok) {

                response.json().then(function(data) {

                    console.log(data)

                })
            }
        })  
}

SliderCheck()