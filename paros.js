feladvany_bal = [
    ["Aki haragszik,", "Nem mind arany,","Aki sokat csalódik,","Aki á-t mond,","Kétszer ad,"],
    ["1,", "2","3","4","5"],
    ["11,", "12","13","14","15"],
    ["21,", "22","23","24","25"],
]

feladvany_jobb = [
    ["az békül.", "ami fénylik.","keveset bízik.","mondjon bé-t is!","aki gyorsan ad."],
    ["1,", "2","3","4","5"],
    ["11,", "12","13","14","15"],
    ["21,", "22","23","24","25"],
]

document.getElementById("ujra").style.visibility = "hidden";
document.getElementById("indit").style.visibility = "visible";

//a helyes megoldások keretének színei
szinek = [
    "violet", "green","blue","brown","gold"
]

var szinszam = 0;

//A gombok stílusának kinyerése
var bal = document.getElementsByClassName("szavas_bal");
var jobb = document.getElementsByClassName("szavas_jobb");

//a feladatok száma
var feladatok_szama = feladvany_bal.length;
//egy összekevert tömb a feladatok sorszámával
var feladatok_keverve = kever(feladatok_szama);
//egy feladaton belüli válaszlehetőségek száma
var valaszlehetosegek_szama = feladvany_bal[0].length;
console.log("tömb " + feladatok_keverve)
//az indit eljárásban ezzel számoljuk a megoldott (elindított) feladványok sorszámát
var szamlalo = 0;

/*
document.getElementById("baloldali_ertek").style.display = "none";
document.getElementById("baloldali_index").style.display = "none";
document.getElementById("jobboldali_ertek").style.display = "none";
document.getElementById("jobboldali_index").style.display = "none";
*/

function indit(){
    if (szamlalo < feladatok_szama) {
        var bal_valaszlehetosegek_keverve = kever(valaszlehetosegek_szama);
        var jobb_valaszlehetosegek_keverve = kever(valaszlehetosegek_szama);
        console.log("bal tömb " + bal_valaszlehetosegek_keverve)
        console.log("jobb tömb " + jobb_valaszlehetosegek_keverve)
    
    
        //a bal és jobb oldali feladványok kiíratása a képernyőre
        var bal_osztaly = document.getElementsByClassName("szavas_bal");
        var jobb_osztaly = document.getElementsByClassName("szavas_jobb");
    
        for (let index = 0; index < valaszlehetosegek_szama; index++) {
            bal_osztaly[index].value = feladvany_bal[feladatok_keverve[szamlalo]][bal_valaszlehetosegek_keverve[index]];  
            jobb_osztaly[index].value = feladvany_bal[feladatok_keverve[szamlalo]][jobb_valaszlehetosegek_keverve[index]];  
    
        }
        szamlalo += 1;
        console.log("számláló " + szamlalo)       
    } else {
        document.getElementById("ujra").style.visibility = "visible";
        document.getElementById("indit").style.visibility = "hidden";
    }
}

//mindkét oldal minden gombját fehérre állítja
function alaphelyzet(){
    for (index = 0; index < 5; index++) {
        bal[index].style.backgroundColor = "white"
        jobb[index].style.backgroundColor = "white"
    }
  }

//bal oldali feladványok közül kiválasztás
$(".szavas_bal").click(function() {
    //ha nincs a jobb oldalon semmi kiválasztva, akkor engedi a választást balról
    if (document.getElementById("jobboldali_ertek").innerHTML == "") {
        //minden gomb fehér
        alaphelyzet();
        //a gomb lenyomásakor sárga kijelölő szín
        this.style.backgroundColor = "yellow"

        console.log("feladatok keverve: " + feladatok_keverve[szamlalo - 1])
        //melyik feladvány az aktuális, ezt a kevert tömbből keressük ki 
        var aktualis_feladvany_sorszama = feladatok_keverve[szamlalo - 1];
        //kiolvassa a kattintott gombról, hogy hányadik az eredeti listában a benne szereplő érték 
        var aktualis_tombindex = feladvany_bal[aktualis_feladvany_sorszama].indexOf(this.value);

        //beteszi egy rejtett divbe a kiválasztott feladvány tömbindexét (hányadik a tömbben)
        document.getElementById("baloldali_ertek").innerHTML = aktualis_tombindex;
        //beteszi egy rejtett divbe a kiválasztott feladvány aktuális indexét (hányadik a gombok közül)
        document.getElementById("baloldali_index").innerHTML = this.name;
    
    } 
});

$('#ujra').click(function() {
    document.location.reload();
});



