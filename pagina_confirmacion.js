//pagina_confirmacion.js


function getParameterByName(name) {
    	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        	results = regex.exec(location.search);
    	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  	}
function parNull(dato){
		if(dato==null || dato.localeCompare("null")==0){
			return "----"
		}else{
			return dato;
		}
	}


var setCardByid = function(arr){
	var a = arr["creditCard"];
		$("#NUMBER_CARD").text($("#NUMBER_CARD").text()+a.number);
		$("SEC_COD").text($("#SEC_COD").text()+a.securityCode);
		$("#VEN_DATE").text($("#VEN_DATE").text()+a.expirationDate);
}	

var setAddrByid= function(arr){
	var a = arr["address"];
	$("#PROV").text($("#PROV").text()+parNull(a.province));
	$("#PHONE").text($("#PHONE").text()+parNull(a.phoneNumber));
	$("#STREET").text($("#STREET").text()+parNull(a.street));
	$("#NUMBER").text($("#NUMBER").text()+parNull(a.number));
	$("#ZIPCOD").text($("#ZIPCOD").text()+parNull(a.zipCode));
	$("#FLOOR").text($("#FLOOR").text()+parNull(a.floor));
	$("#GATE").text($("#GATE").text()+parNull(a.gate));

}

var setData = function(arr){
	var a = arr["account"];
	$("#FNAME").text($("#FNAME").text()+a.firstName);
	$("#LNAME").text($("#LNAME").text()+a.lastName);
	$("#DNI").text($("#DNI").text()+a.identityCard);
}	

var getOrder = function(arr){
	var order = arr["order"];
	var items = order.items;
	$("#CART_AMOUNT_PRODS").text("Cantidad de articulos: "+localStorage.getItem("item_count"));
	//$("#TOTAL_PRICE").text($("#TOTAL_PRICE").text()+localStorage.getItem("total_price"));

	setAddr();

	setCard();

	setAccountData();

	putItems(items);
}

function setAddr(){
	//url="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=GetCreditCardById&username="+username+"&authentication_token="+token+"&id="+cardID;
	//APIAction(url,setCardByid);
	//username = get_cookie("username");
	var token = get_cookie("authenticationToken"); //Guardar en cookie? 	
	var username = get_cookie("username");
	var address = localStorage.getItem("address"+username);
	var obj_addr = JSON.parse(address);
	$("#PROV").text($("#PROV").text()+parNull(obj_addr.province));
	$("#PHONE").text($("#PHONE").text()+parNull(obj_addr.phoneNumber));
	$("#STREET").text($("#STREET").text()+parNull(obj_addr.street));
	$("#NUMBER").text($("#NUMBER").text()+parNull(obj_addr.number));
	$("#ZIPCOD").text($("#ZIPCOD").text()+parNull(obj_addr.zipCode));
	$("#FLOOR").text($("#FLOOR").text()+parNull(obj_addr.floor));
	$("#GATE").text($("#GATE").text()+parNull(obj_addr.gate));
}

function setCard(){
	//url="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=GetAddressById&username="+username+"&authentication_token="+token+"&id="+addrID;
	//APIAction(url,setAddrByid);
	var username = get_cookie("username");
	//var username = localStorage.getItem("username");
	var creditCard = localStorage.getItem("creditCard"+username);
	var obj_card = JSON.parse(creditCard);
	
	if (!(obj_card == null)){		
		$("#NUMBER_CARD").text($("#NUMBER_CARD").text()+obj_card.number);
		$("SEC_COD").text($("#SEC_COD").text()+obj_card.securityCode);
		$("#VEN_DATE").text($("#VEN_DATE").text()+obj_card.expirationDate);
	}else{
		$("#TITLE_CARD_DATA").find('h5').text("Contrareembolso");
		$("#CARD_DATA").remove();

	}
}

function setAccountData(){

	url="http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=GetAccount&username="+get_cookie('username')+"&authentication_token="+get_cookie("authenticationToken");
	APIAction(url,setData);
}

function putItems(items){
	var i;
	for(i=0; i<items.length;i++){
		var aux = getObjHTMLContainer(items[i]);
		$("#collapsePurchaseDetail").append(aux);
	}
}





function getObjHTMLContainer(obj)
{	
	var index = obj.product.id;
	var img;
	var name = obj.product.name;
	var count = obj.quantity;
	var price = obj.price;
	try {
		img = obj.product.imageUrl;
	} catch(err){
		try {
			img = obj.product.imageUrl[0];
		} catch(err2){
			img = "img/img_not_available.png";
		}
	}

	var talle = parNull(localStorage.getItem("talle"+index));
	var color = parNull(localStorage.getItem("color"+index));

	var elArrrrrte = $('<!-- Cart Element -->'+
					'<div id="cart_listing_' + index + '">' +
					'<div class="row row-eq-height">'+
						'<!-- Number -->'+
						'<div class="col-xs-2 verticalLine centered">'+
							'<h4>' + index + '</h4>'+
						'</div>'+
						'<!-- End Number -->'+
						'<!-- Product Details -->'+
						'<div class="col-xs-7 verticalLine">'+
							'<div class="row">'+
								'<div class="col-xs-3">'+
									 '<img src="' + img + '" alt="Buzo Gris" class="cartImg">'+
								'</div>'+
								'<div class="col-xs-6 centered">'+
									'<ul class="noBullets">'+
										'<li class="page-subtitle"><strong>' + name + '</strong></li>'+
									'</ul>'+
								'</div>'+
								'<div class="col-xs-3 pad-disabled">'+
									'<div class="row spaced">'+
										'<div class="col-xs-6 ">'+
											'<p>Talle: '+talle+'</p>'+
										'</div>'+
									'</div>'+
									'<div class="row spaced">'+
										'<div class="col-xs-6">'+
											'<p>Color: '+color+'</p>'+
										'</div>	'+
									'</div>'+
									'<div class="row spaced">'+
										'<div class="col-xs-6">	'+
											'<p>Cantidad: '+count+'</p>'+
										'</div>	'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<!-- End Product Details -->'+
						'<!-- Price -->'+
						'<div class="col-xs-3 verticalLine centered">'+
							'<ul class="noBullets">'+
								'<li>Unitario: $' + price + '</li>'+
								'<li class="page-subtitle"> <strong>Subtotal: $' + price*count + '</strong> </li>'+
							'</ul>'+
						'</div>'+
						'<!-- End Price -->'+
					'</div>'+
					'<hr class="hr_horizontal">'+
					'</div>' +
					'<!-- End Cart Element -->'+
					'<!-- Cart Element -->');

	return elArrrrrte;
}

function confirmateOrder(){
	CartCopyLastOrder(viewConfirmation);
}


function viewConfirmation(arr){
	getLastOrderId(confirmar);
	
}

function vc(arr){
	//window.location='profile.html';
}

function confirmar(orID){
	var token = get_cookie("authenticationToken"); //Guardar en cookie? 	
	var username = get_cookie("username");

	var address = localStorage.getItem("addr_id"+username);
	var creditCard = localStorage.getItem("cart_id"+username);

	var filters = JSON.stringify({"id":orID,"address": address,"creditCard": creditCard});
	var url = 'http://eiffel.itba.edu.ar/hci/service3/Order.groovy?method=ConfirmOrder&username='+username+'&authentication_token='+token+'&order=' + filters;
	APIAction(url,vc);
}

function convertMonth(month){
		switch(month){
			case "Enero":
				return 0;
			case "Febrero":
				return 1;
			case "Marzo":
				return 2;
			case "Abril":
				return 3;
			case "Mayo":
				return 4;
			case "Junio":
				return 5;
			case "Julio":
				return 6;
			case "Agosto":
				return 7;
			case "Septiembre":
				return 8;
			case "Octubre":
				return 9;
			case "Noviembre":
				return 10;
			case "Diciembre":
				return 11;			
		}
	}













