// getElements
const barrowButton = document.getElementById("barrow")
const paybackButton = document.getElementById("payback")
const incomeLabel = document.getElementById("earned")
const balanceLabel = document.getElementById("balance")
const debtLabel = document.getElementById("debt")

const products = [];
let income = 0.0;
let balance = 0.0; 
let debt = 0.0;


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
    income += parseInt(hoursWorked)*100;
    incomeLabel.innerText = `€ ${income}`;
}

function transferEarningsToBank() {

    if (debt !== 0.0 && debt !== null && debt !== 0 && !isNaN(debt)){

        if(income*0.1 <= debt){
            debt -= income*0.1
            balance += income*0.9
            balanceLabel.innerText = `€ ${balance}`;
            debtLabel.innerText = `Debt: € ${debt}`;
            console.log(`You still have a debt of € ${debt}`)
        }else {
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

    if (debt === 0.0 || debt === null || debt === 0 || isNaN(debt)){

        debt = parseFloat(prompt(`
    How much money would you like to barrow?
    --------------------------------------------------
    • You cannot barrow more than double your balance.
    • Every money transfer takes 20% to pay off your loan.
    • You will not rent over the money owed. 
    `))
    if (debt < balance*2+1 && debt !== null && debt !== 0 && !isNaN(debt)){
        balance += parseFloat(debt);
        debtLabel.innerText = `Debt: € ${debt}`;
        balanceLabel.innerText = `€ ${balance-1}`;
        paybackButton.style.visibility = "visible";

    } else if (debt === 0.0 || debt === null || debt === 0 || debt === NaN){
        debtLabel.innerText = "";
        alert("Canceled")
        debt === 0.0
        paybackButton.style.visibility = "hidden";
 
    }
    console.log(debt)
    balanceLabel.innerText = `€ ${balance}`;
    incomeLabel.innerText = `€ ${income}`;

}else { 
    alert("You previous loan has not been payed off.")
}
}

function paybackMoney(){
    console.log(typeof debt)

        if (income >= debt){
            income -= debt;
            balance += income
            debt = 0.0
            income = 0.0
            debtLabel.innerText = "";
            paybackButton.style.visibility = "hidden";
  
        }else {
            debt -= income;
            income = 0.0
            debtLabel.innerText = `Debt: € ${debt}`;

        }
        
        balanceLabel.innerText = `€ ${balance}`;
        incomeLabel.innerText = `€ ${income}`;

    }

    



