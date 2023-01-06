feladvany_bal = [
    ["Aki haragszik,", "Nem mind arany,","Aki sokat csalódik,","Aki á-t mond,","Kétszer ad,"],
    ["Nem mind barátod,", "Ki korán kel,","Aki szelet vet,","Aki bírja,","Aki bottal köszön,"],
    ["Akinek vaj van a fején,", "Aki sokat markol,","Aki varjat akar lőni,","Aki másnak vermet ás,","Aki fél a víztől,"],
    ["Aki nem dolgozik,", "Aki dolgozik,","Akinek a foga fáj,","Aki hazudik,","Aki könnyen hisz,"],
    ["Aki időt nyer,", "Aki sokat ígér,","Akinek nem inge,","Aki keres,","Aki magasra hág,"],
]

feladvany_jobb = [
    ["az békül.", "ami fénylik.","keveset bízik.","mondjon bé-t is!","aki gyorsan ad."],
    ["aki rád mosolyog.", "aranyat lel.","vihart arat.","marja","annak doronggal felelnek."],
    ["ne menjen napra.", "keveset fog.","nem pengeti íját.","maga esik bele.","nem eszik halat."],
    ["ne is egyék.", "nem ér rá pénzt keresni.","tartsa a nyelvét rajta.","az lop is.","könnyen csalatkozik."],
    ["életet nyer.", "keveset ad.","az ne vegye magára.","talál.","nagyot esik."],
]

document.getElementById("ujra").style.visibility = "hidden";
document.getElementById("indit").style.visibility = "visible";

//a helyes megoldások keretének színei
szinek = [
    "violet", "green","blue","brown","gold"
]

//mindkét oldal minden gombját fehérre állítja
function alaphelyzet(){
    for (index = 0; index < 5; index++) {
        bal[index].style.backgroundColor = "white";
        jobb[index].style.backgroundColor = "white";
    }
  }

  //új feladványnál visszaállítja a szegélyeket és újra engedélyezi a gombokat
  function alaphelyzet2(){
    for (index = 0; index < 5; index++) {
        bal[index].style.border = "1px solid black";
        jobb[index].style.border = "1px solid black";
        bal[index].disabled = false;
        jobb[index].disabled = false;
    }

    for (index = 0; index < 5; index++) {
        bal[index].style.visibility = "visible";
        jobb[index].style.visibility = "visible";
    }
  }

var szinszam = 0;

//A gombok stílusának kinyerése
var bal = document.getElementsByClassName("szavas_bal");
var jobb = document.getElementsByClassName("szavas_jobb");

//kezdetben nem látszanak a gombok
function alaphelyzet3(){
    for (index = 0; index < 5; index++) {
        bal[index].style.visibility = "hidden";
        jobb[index].style.visibility = "hidden";
    } 
}

alaphelyzet3();

//a feladatok száma
var feladatok_szama = feladvany_bal.length;
//egy összekevert tömb a feladatok sorszámával
var feladatok_keverve = kever(feladatok_szama);
//egy feladaton belüli válaszlehetőségek száma
var valaszlehetosegek_szama = feladvany_bal[0].length;
//console.log("tömb " + feladatok_keverve)
//az indit eljárásban ezzel számoljuk a megoldott (elindított) feladványok sorszámát
var szamlalo = 0;

function progressbar(){
    let viszonyszam = 100 / feladatok_szama;
    // progress bar programozása a kérdések számának jelöléséhez
    let $progressBar = $('.progress-bar');
    $progressBar.text(szamlalo);
    // 30 kérdésre elosztva a 100%
    $progressBar.css('width', (viszonyszam * szamlalo  + '%'));
    //$progressBar.css('width', (kerdesszam * 100 / viszonyszam) + '%');
}


// 1 mp késleltetés mielőtt alaphelyzetbe áll
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  
  async function test() {
    await delay(300);

    alaphelyzet();
  }


document.getElementById("baloldali_ertek").style.display = "none";
document.getElementById("baloldali_index").style.display = "none";
document.getElementById("jobboldali_ertek").style.display = "none";
document.getElementById("jobboldali_index").style.display = "none";


function indit(){
    alaphelyzet();
    alaphelyzet2();

    szinszam = 0;
    //amíg van feladvány, addig dolgozik
    if (szamlalo < feladatok_szama) {
        var bal_valaszlehetosegek_keverve = kever(valaszlehetosegek_szama);
        var jobb_valaszlehetosegek_keverve = kever(valaszlehetosegek_szama);
        //console.log("bal tömb " + bal_valaszlehetosegek_keverve)
        //console.log("jobb tömb " + jobb_valaszlehetosegek_keverve)
    
    
        //a bal és jobb oldali feladványok kiíratása a képernyőre
        var bal_osztaly = document.getElementsByClassName("szavas_bal");
        var jobb_osztaly = document.getElementsByClassName("szavas_jobb");
    
        for (let index = 0; index < valaszlehetosegek_szama; index++) {
            bal_osztaly[index].value = feladvany_bal[feladatok_keverve[szamlalo]][bal_valaszlehetosegek_keverve[index]];  
            jobb_osztaly[index].value = feladvany_jobb[feladatok_keverve[szamlalo]][jobb_valaszlehetosegek_keverve[index]];  
    
        }
        szamlalo += 1;
        progressbar();
        //console.log("számláló " + szamlalo)   
    //elfogytak a feladványok   
    } else {
        document.getElementById("ujra").style.visibility = "visible";
        document.getElementById("indit").style.visibility = "hidden";
        alaphelyzet3();
    }
}



//bal oldali feladványok közül kiválasztás
$(".szavas_bal").click(function() {

    //melyik feladvány az aktuális, ezt a kevert tömbből keressük ki 
    var aktualis_feladvany_sorszama = feladatok_keverve[szamlalo - 1];
    //kiolvassa a kattintott gombról, hogy hányadik az eredeti listában a benne szereplő érték 
    var aktualis_tombindex = feladvany_bal[aktualis_feladvany_sorszama].indexOf(this.value);

    //ha nincs a jobb oldalon semmi kiválasztva, akkor engedi a választást balról
    if (document.getElementById("jobboldali_ertek").innerHTML == "") {
        //minden gomb fehér
        alaphelyzet();
        //a gomb lenyomásakor sárga kijelölő szín
        this.style.backgroundColor = "yellow"

        //console.log("feladatok keverve: " + feladatok_keverve[szamlalo - 1])

        //beteszi egy rejtett divbe a kiválasztott feladvány tömbindexét (hányadik a tömbben)
        document.getElementById("baloldali_ertek").innerHTML = aktualis_tombindex;
        //beteszi egy rejtett divbe a kiválasztott feladvány aktuális indexét (hányadik a gombok közül)
        document.getElementById("baloldali_index").innerHTML = this.name;
    
    } else
    {
        //beteszi egy rejtett divbe a kiválasztott feladvány tömbindexét (hányadik a tömbben)
        document.getElementById("baloldali_ertek").innerHTML = aktualis_tombindex;
        //beteszi egy rejtett divbe a kiválasztott feladvány aktuális indexét (hányadik a gombok közül)
        document.getElementById("baloldali_index").innerHTML = this.name;     

        //a rejtett divből kinyert változók
        var eredmeny_bal = document.getElementById("baloldali_ertek").innerHTML;
        var eredmeny_jobb = document.getElementById("jobboldali_ertek").innerHTML;

        //console.log("eredmeny_bal" + eredmeny_bal);
        //console.log("eredmeny_jobb" + eredmeny_jobb);
        
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

//jobb oldali feladványok közül kiválasztás
$(".szavas_jobb").click(function() {

    //melyik feladvány az aktuális, ezt a kevert tömbből keressük ki 
    var aktualis_feladvany_sorszama = feladatok_keverve[szamlalo - 1];
    //kiolvassa a kattintott gombról, hogy hányadik az eredeti listában a benne szereplő érték 
    var aktualis_tombindex = feladvany_jobb[aktualis_feladvany_sorszama].indexOf(this.value);

    //ha nincs a jobb oldalon semmi kiválasztva, akkor engedi a választást balról
    if (document.getElementById("baloldali_ertek").innerHTML == "") {
        //minden gomb fehér
        alaphelyzet();
        //a gomb lenyomásakor sárga kijelölő szín
        this.style.backgroundColor = "yellow"

        //console.log("feladatok keverve: " + feladatok_keverve[szamlalo - 1])

        //beteszi egy rejtett divbe a kiválasztott feladvány tömbindexét (hányadik a tömbben)
        document.getElementById("jobboldali_ertek").innerHTML = aktualis_tombindex;
        //beteszi egy rejtett divbe a kiválasztott feladvány aktuális indexét (hányadik a gombok közül)
        document.getElementById("jobboldali_index").innerHTML = this.name;
    
    } else
    {
        //beteszi egy rejtett divbe a kiválasztott feladvány tömbindexét (hányadik a tömbben)
        document.getElementById("jobboldali_ertek").innerHTML = aktualis_tombindex;
        //beteszi egy rejtett divbe a kiválasztott feladvány aktuális indexét (hányadik a gombok közül)
        document.getElementById("jobboldali_index").innerHTML = this.name;     

        //a rejtett divből kinyert változók
        var eredmeny_bal = document.getElementById("baloldali_ertek").innerHTML;
        var eredmeny_jobb = document.getElementById("jobboldali_ertek").innerHTML;

        //console.log("eredmeny_bal" + eredmeny_bal);
        //console.log("eredmeny_jobbos" + eredmeny_jobb);
        
        //ezzel a változóval érjük el, hogy a helyes párosításnál a párokat azonos színű kerettel jelölje
        var index_bal = document.getElementById("baloldali_index").innerHTML;
        //ellenőrzés
         if (eredmeny_bal == eredmeny_jobb) {
            //ha jó, akkor világoszöld háttérrel jelöli mindkét oldalon
            this.style.backgroundColor = "lightgreen"
            bal[index_bal - 1].style.backgroundColor = "lightgreen" 

            //ha jó, beállít egy vastagabb szegélyt
            this.style.border = "5px solid" 
            bal[index_bal - 1].style.border = "5px solid"

            //ha jó, a színtömbből kiszedi a következő színt
            this.style.borderColor = szinek[szinszam]
            bal[index_bal - 1].style.borderColor = szinek[szinszam]

            //a színek számát növeli
            szinszam += 1;
            //letiltja mindkét gombot, hogy már ne legyen aktív
            this.disabled = "true"
            bal[index_bal - 1].disabled = "true"

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
            bal[index_bal - 1].style.backgroundColor = "red" 

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

$('#ujra').click(function() {
    document.location.reload();
});



