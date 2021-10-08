var searchBtn = $("#searchBtn")
var randomBtn = $("#randomBtn")
var radioswitch1 = $("#radio-switch1")
var radioswitch2 = $("#radio-switch2")

function SliderCheck() {

    if (radioswitch1.is(":checked")) {
        var type = "name"
    } else { 
        var type = "ingredient"
    }
    
    var textBox = $("#textBox")

    var input = textBox.val()

    var url = "./results.html?input=" + input +"/"+ type

    console.log(url)

    location.replace(url)
}

function Random() {

    var url = "./results.html?input=random/random"
    
    location.replace(url)
}

searchBtn.on("click", SliderCheck)
randomBtn.on("click", Random)