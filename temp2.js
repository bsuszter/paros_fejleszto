//a feladványok számának kinyerése
var szavaklong = feladvany_bal[0].length - 1;
//egy tömb létrehozása a jobb oldali feladványok sorszámának megkeveréséhez
const element_array2 = [];
for (i = 0; i < szavaklong + 1; i++) {
 element_array2.push(i);
}
//egy tömb létrehozása a bal oldali feladványok sorszámának megkeveréséhez
const element_array3 = [];
for (i = 0; i < szavaklong + 1; i++) {
 element_array3.push(i);
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
     var buffer = element_array2[first_location];
     //changes first location's value to second location's value
     element_array2[first_location] = element_array2[second_location];
     //changes second location's value to buffer value (original first location)
     element_array2[second_location] = buffer;
     //presto, we now have 2 swapped numbers
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
     var buffer = element_array3[first_location];
     //changes first location's value to second location's value
     element_array3[first_location] = element_array3[second_location];
     //changes second location's value to buffer value (original first location)
     element_array3[second_location] = buffer;
     //presto, we now have 2 swapped numbers
 }

//a bal és jobb oldali feladványok kiíratása a képernyőre
var d1 = document.getElementsByClassName("szavas_bal");

for (let index = 0; index < feladvany_bal[0].length; index++) {
    d1[index].value = feladvany_bal[0][element_array3[index]];  
}

var d2 = document.getElementsByClassName("szavas_jobb");

for (let index = 0; index < feladvany_bal[0].length; index++) {
    d2[index].value = feladvany_jobb[0][element_array2[index]]; 
}


//mindkét oldal minden gombját fehérre állítja
function alaphelyzet(){
    for (index = 0; index < 5; index++) {
        bal[index].style.backgroundColor = "white"
    }
    for (index = 0; index < 5; index++) {
        jobb[index].style.backgroundColor = "white"
    }
  }
