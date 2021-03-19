$(function () {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Widocznzość tabletu
    display(false)
    
    function display(bool) {
        if (bool) {
            $("#container").show();
            $("#menu").show();


            $("#baza").hide();
            $("#szukanie").hide();
            $("#statystyki").hide();
            $("#faktura").hide();
            $("#DIVUbezpieczeniemech").hide();

        } else {
            $("#container").hide();
            $("#menu").hide();
        }

        // Wyswietlenie ostatnich 4 wpisów w menu
   
    }
    
    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type === "ui") {
            if (item.status == true) {
                display(true)

                let InputSearchLastMech = 20;
                $.post('http://mechaniktablet/SearchLastMech', JSON.stringify({
                    InputSearchLast1Mech: InputSearchLastMech, }));


            $.post('http://mechaniktablet/DaneBazaMenuMech', JSON.stringify({}));

            } else {
                display(false)
            }
        }
    })
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   //Wyjscie za pomocą ESC
    document.onkeyup = function (data) {
        if (data.which == 27) {
            $.post('http://mechaniktablet/exit', JSON.stringify({}));
        }
        return;
    };
    //Przycisk ENTER
    $(document).keypress(
        function(event){
          if (event.which == '13') {
            event.preventDefault();
          }
          return;
      });

    //Wyjscie za pomocą przyciusku
    $("#close").click(function () {
        $.post('http://mechaniktablet/exit', JSON.stringify({}));
        return;
    })

    $("#ubezpieczeniemech").click(function () {
        $.post('http://mechaniktablet/GetUbezpieczenieListMechanic', JSON.stringify({}));
        return;
    }) 

    window.addEventListener('message', function(event) {
        var item23 = event.data;
    if (item23.type === "makeTableAmbulance")
    {
        console.log("Czesc")
        var dlugosc23=event.data.makeTableAmbulance.length;
        var tablica23 =[];

        for(var i = 0; i< dlugosc23; i++)
        {
            tablica23[i]=[]
        }
            for(var i = 0; i < dlugosc23; i++)
            {
    
                try{
                    tablica23[i][0]=item23.makeTableAmbulance[i].firstname;    
                    tablica23[i][1]=item23.makeTableAmbulance[i].lastname;
                }
                catch(error)
                {
                    tablica23[i][0]=""
                    tablica23[i][1]=""
                }
            }
    
        var result23 = "<table border=1>";
        result23 += "<tr>";
        result23 += "<th style='width: 1%'>Imię członka EMT</th>";
        result23 += "<th style='width: 2%'>Nazwisko członka EMT</th>";
        result23 += "</tr>";
    
                    for(var i=0; i<dlugosc23;i++)
                    {
                     
                        result23 += "<tr>";
                        for(var j=0; j<2; j++)
                        {
                            result23 += "<td>"+tablica23[i][j]+"</td>";
                        }
                        result23 += "</tr>";
                   
                    } 
                    result23 += "</table>";
                    document.getElementById("OCEMT").innerHTML = result23;
    
        }
        })

    window.addEventListener('message', function(event) {
        var item22 = event.data;
    
    if (item22.type === "makeTableSheriffMechanic")
    {
        console.log("Czesc")
        var dlugosc22=event.data.makeTableSheriffMechanic.length;
        var tablica22 =[];

        for(var i = 0; i< dlugosc22; i++)
        {
            tablica22[i]=[]
        }
            for(var i = 0; i < dlugosc22; i++)
            {
    
                try{
                    tablica22[i][0]=item22.makeTableSheriffMechanic[i].firstname;    
                    tablica22[i][1]=item22.makeTableSheriffMechanic[i].lastname;
                }
                catch(error)
                {
                    tablica22[i][0]=""
                    tablica22[i][1]=""
                }
            }
    
        var result22 = "<table border=1>";
        result22 += "<tr>";
        result22 += "<th style='width: 1%'>Imię FPD</th>";
        result22 += "<th style='width: 2%'>Nazwisko FPD</th>";
        result22 += "</tr>";
    
                    for(var i=0; i<dlugosc22;i++)
                    {
                     
                        result22 += "<tr>";
                        for(var j=0; j<2; j++)
                        {
                            result22 += "<td>"+tablica22[i][j]+"</td>";
                        }
                        result22 += "</tr>";
                   
                    } 
                    result22 += "</table>";
                    document.getElementById("OCPD").innerHTML = result22;
    
        }
        })

          //Wyjscie za pomocą przyciusku
        $("#wystawfakture").click(function () {
            let idgracza = $("#idklienta").val() 
            let powod = $("#powod").val()
            let kwota = $("#kwota").val()
            $.post('http://mechaniktablet/mandatMechanik', JSON.stringify({
            playerid: idgracza,
            mandatamount: kwota,
            mandatreason: powod}));
            return;
        })

   /////////////////////////////////////////// Funkcjonalne MENU
  
   window.addEventListener('message', function(event) {
    var itemM = event.data;
   
if (itemM.type === "MenuMechanik")
{

            window.value = itemM.DaneMenu.mechanikDane;

            var resultM = "<table border=1>";
            resultM += "<tr>";
            resultM += "<th colspan='2'>Informacje Personalne</th>";
            resultM += "</tr>";

            resultM += "<tr>";
            resultM += "<td>"+ "Stanowisko: "+"</td>";
            resultM += "<td>"+ itemM.DaneMenu.jobGrade+"</td>";
            resultM += "</tr>";

            resultM += "<tr>";
            resultM += "<td>"+ "Imie i Nazwisko: "+"</td>";
            resultM += "<td>"+itemM.DaneMenu.mechanikDane+"</td>";
            resultM += "</tr>";

            resultM += "<tr>";
            resultM += "<td>"+ "Ilość Wpisów: "+"</td>";
            resultM += "<td>"+ itemM.DaneMenu.iloscwpisow +"</td>";
            resultM += "</tr>";

            resultM += "</table>";
            document.getElementById("menutableinfo").innerHTML = resultM;

            var resultM1 ="Zalogowany jako: "+ itemM.DaneMenu.mechanikDane;
            document.getElementById("loginmenu").innerHTML = resultM1;

       }
    })


        $("#menumechanik").click(function(){
            let InputSearchLastMech = 20;
            $.post('http://mechaniktablet/SearchLastMech', JSON.stringify({
                InputSearchLast1Mech: InputSearchLastMech, }));
            return;
        })

        
    $("#dodajrekordmechanik").click(function(){
        document.getElementById("mechanikdane").value = window.value
        //$.post('http://emttablet/Search', JSON.stringify({}));
        return;
    })

    $("#DeleteForms").click(function(){
        let idrekordudousuniecia = $("#rekordusuniecia").val() 
        $.post('http://mechaniktablet/DeleteMechanicData', JSON.stringify({
            IDRekorduDel: idrekordudousuniecia
        }));
        
        return;
    })

    $("#fakturaprzycisk").click(function(){
          let tmp1 = window.value
          document.getElementById("idklienta").value = "";
        $.post('http://mechaniktablet/FakturaDataLast', JSON.stringify({
            danemechanikafaktura: tmp1
        }));
        return;
    })

    window.addEventListener('message', function(event) {
        var itemF = event.data;
       
    if (itemF.type === "FakturaData")
    {   
    document.getElementById("danelast").value = itemF.DataFaktura.danemechanikafaktura;
    document.getElementById("kwotalast").value = itemF.DataFaktura.kwotafaktura;
           }
        })

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   $("#SubmitTune").click(function(){
    ////////////////////////////////////////////////////////////////// CheckBoxy Obrazen/////////////////////////////////////////////////////////
    var check1 = document.getElementById("ct1")
    var check2 = document.getElementById("ct2")
    var check3 = document.getElementById("ct3")
    var check4 = document.getElementById("ct4")
    var check5 = document.getElementById("ct5")
    var check6 = document.getElementById("ct6")
    var check7 = document.getElementById("ct7")
    var check8 = document.getElementById("ct8")
    var check9 = document.getElementById("ct9")
    var check10 = document.getElementById("ct10")
    var check11 = document.getElementById("ct11")
    var check12 = document.getElementById("ct12")
    var check13 = document.getElementById("ct13")
    var check14 = document.getElementById("ct14")
    var check15 = document.getElementById("ct15")
    var check16 = document.getElementById("ct16")
    var check17 = document.getElementById("ct17")

    var ubezp1 = document.getElementById("cu1")
    var ubezp2 = document.getElementById("cu2")
    var ubezp3 = document.getElementById("cu3")
    // Zmienne do Checkboxów
    let tuning1 = ""
    let tuning2 = ""
    let tuning3 = ""
    let tuning4 = ""
    let tuning5 = ""
    let tuning6 = ""
    let tuning7 = ""
    let tuning8 = ""
    let tuning9 = ""
    let tuning10 = ""
    let tuning11 = ""
    let tuning12 = ""
    let tuning13 = ""
    let tuning14 = ""
    let tuning15 = ""
    let tuning16 = ""
    let tuning17 = ""

    let ilosc1 = 0
    let wartosc = 0
    if(check1.checked == true){ tuning1 = $("#ct1").val() +" | " 
    ilosc1=ilosc1+0.033}
    if(check2.checked == true){ tuning2 = $("#ct2").val() +" | "
    ilosc1=ilosc1+0.033}
    if(check3.checked == true){ tuning3 = $("#ct3").val() +" | "
    ilosc1=ilosc1+0.033} 
    if(check4.checked == true){ tuning4 = $("#ct4").val() +" | "
    ilosc1=ilosc1+0.033}
    if(check5.checked == true){ tuning5 = $("#ct5").val() +" | "
    ilosc1=ilosc1+0.033} 
    if(check6.checked == true){ tuning6 = $("#ct6").val() +" | "
    ilosc1=ilosc1+0.033}
    if(check7.checked == true){ tuning7 = $("#ct7").val() +" | "
    wartosc=wartosc+6000} 
    if(check8.checked == true){ tuning8 = $("#ct8").val() +" | "
    wartosc=wartosc+1000}
    if(check9.checked == true){ tuning9 = $("#ct9").val() +" | "
    wartosc=wartosc+4000} 
    if(check10.checked == true){ tuning10 = $("#ct10").val() +" | "
    wartosc=wartosc+2000}
    if(check11.checked == true){ tuning11 = $("#ct11").val() +" | "
    wartosc=wartosc+4000} 
    if(check12.checked == true){ tuning12 = $("#ct12").val() +" | "
    wartosc=wartosc+4000}
    if(check13.checked == true){ tuning13 = $("#ct13").val() +" | "
    wartosc=wartosc+2000} 
    if(check14.checked == true){ tuning14 = $("#ct14").val() +" | "
    wartosc=wartosc+5000}
    if(check15.checked == true){ tuning15 = $("#ct15").val() +" | "
    wartosc=wartosc+5000} 
    if(check16.checked == true){ tuning16 = $("#ct16").val() +" | "
    wartosc=wartosc+8000}
    if(check17.checked == true){ tuning17 = $("#ct17").val() +" | "
    wartosc=wartosc+4000}


     wart1 = $("#mnoznikwizualka").val()
  
     wart2 = $("#mnozniklakier").val()
 
     wart3 = $("#mnoznikextras").val()

    let mnoznik = (3000*parseInt(wart1)) +(6000*parseInt(wart2)) + (5000*parseInt(wart3))

    let TuningChecks = tuning1+tuning2+tuning3+tuning4+tuning5+tuning6+tuning7+tuning8+tuning17+tuning9+tuning10+tuning11+tuning12+tuning13+tuning14+tuning15+tuning16+"Wizualka: "+wart1+" | "+"Lakierowanie: "+wart2+" | "+"Extras: "+wart3    
    let ubcheck = 0
    let ubcheck2 =0
    let ubezpieczenie = ""

    if(ubezp1.checked == true){ ubezpieczenie = $("#cu1").val()
    ubcheck=1
    ubcheck2=0.5}
    if(ubezp2.checked == true){ ubezpieczenie = $("#cu2").val()
    ubcheck=1.2
    ubcheck2=1}
    if(ubezp3.checked == true){ ubezpieczenie = $("#cu3").val()
    ubcheck=0.8
    ubcheck2=0}

    var check1n = document.getElementById("cn1")
    var check2n = document.getElementById("cn2")
    var check3n = document.getElementById("cn3")
    var check4n = document.getElementById("cn4")
    var check5n = document.getElementById("cn5")
    var check6n = document.getElementById("cn6")
    var check7n = document.getElementById("cn7")
    var check8n = document.getElementById("cn8")
    var check9n = document.getElementById("cn9")
    var check10n = document.getElementById("cn10")
    var check11n = document.getElementById("cn11")
    var check12n = document.getElementById("cn12")
    var check13n = document.getElementById("cn13")
    var check14n = document.getElementById("cn14")
    var check15n = document.getElementById("cn15")
    var check16n = document.getElementById("cn16")
    var check17n = document.getElementById("cn17")
    var check18n = document.getElementById("cn18")
    var check19n = document.getElementById("cn19")
    var check20n = document.getElementById("cn20")
    var check21n = document.getElementById("cn21")
    var check22n = document.getElementById("cn22")
    var check23n = document.getElementById("cn23")

    let naprawa1 = ""
    let naprawa2 = ""
    let naprawa3 = ""
    let naprawa4 = ""
    let naprawa5 = ""
    let naprawa6 = ""
    let naprawa7 = ""
    let naprawa8 = ""
    let naprawa9 = ""
    let naprawa10 = ""
    let naprawa11 = ""
    let naprawa12 = ""
    let naprawa13 = ""
    let naprawa14 = ""
    let naprawa15 = ""
    let naprawa16 = ""
    let naprawa17 = ""
    let naprawa18 = ""
    let naprawa19 = ""
    let naprawa20 = ""
    let naprawa21 = ""
    let naprawa22 = ""
    let naprawa23 = ""

    let wartoscnaprawy = 0
    if(check1n.checked == true){ naprawa1 = $("#cn1").val() +" | " 
    wartoscnaprawy=wartoscnaprawy+3000}
    if(check2n.checked == true){ naprawa2 = $("#cn2").val() +" | " 
    wartoscnaprawy=wartoscnaprawy+3000}
    if(check3n.checked == true){ naprawa3 = $("#cn3").val() +" | " }
    if(check4n.checked == true){ naprawa4 = $("#cn4").val() +" | " 
    wartoscnaprawy=wartoscnaprawy+2000}
    if(check5n.checked == true){ naprawa5 = $("#cn5").val() +" | " 
    wartoscnaprawy=wartoscnaprawy+2000}
    if(check6n.checked == true){ naprawa6 = $("#cn6").val() +" | " 
    wartoscnaprawy=wartoscnaprawy+2000}
    if(check7n.checked == true){ naprawa7 = $("#cn7").val() +" | "
    wartoscnaprawy=wartoscnaprawy+2000
    }

    if(check8n.checked == true){ naprawa8 = $("#cn8").val() +" | " }
    if(check9n.checked == true){ naprawa9 = $("#cn9").val() +" | " }
    if(check10n.checked == true){ naprawa10 = $("#cn10").val() +" | " }
    if(check11n.checked == true){ naprawa11 = $("#cn11").val() +" | " }
    if(check12n.checked == true){ naprawa12 = $("#cn12").val() +" | " }
    if(check13n.checked == true){ naprawa13 = $("#cn13").val() +" | " }
    if(check14n.checked == true){ naprawa14 = $("#cn14").val() +" | " }
    if(check15n.checked == true){ naprawa15 = $("#cn15").val() +" | " }
    if(check16n.checked == true){ naprawa16 = $("#cn16").val() +" | " }
    if(check17n.checked == true){ naprawa17 = $("#cn17").val() +" | " }
    if(check18n.checked == true){ naprawa18 = $("#cn18").val() +" | " }
    if(check19n.checked == true){ naprawa19 = $("#cn19").val() +" | " }
    if(check20n.checked == true){ naprawa20 = $("#cn20").val() +" | " }
    if(check21n.checked == true){ naprawa21 = $("#cn21").val() +" | " }
    if(check22n.checked == true){ naprawa22 = $("#cn22").val() +" | " }
    if(check23n.checked == true){ naprawa23 = $("#cn23").val() +" | " }

   
    let naprawa = naprawa9+naprawa10+naprawa11+naprawa12+naprawa13+naprawa14+naprawa15+naprawa16+naprawa17+naprawa18+naprawa19+naprawa20+naprawa21+naprawa22+naprawa23

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    let wartoscauta = $("#wartoscform").val()
       if($("#wartoscform").val()=="")
       wartoscauta=0

       let mnoznikdojazd = $("#cnnaprawa").val()
       let dojazd = 0
       if(check8n.checked == true & ubezp2.checked == true){
        dojazd= 100*mnoznikdojazd*2
       }
       if(check8n.checked == true & ubezp1.checked == true){
        dojazd= 0
       }
       if(check8n.checked == true & ubezp3.checked == true){
        dojazd=0
       }

       let usluga = naprawa1+naprawa2+naprawa3+naprawa4+naprawa5+naprawa6+naprawa7+naprawa8+"Dojazd: "+mnoznikdojazd+"km"

       let wartosctune = (((ilosc1*parseInt(wartoscauta))+mnoznik+wartosc)*ubcheck)+(wartoscnaprawy*ubcheck2+dojazd)

       let wartoscINT = (wartosctune.toFixed(0)).toString()
       let inputData = $("#dataform").val()
       let inputDane = $("#daneform").val()
       let inputUbezpieczenie = ubezpieczenie
       let inputMechanik = $("#mechanikdane").val()
   

       $.post('http://mechaniktablet/AddFormMechanic', JSON.stringify({
           
           inputData1: inputData,
           inputDane1: inputDane,
           inputTuning1: TuningChecks,
           inputNaprawa1: naprawa,
           inputUsluga1: usluga,
           inputUbezpieczenie1: inputUbezpieczenie,
           inputMechanik1: inputMechanik,
           inputKwota: wartoscINT
       }));
           return;
       })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       
       $("#clearform").click(function(){
       
    document.getElementById("daneform").value= ""
    document.getElementById("wartoscform").value= ""
    document.getElementById("mnoznikwizualka").value= "0"
    document.getElementById("mnozniklakier").value= "0"
    document.getElementById("mnoznikextras").value= "0"
    document.getElementById("cnnaprawa").value= "0"
    document.getElementById("ct1").checked  = false
    document.getElementById("ct2").checked  = false
    document.getElementById("ct3").checked  = false
    document.getElementById("ct4").checked  = false
    document.getElementById("ct5").checked  = false
    document.getElementById("ct6").checked  = false
    document.getElementById("ct7").checked  = false
    document.getElementById("ct8").checked  = false
    document.getElementById("ct9").checked  = false
    document.getElementById("ct10").checked  = false
    document.getElementById("ct11").checked  = false
    document.getElementById("ct12").checked  = false
    document.getElementById("ct13").checked  = false
    document.getElementById("ct14").checked  = false
    document.getElementById("ct15").checked  = false
    document.getElementById("ct16").checked  = false

    document.getElementById("cn1").checked  = false
    document.getElementById("cn2").checked  = false
    document.getElementById("cn3").checked  = false
    document.getElementById("cn4").checked  = false
    document.getElementById("cn5").checked  = false
    document.getElementById("cn6").checked  = false
    document.getElementById("cn7").checked  = false
    document.getElementById("cn8").checked  = false
    document.getElementById("cn9").checked  = false
    document.getElementById("cn10").checked  = false
    document.getElementById("cn11").checked  = false
    document.getElementById("cn12").checked  = false
    document.getElementById("cn13").checked  = false
    document.getElementById("cn14").checked  = false
    document.getElementById("cn15").checked  = false
    document.getElementById("cn16").checked  = false
    document.getElementById("cn17").checked  = false
    document.getElementById("cn18").checked  = false
    document.getElementById("cn19").checked  = false
    document.getElementById("cn20").checked  = false
    document.getElementById("cn21").checked  = false
    document.getElementById("cn22").checked  = false
    document.getElementById("cn23").checked  = false

    document.getElementById("cu1").checked  = false
    document.getElementById("cu2").checked  = false
    document.getElementById("cu3").checked  = false

        return;
    })

       /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       $("#btszukajklienta").click(function(){
        let inputszuk1 = $("#szukajklienta").val()
        $.post('http://mechaniktablet/SerchKlientMech', JSON.stringify({
            inputDaneKlienta: inputszuk1, }));
        return;
    })

    $("#btszukajmechanika").click(function(){
        let inputszuk2 = $("#szukajmechanika").val()
        $.post('http://mechaniktablet/SearchMechanikMech', JSON.stringify({
            inputDaneMechanika: inputszuk2, }));
        return;
    })

    $("#GetKlientMechanik").click(function(){
        $.post('http://mechaniktablet/GetKlientNameMech', JSON.stringify({}));
        return;
    })
    
    window.addEventListener('message', function(event) {
        var itemData = event.data;
    
    if (itemData.type === "GetKlientNameMechClient")
    {
                document.getElementById("daneform").value = itemData.daneklienta.daneklienta;
           }
        })

       //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       window.addEventListener('message', function(event) {
        var item = event.data
        
        
    if (item.type === "KlientData")
    {
       
        var dlugosc=event.data.DataKlient.length;
        var tablica =[];
    
        for(var i = 0; i< dlugosc; i++)
        {
            tablica[i]=[]
        }
            for(var i = 0; i < dlugosc; i++)
            {
                try{
                tablica[i][0]=item.DataKlient[i].ID;    
                tablica[i][1]=item.DataKlient[i].data;
                tablica[i][2]=item.DataKlient[i].daneklienta;
                tablica[i][3]=item.DataKlient[i].tuning;
                tablica[i][4]=item.DataKlient[i].naprawa;
                tablica[i][5]=item.DataKlient[i].uslugi;
                tablica[i][6]=item.DataKlient[i].ubezpieczenie;
                tablica[i][7]=item.DataKlient[i].danemechanika;
                tablica[i][8]=item.DataKlient[i].kwota;
                }
                catch(error)
                {
                    tablica[i][0]=""
                    tablica[i][1]=""
                    tablica[i][2]=""
                    tablica[i][3]=""
                    tablica[i][4]=""
                    tablica[i][5]=""
                    tablica[i][6]=""
                    tablica[i][7]=""
                    tablica[i][8]=""
                }
            }
           
                var result = "<table border=1>";
                result += "<tr>";
                result += "<th style='width: 1%'>ID</th>";
                result += "<th style='width: 2%'>Data Uslugi</th>";
                result += "<th style='width: 3%'>Dane Klienta</th>";
                result += "<th style='width: 5%'>Tuning</th>";
                result += "<th style='width: 3%'>Naprawa</th>";
                result += "<th style='width: 1%'>Usługi</th>";
                result += "<th style='width: 3%'>Ubezpieczenie</th>";
                result += "<th style='width: 3%'>Dane Mechanika</th>";
                result += "<th style='width: 3%'>Kwota</th>";
                result += "</tr>";
                
    
                for(var i=0; i<tablica.length;i++)
                {
                 
                result += "<tr>";
                    for(var j=0; j<9; j++)
                    {
                        result += "<td>"+tablica[i][j]+"</td>";
                    }
                    result += "</tr>";
               
                } 
                result += "</table>";
                document.getElementById("countmech").innerHTML = dlugosc;
                document.getElementById("tabelawyszukiwanie").innerHTML = result;
    
                }})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                window.addEventListener('message', function(event) {
                    var item1 = event.data
                    
                if (item1.type === "MechanikData")
                {
                   
                    var dlugosc1=event.data.DataMechanik.length;
                    var tablica1 =[];
                
                    for(var i = 0; i< dlugosc1; i++)
                    {
                        tablica1[i]=[]
                    }
                        for(var i = 0; i < dlugosc1; i++)
                        {
                            try{
                                tablica1[i][0]=item1.DataMechanik[i].ID;    
                                tablica1[i][1]=item1.DataMechanik[i].data;
                                tablica1[i][2]=item1.DataMechanik[i].daneklienta;
                                tablica1[i][3]=item1.DataMechanik[i].tuning;
                                tablica1[i][4]=item1.DataMechanik[i].naprawa;
                                tablica1[i][5]=item1.DataMechanik[i].uslugi;
                                tablica1[i][6]=item1.DataMechanik[i].ubezpieczenie;
                                tablica1[i][7]=item1.DataMechanik[i].danemechanika;
                                tablica1[i][8]=item1.DataMechanik[i].kwota;
                            }
                            catch(error)
                            {
                                tablica1[i][0]=""
                                tablica1[i][1]=""
                                tablica1[i][2]=""
                                tablica1[i][3]=""
                                tablica1[i][4]=""
                                tablica1[i][5]=""
                                tablica1[i][6]=""
                                tablica1[i][7]=""
                                tablica1[i][8]=""
                            }
                        }
                       
                            var result1 = "<table border=1>";
                            result1 += "<tr>";
                            result1 += "<th style='width: 1%'>ID</th>";
                            result1 += "<th style='width: 2%'>Data Uslugi</th>";
                            result1 += "<th style='width: 3%'>Dane Klienta</th>";
                            result1 += "<th style='width: 5%'>Tuning</th>";
                            result1 += "<th style='width: 3%'>Naprawa</th>";
                            result1 += "<th style='width: 1%'>Usługi</th>";
                            result1 += "<th style='width: 3%'>Ubezpieczenie</th>";
                            result1 += "<th style='width: 3%'>Dane Mechanika</th>";
                            result1 += "<th style='width: 3%'>Kwota</th>";
                            result1 += "</tr>";
                            
                
                            for(var i=0; i<tablica1.length;i++)
                            {
                             
                                result1 += "<tr>";
                                for(var j=0; j<9; j++)
                                {
                                    result1 += "<td>"+tablica1[i][j]+"</td>";
                                }
                                result1 += "</tr>";
                           
                            } 
                            result1 += "</table>";
                            document.getElementById("countmech").innerHTML = dlugosc1;
                            document.getElementById("tabelawyszukiwanie").innerHTML = result1;
                
                            }})

 window.addEventListener('message', function(event) {
        var item4 = event.data;

    if (item4.type === "SearchLastMechClient")
    {

        var dlugosc4=event.data.DataBaseLastMech.length;
        var tablica4 =[];

        for(var i = 0; i< dlugosc4; i++)
        {
            tablica4[i]=[]
        }
            for(var i = 0; i < dlugosc4; i++)
            {
                try{
                    tablica4[i][0]=item4.DataBaseLastMech[i].ID;    
                    tablica4[i][1]=item4.DataBaseLastMech[i].data;
                    tablica4[i][2]=item4.DataBaseLastMech[i].daneklienta;
                    tablica4[i][3]=item4.DataBaseLastMech[i].tuning;
                    tablica4[i][4]=item4.DataBaseLastMech[i].naprawa;
                    tablica4[i][5]=item4.DataBaseLastMech[i].uslugi;
                    tablica4[i][6]=item4.DataBaseLastMech[i].ubezpieczenie;
                    tablica4[i][7]=item4.DataBaseLastMech[i].danemechanika;
                    tablica4[i][8]=item4.DataBaseLastMech[i].kwota;
                }
                catch(error)
                {
                    tablica4[i][0]=""
                    tablica4[i][1]=""
                    tablica4[i][2]=""
                    tablica4[i][3]=""
                    tablica4[i][4]=""
                    tablica4[i][5]=""
                    tablica4[i][6]=""
                    tablica4[i][7]=""
                    tablica4[i][8]=""
                }
            }

            var result4 = "<table border=1>";
            result4 += "<tr>";
            result4 += "<th style='width: 1%'>ID</th>";
            result4 += "<th style='width: 2%'>Data Uslugi</th>";
            result4 += "<th style='width: 3%'>Dane Klienta</th>";
            result4 += "<th style='width: 5%'>Tuning</th>";
            result4 += "<th style='width: 3%'>Naprawa</th>";
            result4 += "<th style='width: 1%'>Usługi</th>";
            result4 += "<th style='width: 3%'>Ubezpieczenie</th>";
            result4 += "<th style='width: 3%'>Dane Mechanika</th>";
            result4 += "<th style='width: 3%'>Kwota</th>";
            result4 += "</tr>";
                

                for(var i=0; i<tablica4.length;i++)
                {
                 
                    result4 += "<tr>";
                    for(var j=0; j<9; j++)
                    {
                        result4 += "<td>"+tablica4[i][j]+"</td>";
                    }
                    result4 += "</tr>";
               
                } 
                result4 += "</table>";

                document.getElementById("menutablelastnaprawa").innerHTML = result4;}
            
        })

// STATYSTYKI
$("#statsbuttonmech").click(function(){
    $.post('http://mechaniktablet/StatsMech1', JSON.stringify({}));
    $.post('http://mechaniktablet/StatsMech2', JSON.stringify({}));
    $.post('http://mechaniktablet/StatsMech3', JSON.stringify({}));
    return;
})


window.addEventListener('message', function(event) {
    var item6 = event.data;
    if(item6.type === "Stats1m"){
        
        var dlugosc4=event.data.Stats1m.length;
        var tablica5 =[];
        var suma1 = 0

        for(var i=0; i<dlugosc4; i++){
            suma1+=item6.Stats1m[i].ilosc
        }
        for(var i = 0; i< dlugosc4; i++)
        {
            tablica5[i]=[]
        }
            for(var i = 0; i < dlugosc4; i++)
            {
    
                try{
                    tablica5[i][0]=item6.Stats1m[i].naprawa;    
                    tablica5[i][1]=item6.Stats1m[i].ilosc;
                    tablica5[i][2]=((((item6.Stats1m[i].ilosc)/suma1)*100)).toFixed(2)+"%";
                }
                catch(error)
                {
                    tablica5[i][0]=""
                    tablica5[i][1]=""
                    tablica5[i][2]=""
                }
            }
    
    
        var result3 = "<table border=1>";
        result3 += "<tr>";
        result3 += "<th style='width: 1%'>Rodzaj Naprawy</th>";
        result3 += "<th style='width: 2%'>Ilość wpisów</th>";
        result3 += "<th style='width: 3%'>Udział</th>";
        result3 += "</tr>";
    
                    for(var i=0; i<tablica5.length;i++)
                    {
                     
                        result3 += "<tr>";
                        for(var j=0; j<3; j++)
                        {
                            result3 += "<td>"+tablica5[i][j]+"</td>";
                        }
                        result3 += "</tr>";
                   
                    } 
                    result3 += "</table>";
                    document.getElementById("statystyki1").innerHTML = result3;
    }


   })
            window.addEventListener('message', function(event) {
                var item6 = event.data;
                if(item6.type === "Stats2m"){
                    
                    var dlugosc4=event.data.Stats2m.length;
                    var tablica5 =[];
                    var suma1 = 0
        
                    for(var i=0; i<dlugosc4; i++){
                        suma1+=item6.Stats2m[i].ilosc
                    }
                    for(var i = 0; i< dlugosc4; i++)
                    {
                        tablica5[i]=[]
                    }
                        for(var i = 0; i < dlugosc4; i++)
                        {
                
                            try{
                                tablica5[i][0]=item6.Stats2m[i].danemechanika;    
                                tablica5[i][1]=item6.Stats2m[i].ilosc;
                                tablica5[i][2]=((((item6.Stats2m[i].ilosc)/suma1)*100)).toFixed(2)+"%";
                            }
                            catch(error)
                            {
                                tablica5[i][0]=""
                                tablica5[i][1]=""
                                tablica5[i][2]=""
                            }
                        }
                
                
                    var result3 = "<table border=1>";
                    result3 += "<tr>";
                    result3 += "<th style='width: 1%'>Dane Mechanika</th>";
                    result3 += "<th style='width: 2%'>Ilość wpisów</th>";
                    result3 += "<th style='width: 3%'>Udział</th>";
                    result3 += "</tr>";
                
                                for(var i=0; i<tablica5.length;i++)
                                {
                                 
                                    result3 += "<tr>";
                                    for(var j=0; j<3; j++)
                                    {
                                        result3 += "<td>"+tablica5[i][j]+"</td>";
                                    }
                                    result3 += "</tr>";
                               
                                } 
                                result3 += "</table>";
                                document.getElementById("statystyki2").innerHTML = result3;
                }
        
        
               })
        
            window.addEventListener('message', function(event) {
                var item10 = event.data;
                if(item10.type === "Stats3m"){
                    
                    var dlugosc10=event.data.Stats3m.length;
                    var tablica10 =[];
                    var suma10 = 0
        
                    for(var i=0; i<dlugosc10; i++){
                        suma10+=item10.Stats3m[i].ilosc
                    }
                    for(var i = 0; i< 20; i++)
                    {
                        tablica10[i]=[]
                    }
             
                        for(var i = 0; i < 20; i++)
                        {
                
                            try{
                                tablica10[i][0]=item10.Stats3m[i].daneklienta;    
                                tablica10[i][1]=item10.Stats3m[i].ilosc;
                                tablica10[i][2]=((((item10.Stats3m[i].ilosc)/suma10)*100)).toFixed(2)+"%";
                            }
                            catch(error)
                            {
                                tablica10[i][0]=""
                                tablica10[i][1]=""
                                tablica10[i][2]=""
                            }
                        }
                
                
                    var result10 = "<table border=1>";
                    result10 += "<tr>";
                    result10 += "<th style='width: 1%'>Dane Klienta</th>";
                    result10 += "<th style='width: 2%'>Ilość wpisów</th>";
                    result10 += "<th style='width: 3%'>Udział</th>";
                    result10 += "</tr>";
                
                                for(var i=0; i<tablica10.length;i++)
                                {
                                 
                                    result10 += "<tr>";
                                    for(var j=0; j<3; j++)
                                    {
                                        result10 += "<td>"+tablica10[i][j]+"</td>";
                                    }
                                    result10 += "</tr>";
                               
                                } 
                                result10 += "</table>";
                                document.getElementById("statystyki3").innerHTML = result10;
                }
        
        
               })
})