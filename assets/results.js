var ingredientUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
var nameUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
var randomUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
var idUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="
var barUrl = "https://api.openbrewerydb.org/breweries?by_city="

var resultUrl = "./results.html"

var searchBtn = $("#searchBtn");
var randomBtn = $("#randomBtn");
var nameSwitch = $("#name-switch");
var ingrSwitch = $("#ingr-switch");
var textBox = $(".results-searchbar");
var beerSearchBtn = $("#beer-search-btn");
var beerSearchBar = $('.beer-searchbar');

$(document).foundation();

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

// Gets city name for new search, saves new search to localstorage
function getBar() {
    const input = beerSearchBar.val();

    localStorage.setItem("lastSearch", input)
    fetchUrl(input)     
}  

// upon page load checks for bar search history
function runLastSearch() {
    var search = localStorage.getItem("lastSearch")

    if (search != "" && search != null) {
        beerSearchBar.val(search)
        fetchUrl(search)
    }
}

// fetches api
function fetchUrl(input) {
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
    let beerResSect = document.querySelector('.beer-result-section');
    let newDiv = document.createElement('div');

    for (let i = 0; i<data.length; i++) {
        const name = data[i].name
        const city = data[i].city
        const address = data[i].street
        const phoneNum =  data[i].phone
        const website = data[i].website_url
        let beerCard = document.createElement('div');
        beerCard.classList.add('beer-result-card');

        const border = document.createElement('hr');

        beerCard.appendChild(border);

        let breweryName = document.createElement('h5');
        breweryName.textContent = name;
        beerCard.appendChild(breweryName);

        handleContactInfo(beerCard, address, city, phoneNum);
        handleWebsiteInfo(beerCard, website)

        newDiv.appendChild(beerCard);
    }
    beerResSect.innerHTML = newDiv.innerHTML;
}

function handleWebsiteInfo(div, website) {
    if (website) {
        let websiteEl = document.createElement('a');
        websiteEl.setAttribute('href', website);
        websiteEl.textContent = "Visit their site!";

        div.appendChild(websiteEl)
    }
}

function handleContactInfo(div, address, city, phoneNum) {
    if (address || city || phoneNum) {
        let addressInfo = document.createElement('p');
        let addressHtmlStr = "";
        if (address) {
            addressHtmlStr = addressHtmlStr + address + '<br>';
        }
        if (city) {
            addressHtmlStr = addressHtmlStr + city + '<br>';
        }
        if (phoneNum) {
            addressHtmlStr = addressHtmlStr + phoneNum;
        }
        addressInfo.innerHTML = addressHtmlStr;

        div.appendChild(addressInfo);
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
runLastSearch()

randomBtn.on("click", randomDrink);
searchBtn.on("click", searchDrink);
textBox.on("keydown", function(event) {
    if (event.key === "Enter") {
        searchDrink();
    }
});
beerSearchBar.on("keydown", function(event) {
    if (event.key === "Enter") {
        getBar();
    }
});