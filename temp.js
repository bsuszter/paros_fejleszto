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

// 1 mp késleltetés mielőtt alaphelyzetbe áll
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  
  async function test() {
    await delay(300);

    alaphelyzet();
  }
//#endregion

//a helyes megoldások keretének színei
szinek = [
    "violet", "green","blue","brown","gold"
]

var szinszam = 0;

//A gombok stílusának kinyerése
var bal = document.getElementsByClassName("szavas_bal");
var jobb = document.getElementsByClassName("szavas_jobb");


//bal oldali feladványok közül kiválasztás
$(".szavas_bal").click(function() {
    //ha nincs a jobb oldalon semmi kiválasztva, akkor engedi a választást balról
    if (document.getElementById("jobboldali_ertek").innerHTML == "") {
        //minden gomb fehér
        alaphelyzet();
        //a gomb lenyomásakor sárga kijelölő szín
        this.style.backgroundColor = "yellow"
        //beteszi egy rejtett divbe a kiválasztott feladvány tömbindexét (hányadik a tömbben)
        document.getElementById("baloldali_ertek").innerHTML = feladvany_bal[0].indexOf(this.value);
        //beteszi egy rejtett divbe a kiválasztott feladvány aktuális indexét (hányadik a gombok közül)
        document.getElementById("baloldali_index").innerHTML = this.name;

/*         var feladvanyom = document.getElementById("baloldali_ertek").innerHTML;
        console.log(feladvany_bal[0][feladvanyom])
        console.log(feladvany_jobb[0][feladvanyom]) */
    
    } 
    //már a jobb oldalon kiválasztottak egy gombot, tehát ellenőrizni kell
    else
    {
        //beteszi egy rejtett divbe a kiválasztott feladvány tömbindexét (hányadik a tömbben)
        document.getElementById("baloldali_ertek").innerHTML = feladvany_bal[0].indexOf(this.value);
        //beteszi egy rejtett divbe a kiválasztott feladvány aktuális indexét (hányadik a gombok közül)
        document.getElementById("baloldali_index").innerHTML = this.name;       

        //a rejtett divből kinyert változók
        var eredmeny_bal = document.getElementById("baloldali_ertek").innerHTML;
        var eredmeny_jobb = document.getElementById("jobboldali_ertek").innerHTML;
        
        //ezzel a változóval érjük el, hogy a helyes párosításnál a párokat azonos színű kerettel jelölje
        var index_jobb = document.getElementById("jobboldali_index").innerHTML;
        //ellenőrzés
         if (eredmeny_bal == eredmeny_jobb) {
            //ha jó, akkor világoszöld háttérrel jelöli mindkét oldalon
            this.style.backgroundColor = "lightgreen"
            jobb[index_jobb - 1].style.backgroundColor = "lightgreen" 

            //ha jó, beállít egy vastagabb szegélyt
            this.style.border = "5px solid" 
            jobb[index_jobb - 1].style.border = "5px solid"

            //ha jó, a színtömbből kiszedi a következő színt
            this.style.borderColor = szinek[szinszam]
            jobb[index_jobb - 1].style.borderColor = szinek[szinszam]

            //a színek számát növeli
            szinszam += 1;
            //letiltja mindkét gombot, hogy már ne legyen aktív
            this.disabled = "true"
            jobb[index_jobb - 1].disabled = "true"

            //kitakarítja a diveket
            document.getElementById("baloldali_ertek").innerHTML = "";
            document.getElementById("jobboldali_ertek").innerHTML = "";
            document.getElementById("baloldali_index").innerHTML = "";
            document.getElementById("jobboldali_index").innerHTML = "";
            //várakozás 1 mp-ig
            test();
        //ha nem jó a megoldás
        } else
        {   
            //akkor a kiválasztott gombokat pirosra festi
            this.style.backgroundColor = "red" 
            jobb[index_jobb - 1].style.backgroundColor = "red" 

            //kitakarítja a diveket
            document.getElementById("baloldali_ertek").innerHTML = "";
            document.getElementById("jobboldali_ertek").innerHTML = "";
            document.getElementById("baloldali_index").innerHTML = "";
            document.getElementById("jobboldali_index").innerHTML = "";
            //várakozás 1 mp-ig
            test();    
        } 
    }

});

//ugyanaz a jobb oldali blokkra
$(".szavas_jobb").click(function() {
    if (document.getElementById("baloldali_ertek").innerHTML == "" ) {
        console.log("mindkettő üres") 
        alaphelyzet();
        this.style.backgroundColor = "yellow"
        document.getElementById("jobboldali_ertek").innerHTML = feladvany_jobb[0].indexOf(this.value);
        document.getElementById("jobboldali_index").innerHTML = this.name;
     } else
     {
        document.getElementById("jobboldali_ertek").innerHTML = feladvany_jobb[0].indexOf(this.value);
        document.getElementById("jobboldali_index").innerHTML = this.name;

        for (index = 0; index < 5; index++) {
            jobb[index].style.backgroundColor = "white"
        }

        var eredmeny_bal = document.getElementById("baloldali_ertek").innerHTML;
        var eredmeny_jobb = document.getElementById("jobboldali_ertek").innerHTML;
        var index_bal = document.getElementById("baloldali_index").innerHTML;

    
         if (eredmeny_bal == eredmeny_jobb) {
            this.style.backgroundColor = "lightgreen"
            this.style.border = "5px solid" 
            this.style.borderColor = szinek[szinszam]
            bal[index_bal - 1].style.backgroundColor = "lightgreen" 
            bal[index_bal - 1].style.border = "5px solid"
            bal[index_bal - 1].style.borderColor = szinek[szinszam]
            szinszam += 1
            this.disabled = "true"
            bal[index_bal - 1].disabled = "true"
            document.getElementById("baloldali_ertek").innerHTML = "";
            document.getElementById("jobboldali_ertek").innerHTML = "";
            document.getElementById("baloldali_index").innerHTML = "";
            document.getElementById("jobboldali_index").innerHTML = "";
            test();
        } else
        {
            this.style.backgroundColor = "red" 
            bal[index_bal - 1].style.backgroundColor = "red" 
            document.getElementById("baloldali_ertek").innerHTML = "";
            document.getElementById("jobboldali_ertek").innerHTML = "";
            document.getElementById("baloldali_index").innerHTML = "";
            document.getElementById("jobboldali_index").innerHTML = "";
            test();         
        } 
     }
});
