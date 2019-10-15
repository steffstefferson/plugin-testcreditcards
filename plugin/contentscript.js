var initPluginScript = function() {
  console.log("initPluginScript for " + document.URL);

  var cvc = document.getElementById("payment-cardholdername-container");

  var myButton = document.getElementById("visaButton");
  if (myButton || !cvc) {
    return;
  }
  /* eurocard is mastercard */
  var brand = document
    .getElementById("hdn_CreditCardInputModel_Brand")
    .value.toLowerCase();
  brand = brand == "eurocard" ? "mastercard" : brand;

  var testCreditCards = [
      { 
		type: "visa", 
		number: "4111113333333333", 
		cvc: "123", 
		valid: false,
		title : 'invalid',
	  desc : 'invalid credit card, payment will fail'
	},
    {
      type: "visa",
      number: "4000000000000002",
      cvc: "123",
      valid: true,
	  title : '/w 3DS V1',
	  desc : 'valid card with 3D secure'
    },
    {
      type: "visa",
      number: "4111111111111111",
      cvc: "123",
      valid: true,
	  title : '/wo 3DS V1',
	  desc : 'valid card without 3D secure'
    },
	{ 
		type: "visa", 
		number: "4186455175836497", 
		cvc: "123", 
      valid: true,
	  title : '/wo 3DS V2',
	  desc : 'valid card with 3D secure V2 frictionless, no 3DS screen'
	},
	{ 
		type: "visa", 
		number: "4874970686672022", 
		cvc: "123", 
      valid: true,
	  title : '/w 3DS V2',
	  desc : 'valid card with 3D secure V2 with ACS Challenge Simulator'
	},
    {
      type: "mastercard",
      number: "5300000000000006",
      cvc: "123",
      valid: true,
	  title : '/w 3DS V1',
	  desc : 'valid card with 3D secure'
    },
    {
      type: "mastercard",
      number: "5399999999999999",
      cvc: "123",
      valid: true,
	  title : '/wo 3DS V1',
	  desc : 'valid card without 3D secure'
    },
	{ 
		type: "mastercard", 
		number: "5137009801943438", 
		cvc: "123", 
      valid: true,
	  title : '/wo 3DS V2',
	  desc : 'valid card with 3D secure V2 frictionless, no 3DS screen'
	},
	{ 
		type: "mastercard", 
		number: "5130257474533310", 
		cvc: "123", 
      valid: true,
	  title : '/w 3DS V2',
	  desc : 'valid card with 3D secure V2 with ACS Challenge Simulator'
	},
    {
      type: "american express",
      number: "371449635311004",
      cvc: "1234",
      valid: true,
	  title : '/wo 3DS V1',
	  desc : 'valid card without 3D secure'
    },
    {
      type: "american express",
      number: "374111111111111",
      cvc: "1234",
      valid: true,
	  title : '/wo 3DS V1',
	  desc : 'valid card without 3D secure'
    },
	{ 
		type: "american express", 
		number: "375418081197346", 
		cvc: "123", 
      valid: true,
	  title : '/wo 3DS V2',
	  desc : 'valid card with 3D secure V2 frictionless, no 3DS screen'
	},
	{ 
		type: "american express", 
		number: "379764422997381", 
		cvc: "123", 
      valid: true,
	  title : '/w 3DS V2',
	  desc : 'valid card with 3D secure V2 with ACS Challenge Simulator'
	}
  ];

  function createButton(container, card) {
   
   var color = card.valid ? '#6ecc6e' : '#eb5b56';
    var newButton = document.createElement("input");
    newButton.value = card.title;
	newButton.type = 'button';
	newButton.title = card.desc;
    newButton.id = "button" + card.number;
    newButton.style =
      "float:right;border:2px solid black;border-radius:4px;margin:3px;cursor:pointer;font-size: 11px;color: black;padding:3px;background-color:" +
      color;
    newButton.onclick = function() {
      fillCard(card);
    };
    container.appendChild(newButton);
  }

  var cards = testCreditCards.filter(x => x.type == brand);

  var div = document.createElement("div");
  div.style = "font-size: smaller;padding-bottom: 70px;";
  div.classList.add("payment-info");
  
  cards.map(c => createButton(div,c));

  cvc.parentElement.insertBefore(div, cvc);

  clearInterval(intervalId);
};

var fillCard = function(c) {
  var type = c.type[0].toUpperCase() + c.type.substring(1);
  document.getElementById("payment-cardnumber").value = c.number;
  document.getElementById("payment-cardholdername").value = "Plugin " + type;
  document.getElementById("payment-cvc").value = c.cvc;
  //mask can have a dropdown or an input field for expiry date
  var yeardd = document.getElementById("payment-expirydate-year");
  yeardd.selectedIndex = 4;
  yeardd.value = new Date().getFullYear()+1;
  var monthdd = document.getElementById("payment-expirydate-month");
  monthdd.selectedIndex = 2;
  monthdd.value = new Date().getMonth()+1;
};

var intervalId = setInterval(initPluginScript, 200);
