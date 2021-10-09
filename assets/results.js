function createResultCard(drinkArray) {
    let resultSection = document.querySelector('.results-card-section');
    drinkArray.forEach(drink => {
        let drinkCard = document.createElement('div');
        drinkCard.classList.add('card', 'drink-result');

        drinkCard.appendChild(createResultHeader(drink.strDrink));
        drinkCard.appendChild(createResultContent(drink));

        resultSection.appendChild(drinkCard);
    });
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