// getElements
const barrowButton = document.getElementById("barrow")
const incomeLabel = document.getElementById("earned")
const balanceLabel = document.getElementById("balance")
const debtLabel = document.getElementById("debt")

const products = [];
let income = 0.0;
let balance = income; // is this right?
let debt = 0;

//default
incomeLabel.innerText = "€ 0";
balanceLabel.innerText = "€ 0";


//Income area
function WorkandEarn() {
    let hoursWorked = prompt("How many hours have you worked?");
    income += parseInt(hoursWorked)*20;
    incomeLabel.innerText = `€ ${income}`;
}

function transferEarningsToBank() {
    
    
    if (!debt === 0){
        
        
    } else {
        balance += income;
        balanceLabel.innerText = `€ ${balance}`;
    }

    income = 0.0;
    incomeLabel.innerText = `€ ${income}`;

    if (debt === 0){
        debtLabel.innerText = "";
    }
}

function barrowMoney() {

    if (parseInt(debt) === 0){

        debt = prompt(`
    How much money would you like to barrow?
    --------------------------------------------------
    note: You cannot barrow double your balance.
    `)
    if (debt <= balance*2-1){
        debtLabel.innerText = `Debt: € ${debt}`;
        balance += parseInt(debt);
        balanceLabel.innerText = `€ ${balance}`;
    }
    }else {
        alert("You previous loan has not been payed off.")
    }
    
    

    balanceLabel.innerText = `€ ${balance}`;
    incomeLabel.innerText = `€ ${income}`;
}