var ingredientUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
var nameUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
var randomUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
var idUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="
var barUrl = "https://api.openbrewerydb.org/breweries?by_city="

var searchBtn = $("#searchBtn");
var randomBtn = $("#randomBtn");
var nameSwitch = $("#name-switch");
var ingrSwitch = $("#ingr-switch");
var textBox = $(".results-searchbar");

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

function searchDrink() {
    var input = textBox.val();

    if (input) {
        if (nameSwitch.is(":checked")) {
            fetchName(encodeURI(input));
        } else { 
            fetchIngredient(encodeURI(input));
        }
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
                    data.drinks.forEach((drink, index) => {
                        fetchId(drink.idDrink, index);
                    });
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
                    createResultCard(data.drinks);
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
                    createResultCard(data.drinks);
                })
            }
        })
}

// Gets city name and fetches openbrewery api
function bars() {
    // var input = ADD QUERY SELECTOR FOR CITY NAME HERE
    var url = barUrl + input

    fetch(url)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data)
                    barApiData(data)
                })
            }
        })
}

// Assigns data from api to variables
function barApiData(data) {
    for (let i = 0; i<data.length; i++) {
        var name = data[i].name
        var city = data[i].city
        var address = data[i].street
        var phoneNum =  data[i].phone
        var website = data[i].website_url  
        
        console.log(name,city,address,phoneNum,website)
    }
}

function fetchId(input, index) {
    var url = idUrl + input

    fetch(url)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data)
                    createResultCard(data.drinks, index);
                })
            }
        })
}

function createResultCard(drinkArray, index) {
    let resultSectionExisting = document.querySelector('.results-card-section');
    let resultSection = document.createElement('div');
    if(index && index > 0) {
        resultSection = resultSectionExisting;
    }

    drinkArray.forEach(drink => {
        let drinkCard = document.createElement('div');
        drinkCard.classList.add('card', 'drink-result');

        drinkCard.appendChild(createResultHeader(drink.strDrink));
        drinkCard.appendChild(createResultContent(drink));

        resultSection.appendChild(drinkCard);
    });
    resultSectionExisting.innerHTML = resultSection.innerHTML;
}

function createResultHeader(drinkName) {
    let drinkHeader = document.createElement('div');
    drinkHeader.classList.add('card-divider', 'result-title-section');

    let drinkTitle = document.createElement('div');
    drinkTitle.classList.add('result-title');
    drinkTitle.textContent = drinkName;

    drinkHeader.appendChild(drinkTitle);

    return drinkHeader;
}

function createResultContent(drinkObj) {
    let drinkContentParent = document.createElement('div');
    drinkContentParent.classList.add('result-info-section');

    let drinkContentGrid = document.createElement('div');
    drinkContentGrid.classList.add('grid-x', 'grid-margin-x');

    drinkContentGrid.appendChild(createResultTextInfo(drinkObj));
    drinkContentGrid.appendChild(createImageArea(drinkObj.strDrinkThumb));

    drinkContentParent.appendChild(drinkContentGrid);

    return drinkContentParent;
}

function createImageArea(imageUrl) {
    let imageDiv = document.createElement('div');
    imageDiv.classList.add('cell', 'medium-5', 'drink-picture');

    let imageEl = document.createElement('img');
    imageEl.setAttribute('src', imageUrl);
    imageEl.setAttribute('alt', 'Picture of the cocktail');

    imageDiv.appendChild(imageEl);

    return imageDiv;
}

function createResultTextInfo(drinkObj) {
    let drinkTextInfo = document.createElement('div');
    drinkTextInfo.classList.add('cell', 'medium-7', 'text-info');

    let ingrHeader = document.createElement('h4');
    ingrHeader.textContent = "Inredients";
    drinkTextInfo.appendChild(ingrHeader);

    drinkTextInfo.appendChild(createResultTable(drinkObj));

    let instrHeader = document.createElement('h4');
    instrHeader.textContent = "Instructions";
    drinkTextInfo.appendChild(instrHeader);

    let instrText = document.createElement('p');
    instrText.innerText = drinkObj.strInstructions;
    drinkTextInfo.appendChild(instrText);

    return drinkTextInfo;
}

function createResultTable(drinkObj) {
    let ingrTable = document.createElement('table');

    ingrTable.appendChild(createResultTableHeader());
    ingrTable.appendChild(createReultTableData(drinkObj));

    return ingrTable;
}

function createResultTableHeader() {
    let headerSect = document.createElement('thead');

    let measurementHdr = document.createElement('th');
    measurementHdr.setAttribute('width', '200');
    measurementHdr.textContent = "Measurement";
    headerSect.appendChild(measurementHdr);

    let ingrHdr = document.createElement('th');
    ingrHdr.textContent = "Ingredient";
    headerSect.appendChild(ingrHdr);

    return headerSect;
}

function createReultTableData(drinkObj) {
    let tableBody = document.createElement('tbody');
    for (let i = 1; i < 16; i++) {
        const measurementStr = "strMeasure" + i.toString();
        const measurement = drinkObj[measurementStr];

        const ingrStr = "strIngredient" + i.toString();
        const ingr = drinkObj[ingrStr];

        if (ingr !== null && measurement !== null) {
            let tableRow = document.createElement('tr');
            let rowMeasure = document.createElement('td');
            let rowIngr = document.createElement('td');

            rowMeasure.textContent = measurement.trim();
            rowIngr.textContent = ingr.trim();

            tableRow.appendChild(rowMeasure);
            tableRow.appendChild(rowIngr);

            tableBody.appendChild(tableRow);
        } else {
            return tableBody;
        }
    }
    return tableBody;
}

urlCheck()

randomBtn.on("click", randomDrink);
searchBtn.on("click", searchDrink);
textBox.on("keydown", function(event) {
    // event.preventDefault();
    if (event.key === "Enter") {
        searchDrink();
    }
});
