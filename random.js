function kever(elemszam) {
//shuffles array of numbers 0 to 8
var szavaklong = elemszam;

//document.getElementById("felso").innerHTML =  szavaklong +" / " + kerdesszam;

const element_array = [];
for (i = 0; i < szavaklong; i++) 
{
    element_array.push(i);
}

//első indításkor kialakítja a feladványok sorrendjét
var i = 0;
    var buffer = 0;
    // 100-szor keveri meg - két szám felcserélésével
    for (i = 0; i < 100; i++) 
    {
        //generates two random numbers, saves them as integers
        var first_location = Math.floor(Math.random() * szavaklong);
        var second_location = Math.floor(Math.random() * szavaklong);
        //saves the value in the randomly selected first location as buffer
        var buffer = element_array[first_location];
        //changes first location's value to second location's value
        element_array[first_location] = element_array[second_location];
        //changes second location's value to buffer value (original first location)
        element_array[second_location] = buffer;
        //presto, we now have 2 swapped numbers
    }

return element_array;
}