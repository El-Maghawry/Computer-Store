// getElements
const barrowButton = document.getElementById("barrow")
const paybackButton = document.getElementById("payback")
const incomeLabel = document.getElementById("earned")
const balanceLabel = document.getElementById("balance")
const debtLabel = document.getElementById("debt")
const computersDropdown = document.getElementById("computers");
const specsText = document.getElementById("specs");
const titleComputer = document.getElementById("title");
const descriptionComputer = document.getElementById("info");
const priceComputer = document.getElementById("price");
const buyButton = document.getElementById("buy");
let imageProduct = document.getElementById("image");
const purchaseList = document.getElementById("purchased");

let income = 0.0;
let balance = 0.0;
let debt = 0.0;
let price = 0.0;


// imageProduct.src = "https://noroff-komputer-store-api.herokuapp.com/assets/images/1.png";

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computersData => addComputersToList(computersData))
    .catch(function (err) {
        console.log(err);
    })

const addComputersToList = (computersData) => {
    computersData.forEach(x => addComputerToList(x));
    specsText.innerText = computersData[0].specs;
    titleComputer.innerText = computersData[0].title;
    descriptionComputer.innerText = computersData[0].description;
    priceComputer.innerText = computersData[0].price;
    price = computersData[0].price;
    imageProduct.src = "https://noroff-komputer-store-api.herokuapp.com/" + computersData[0].image;
}

//appending to dropdownmenu
const addComputerToList = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersDropdown.appendChild(computerElement);
}

//Show computer info from dropdown
const handleListChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    specsText.innerText = selectedComputer.specs;
    titleComputer.innerText = selectedComputer.title;
    descriptionComputer.innerText = selectedComputer.description;
    priceComputer.innerText = selectedComputer.price;
    imageProduct.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image;
    imageProduct.alt = selectedComputer.title;
}

//default
incomeLabel.innerText = "€ 0";
balanceLabel.innerText = "€ 0";
paybackButton.style.visibility = "hidden";

//Income area
function WorkandEarn() {
    let hoursWorked = prompt(`
    How many hours have you worked?
    • You earn € 100 for every hour. 
    `);
    income += parseInt(hoursWorked) * 100;
    incomeLabel.innerText = `€ ${income}`;
}

function transferEarningsToBank() {

    if (debt !== 0.0 && debt !== null && debt !== 0 && !isNaN(debt)) {

        if (income * 0.1 <= debt) {
            debt -= income * 0.1
            balance += income * 0.9
            balanceLabel.innerText = `€ ${balance}`;
            debtLabel.innerText = `Debt: € ${debt}`;
            console.log(`You still have a debt of € ${debt}`)
        } else {
            income -= debt;
            debt = 0.0;
            balance += income;
            balanceLabel.innerText = `€ ${balance}`;
            debtLabel.innerText = "";
            console.log("debt has been payed off")

        }


    } else {
        balance += income;
        balanceLabel.innerText = `€ ${balance}`;
    }

    income = 0.0;
    incomeLabel.innerText = `€ ${income}`;
}

// Bank Area
function barrowMoney() {
    console.log(debt)

    if (debt === 0.0 || debt === null || debt === 0 || isNaN(debt)) {

        debt = parseFloat(prompt(`
    How much money would you like to barrow?
    --------------------------------------------------
    • You cannot barrow more than double your balance.
    • Every money transfer takes 10% to pay off your loan.
    • You will not rent over the money owed. 
    `))
        if (debt <= balance * 2 && debt !== 0 && !isNaN(debt)) {
            balance += parseFloat(debt);
            debtLabel.innerText = `Debt: € ${debt}`;
            balanceLabel.innerText = `€ ${balance - 1}`;
            paybackButton.style.visibility = "visible";

        } else if (debt === 0.0 || debt === null || debt === 0 || debt === NaN) {
            debtLabel.innerText = "";
            alert("Canceled")
            debt === 0.0;
            paybackButton.style.visibility = "hidden";

        } else if (debt > balance * 2) {
            debt === 0.0;

        } else {
            alert("You previous loan has not been payed off.")
        }
        console.log(debt)
        balanceLabel.innerText = `€ ${balance}`;
        incomeLabel.innerText = `€ ${income}`;
    }
}


function paybackMoney() {
    console.log(typeof debt)

    if (income >= debt) {
        income -= debt;
        balance += income
        debt = 0.0
        income = 0.0
        debtLabel.innerText = "";
        paybackButton.style.visibility = "hidden";

    } else {
        debt -= income;
        income = 0.0
        debtLabel.innerText = `Debt: € ${debt}`;

    }

    balanceLabel.innerText = `€ ${balance}`;
    incomeLabel.innerText = `€ ${income}`;

}

function buyComputer() {
    if (parseInt(priceComputer.innerText) <= balance) {
        balance -= parseInt(priceComputer.innerText)
        balanceLabel.innerText = `€ ${balance}`;
        let entry = document.createElement('h6');
        entry.appendChild(document.createTextNode(titleComputer.innerText));
        purchaseList.appendChild(entry);
        console.log()

    } else {
        alert("You cannot afford this computer.")
    }

}
//Change computer from dropdownmenu
computersDropdown.addEventListener('change', handleListChange);

const changePrice = (price) => Number.parseInt(price);






