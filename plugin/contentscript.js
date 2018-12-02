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
      number: "4000000000000002",
      cvc: "123",
      valid: true,
      has3dSecure: true
    },
    {
      type: "visa",
      number: "4111111111111111",
      cvc: "123",
      valid: true,
      has3dSecure: false
    },
    { type: "visa", number: "4111113333333333", cvc: "123", valid: false },
    {
      type: "mastercard",
      number: "5300000000000006",
      cvc: "123",
      valid: true,
      has3dSecure: true
    },
    {
      type: "mastercard",
      number: "5399999999999999",
      cvc: "123",
      valid: true,
      has3dSecure: false
    },
    {
      type: "american express",
      number: "371449635311004",
      cvc: "1234",
      valid: true,
      has3dSecure: true
    },
    {
      type: "american express",
      number: "374111111111111",
      cvc: "1234",
      valid: true,
      has3dSecure: false
    }
  ];

  function createButton(container, name, color, card) {
    if (card == null || card.length <= 0) {
      return;
    }
    card = card[0];
    var newButton = document.createElement("div");
    newButton.innerHTML = name;
    newButton.id = "button" + card.number;
    newButton.style =
      "float:right;border:2px solid black;border-radius:4px;cursor:pointer;padding:3px;background-color:" +
      color +
      ";margin:0px 3px";
    newButton.onclick = function() {
      fillCard(card);
    };
    container.appendChild(newButton);
  }

  var cards = testCreditCards.filter(x => x.type == brand);

  var div = document.createElement("div");
  div.style = "font-size: smaller;padding-bottom: 40px;";
  div.classList.add("payment-info");

  createButton(div, "invalid card", "f54a4a", cards.filter(x => !x.valid));
  createButton(
    div,
    "valid card",
    "#67ce67",
    cards.filter(x => !x.has3dSecure && x.valid)
  );
  createButton(
    div,
    "valid card /w 3ds",
    "#28ab28",
    cards.filter(x => x.has3dSecure && x.valid)
  );

  cvc.parentElement.insertBefore(div, cvc);

  clearInterval(intervalId);
};

var fillCard = function(c) {
  var type = c.type[0].toUpperCase() + c.type.substring(1);
  document.getElementById("payment-cardnumber").value = c.number;
  document.getElementById("payment-cardholdername").value = "Plugin " + type;
  document.getElementById("payment-cvc").value = c.cvc;
  document.getElementById("payment-expirydate-year").selectedIndex = 4;
  document.getElementById("payment-expirydate-month").selectedIndex = 2;
};

var intervalId = setInterval(initPluginScript, 200);
