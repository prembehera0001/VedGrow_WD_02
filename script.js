const inputValue = document.getElementById("input-value");

const fromUnit = document.getElementById("from-unit");

const toUnit = document.getElementById("to-unit");

const result = document.getElementById("result");


function convertTemperature(){

    let value = Number(inputValue.value);

    let from = fromUnit.value;

    let to = toUnit.value;

    let output;


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

    result.textContent = `Result: ${output.toFixed(2)}`;
}


inputValue.addEventListener("input", convertTemperature);

fromUnit.addEventListener("change", convertTemperature);

toUnit.addEventListener("change", convertTemperature);