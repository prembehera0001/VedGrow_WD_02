const category = document.getElementById("category");

const inputValue = document.getElementById("input-value");

const fromUnit = document.getElementById("from-unit");

const toUnit = document.getElementById("to-unit");

const result = document.getElementById("result");

const historyList = document.getElementById("history-list");

const clearHistoryBtn = document.getElementById("clear-history");

const convertBtn = document.getElementById("convert-btn");

const units = {



    temperature: ["celsius", "fahrenheit", "kelvin"],

    length: ["meter", "kilometer", "mile"],

    weight: ["kilogram", "gram", "pound"]

};



function updateUnits(){

    let selectedCategory = category.value;

    fromUnit.innerHTML = "";

    toUnit.innerHTML = "";

    units[selectedCategory].forEach(unit => {

        let option1 = document.createElement("option");

        option1.value = unit;

        option1.textContent = unit;

        fromUnit.appendChild(option1);



        let option2 = document.createElement("option");

        option2.value = unit;

        option2.textContent = unit;

        toUnit.appendChild(option2);

    });

}




function convertUnits(){

    if(inputValue.value === ""){
        result.textContent = "";
        return;
    }
    
    let value = Number(inputValue.value);

    let from = fromUnit.value;

    let to = toUnit.value;

    let selectedCategory = category.value;

    let output;

    if(selectedCategory === "temperature"){

        if(from === to){
            output = value;
        }

        else if(from === "celsius" && to === "fahrenheit"){
            output = (value * 9/5) + 32;
        }

        else if(from === "fahrenheit" && to === "celsius"){
            output = (value - 32) * 5/9;
        }

        else if(from === "celsius" && to === "kelvin"){
            output = value + 273.15;
        }

        else if(from === "kelvin" && to === "celsius"){
            output = value - 273.15;
        }

        else if(from === "fahrenheit" && to === "kelvin"){
            output = (value - 32) * 5/9 + 273.15;
        }

        else if(from === "kelvin" && to === "fahrenheit"){
            output = (value - 273.15) * 9/5 + 32;
        }

    }


    else if(selectedCategory === "length"){

        if(from === "meter" && to === "kilometer"){
            output = value / 1000;
        }

        else if(from === "kilometer" && to === "meter"){
            output = value * 1000;
        }

        else if(from === "meter" && to === "mile"){
            output = value / 1609;
        }

        else if(from === "mile" && to === "meter"){
            output = value * 1609;
        }

        else{
            output = value;
        }

    }





    else if(selectedCategory === "weight"){

        if(from === "kilogram" && to === "gram"){
            output = value * 1000;
        }

        else if(from === "gram" && to === "kilogram"){
            output = value / 1000;
        }

        else if(from === "kilogram" && to === "pound"){
            output = value * 2.205;
        }

        else if(from === "pound" && to === "kilogram"){
            output = value / 2.205;
        }

        else{
            output = value;
        }

    }



    result.textContent = output.toFixed(2);

   
}

function saveHistory(text){

    let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];

    history.unshift(text);

    if(history.length > 5){
        history.pop();
    }

    localStorage.setItem("conversionHistory", JSON.stringify(history));

    displayHistory();
}

function displayHistory(){

    let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];

    historyList.innerHTML = "";

    history.forEach(item => {

        let li = document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

    });

}

category.addEventListener("change", () => {

    updateUnits();

    convertUnits();

});





inputValue.addEventListener("input", convertUnits);

fromUnit.addEventListener("change", convertUnits);

toUnit.addEventListener("change", convertUnits);



updateUnits();

displayHistory();

clearHistoryBtn.addEventListener("click", () => {

    localStorage.removeItem("conversionHistory");

    displayHistory();

});

convertBtn.addEventListener("click", () => {

    convertUnits();

    if(inputValue.value === ""){
        return;
    }

    let value = Number(inputValue.value);

    let from = fromUnit.value;

    let to = toUnit.value;

    let output = result.textContent;

    let historyText = `${value} ${from} → ${to} = ${output}`;

    saveHistory(historyText);

});