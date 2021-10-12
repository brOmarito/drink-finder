var searchBtn = $("#searchBtn")
var randomBtn = $("#randomBtn")
var radioswitch1 = $("#radio-switch1")
var radioswitch2 = $("#radio-switch2")

var resultUrl = "./results.html"

// Checks if name or ingredient is selected, creates url and changes location to it
function search() {
    if (radioswitch1.is(":checked")) {
        var type = "name"
    } else {
        var type = "ingredient"
    }

    var textBox = $("#textBox")
    var input = textBox.val()

    if (input) {
        var resultsPage = resultUrl + "?input=" + input +"/"+ type
        location.replace(resultsPage)
    }  
}

function random() {
    var resultsPage = resultUrl + "?input=random/random"
    location.replace(resultsPage)
}


searchBtn.on("click", search)
randomBtn.on("click", random)

