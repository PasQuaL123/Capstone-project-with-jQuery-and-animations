$(document).ready(function(){

	$('#home_img').hide().one("load",function(){
    $(this).fadeIn(800).fadeOut(200).fadeIn(800);
		}).each(function(){
    	if(this.complete) $(this).trigger("load");
	});

	$(window).load(function(){
    	$("h1").hide();
    	$("h1").fadeIn(1000);

  
    	var d = 150, factor = d / 3 * 2; // increment delay by two thirds original delay
		$("#navright ul li").each(function(){
    	$(this).delay(d = d + factor).animate({marginLeft:'215px'},500).effect("shake");
		})

		$("#PriceAlert").effect("slide").effect("pulsate");

   });

	$("#frontimg").click(function(){

		$("#frontimg").effect("bounce").effect("shake");

	});

	$("#clickhere").click(function(){
		$("#dubai_special_pg").hide("slow");
	});

	$("#dubai_burj, #dubai_palm, #dubai_mall").click(function(){
		$(this).effect("highlight");
	});



}); //end ready



function ChangeImg(){ //this function changes image on the home screen
	var iNum = 1 + Math.floor(Math.random() * 3); //random between 1 and 3
	var sSrc = "Res\\Images\\dubai"+iNum.toString()+".jpg";
	document.getElementById("frontimg").src=sSrc;
}

setInterval(ChangeImg, 5000); //5 seconds

//object to store package information
function TypeOfPackage(Package_Name, Included_Cities, Num_Days, Num_Ppl, Price){
	this.Package_Name=Package_Name;
	this.Included_Cities=Included_Cities;
	this.Num_Days=Num_Days;
	this.Num_Ppl=Num_Ppl;
	this.Price=Price;
}


if (JSON.parse(localStorage.getItem("obj_data")) === null){
	var arrItemsInCart = [];
	localStorage.setItem("obj_data", JSON.stringify(arrItemsInCart));
}

if (localStorage.getItem("num_data")===null){
	var iNumItemsInCart = 0;
	localStorage.setItem("num_data", 0);
} 

var arrItemsInCart = JSON.parse(localStorage.getItem("obj_data"));
var iNumItemsInCart = localStorage.getItem("num_data");

function AddToCart(Btn_ID){

	$("#"+Btn_ID).effect("explode");
	$("#"+Btn_ID).promise().done(function(){
		switch(Btn_ID)
	{
		case "btnusa" : {
			var iNum = parseInt(prompt("How many people would you like to book for?"));
			arrItemsInCart[iNumItemsInCart] = new TypeOfPackage("USA Package", "New York, Las Vegas, California", 9, iNum, 20000);
			iNumItemsInCart++;
			localStorage.setItem("obj_data", JSON.stringify(arrItemsInCart));
			localStorage.setItem("num_data", iNumItemsInCart);
		} break; 

		case "btncanada" : {
			var iNum = parseInt(prompt("How many people would you like to book for?"));
			arrItemsInCart[iNumItemsInCart] = new TypeOfPackage("Canada Package", "Nova Scotia, Torronto, Vancouver", 9, iNum, 15999);
			iNumItemsInCart++;
			localStorage.setItem("obj_data", JSON.stringify(arrItemsInCart));
			localStorage.setItem("num_data", iNumItemsInCart);
		} break;

		case "btntanzania" : {
			var iNum = parseInt(prompt("How many people would you like to book for?"));
			arrItemsInCart[iNumItemsInCart] = new TypeOfPackage("Tanzania Package", "Dar es Salaam, Mwenza, Zanzibar City", 9, iNum, 6000);
			iNumItemsInCart++;
			localStorage.setItem("obj_data", JSON.stringify(arrItemsInCart));
			localStorage.setItem("num_data", iNumItemsInCart);
		} break;

		case "btnengland" : {
			var iNum = parseInt(prompt("How many people would you like to book for?"));
			arrItemsInCart[iNumItemsInCart] = new TypeOfPackage("England Package", "London, Manchester, Liverpool", iNum, 9, 8000);
			iNumItemsInCart++;
			localStorage.setItem("obj_data", JSON.stringify(arrItemsInCart));
			localStorage.setItem("num_data", iNumItemsInCart);
		} break;

		case "btngermany" : {
			var iNum = parseInt(prompt("How many people would you like to book for?"));
			arrItemsInCart[iNumItemsInCart] = new TypeOfPackage("Germany Package", "Berlin, Munich, Hamburg, Frankfurt, Stuttgart", 19, iNum, 32999);
			iNumItemsInCart++;
			localStorage.setItem("obj_data", JSON.stringify(arrItemsInCart));
			localStorage.setItem("num_data", iNumItemsInCart);
		} break;

		case "btndubai" : {
			var iNum = parseInt(prompt("How many people would you like to book for?"));
			arrItemsInCart[iNumItemsInCart] = new TypeOfPackage("Dubai Package", "Dubai", 7, iNum, 9999);
			iNumItemsInCart++;
			localStorage.setItem("obj_data", JSON.stringify(arrItemsInCart));
			localStorage.setItem("num_data", iNumItemsInCart);
		} break;

	} //end swithc

	QuickPrice();
	});

	

}// end

function QuickPrice(){
	var iLength = arrItemsInCart.length;
	var dPrice = 0;

	for (var iLoop = 0; iLoop < iLength; iLoop++){
		dPrice += arrItemsInCart[iLoop].Num_Ppl * arrItemsInCart[iLoop].Price;
	}

	alert("Cart Total is: ZAR " + dPrice + " Excl. VAT. VAT is added on checkout")
}

function ShowItems(){
	var sText = "";
	var dPrice = 0;
	for (var iLoop = 0; iLoop < iNumItemsInCart; iLoop++){
		sText += "Package: " + (iLoop+1) + "<br />";
		sText += "Package Name: " + arrItemsInCart[iLoop].Package_Name + "<br />" ; 
		sText += "Included Cities: " + arrItemsInCart[iLoop].Included_Cities + "<br />";
		sText += "Duration of Trip " + arrItemsInCart[iLoop].Num_Days + " days" + "<br />";
		sText += "Number Of Travellers: " + arrItemsInCart[iLoop].Num_Ppl + "<br />" ;
		sText += "Price Excl VAT: ZAR " + (arrItemsInCart[iLoop].Price * arrItemsInCart[iLoop].Num_Ppl) + "<br />";
		dPrice += (arrItemsInCart[iLoop].Price * arrItemsInCart[iLoop].Num_Ppl);
		sText += "** End Of Package **" + "<br />" ;
	}

	document.getElementById("items_in_cart").innerHTML=sText;
	dPrice = (dPrice + (dPrice * 0.15)).toFixed(2);
	dPrice_Global = dPrice;
	document.getElementById("PriceAlert").innerHTML="Price Including VAT: ZAR " + dPrice;

} //end func

function ClearCart(){

	$("#delete").effect("shake");
	$("#delete").promise().done(function(){

		if (confirm("Do You Want To Clear The Cart?")){
		var arrItemsInCart = [];
		localStorage.setItem("obj_data", JSON.stringify(arrItemsInCart));
		var iNumItemsInCart = 0;
		localStorage.setItem("num_data", 0);
		alert("Successfull!")
		} else {
		alert("Cart Was Not Cleared")
		}

		location.reload();

	});

	

} //end func

var dPrice_Global = 0;

function Coupons(){
	if (document.getElementById("code").value === "opening-special-5")
	{
		var dNewPrice = 0;
		dNewPrice = (dPrice_Global - (dPrice_Global * 0.05)).toFixed(2);
		document.getElementById("alertcoupon").innerHTML="Coupon Successfull, New Price: " + dNewPrice;
	} else {
		document.getElementById("alertcoupon").innerHTML = "Invalid Coupon!"
	}
}//end

function DeleteStorage(){
	localStorage.clear();
}

function GenOrderID(){

	if (iNumItemsInCart == 0){
		alert("There Is Nothing In Your Cart!");
	} else {

		$("#done").animate({
			height: 500,
			width: 500
		}).effect("puff");
		$("#done").promise().done(function(){
			alert("An Email Will Be Sent To You Shortly, Use Reference: 2018-" + Math.floor(Math.random() * 1000));
			ClearCart();
		});

		
	}



}

//dsdskl

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if click outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//here
var bFirstNumber = true;
var sEq1 = "";
var sEq2 = "";
var cSymbol = "";
var dResult = 0.00;

function GenEquation(num_clicked){

	if (bFirstNumber == true) //before the symbol
	{
		switch(num_clicked){
		case "0_button" : sEq1 += "0";
		break;

		case "1_button" : sEq1 += "1";
		break;

		case "2_button" : sEq1 += "2";
		break;

		case "3_button" : sEq1 += "3";
		break;

		case "4_button" : sEq1 += "4";
		break;

		case "5_button" : sEq1 += "5";
		break;

		case "6_button" : sEq1 += "6";
		break;

		case "7_button" : sEq1 += "7";
		break;

		case "8_button" : sEq1 += "8";
		break;

		case "9_button" : sEq1 += "9";
		break;
	} //end switch
	} else { //after symbol
		switch(num_clicked){
		case "0_button" : sEq2 += "0";
		break;

		case "1_button" : sEq2 += "1";
		break;

		case "2_button" : sEq2 += "2";
		break;

		case "3_button" : sEq2 += "3";
		break;

		case "4_button" : sEq2 += "4";
		break;

		case "5_button" : sEq2 += "5";
		break;

		case "6_button" : sEq2 += "6";
		break;

		case "7_button" : sEq2 += "7";
		break;

		case "8_button" : sEq2 += "8";
		break;

		case "9_button" : sEq2 += "9";
		break;
	} //end switch
	}
	
	document.getElementById("line_1_display").innerHTML=sEq1 + " " + cSymbol + " " + sEq2;
	//first line used to display the equation before equating

} //end func

function GenSymbol(num_clicked){ //get the symbol
	//calculator only operates 1 function at a time!
	cSymbol = "";

	switch(num_clicked){
		case "times_button" : cSymbol = "*";
		break; 

		case "minus_button" : cSymbol = "-";
		break;

		case "add_button" : cSymbol = "+";
		break;

		case "div_button" : cSymbol = "/";
		break;
	}

	document.getElementById("line_1_display").innerHTML=sEq1 + " " + cSymbol + " " + sEq2;
	//dynamic display of the equation real time
	bFirstNumber = false;
}

function DoThings(num_clicked){  //clear the calc or equate the answer

	if (num_clicked == "clr_button") //reset the calc
	{
		sEq1 = "";
		sEq2 = "";
		cSymbol = "";
		document.getElementById("line_1_display").innerHTML="Cleared!";
		document.getElementById("line_2_display").innerHTML="Cleared!";
		bFirstNumber = true;
		dResult = 0.00;
	} else {

		switch (cSymbol){ //parsefloat to convert string to double/float

			case "+" : dResult = (parseFloat(sEq1)) + (parseFloat(sEq2));
			break;

			case "-" : dResult = (parseFloat(sEq1)) - (parseFloat(sEq2));
			break;

			case "*" : dResult = (parseFloat(sEq1)) * (parseFloat(sEq2));
			break;

			case "/" : dResult = (parseFloat(sEq1)) / (parseFloat(sEq2));
			break;

		} //end switch

			document.getElementById("line_2_display").innerHTML=dResult; //display result

		
	} //end ifelse

} //end do things
