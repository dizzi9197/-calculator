let startBtn = document.getElementById("start");
let budgetValue = document.getElementsByClassName('budget-value')[0];
let dayBudgetValue = document.getElementsByClassName('daybudget-value')[0];
let levelValue = document.getElementsByClassName('level-value')[0];
let expensesValue = document.getElementsByClassName('expenses-value')[0];
let optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0];
let incomeValue = document.getElementsByClassName('income-value')[0];
let monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0];
let yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0];

let expensesItem = document.getElementsByClassName('expenses-item');
let expensesBtn = document.getElementsByTagName('button')[0];
let optionalExpensesBtn = document.getElementsByTagName('button')[1];
let countBtn = document.getElementsByTagName('button')[2];
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');
let incomeItem = document.querySelector('.choose-income');
let checkSavings = document.querySelector('#savings');
let sumValue = document.querySelector('.choose-sum');
let percentValue = document.querySelector('.choose-percent');
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');

let money, time;



startBtn.addEventListener('click', function() {
   
    time = prompt('Введите дату в формате YYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');

    while (isNaN(money) || money == '' || money == null){
        money = prompt('Ваш бюджет?', '');
    }
    appData.budget = money;
    appData.timeDara = time;
    budgetValue.textContent = money;
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() +1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('mouseover', function(){
    if (appData.budget != undefined) {  
        for ( let i = 0; i < expensesItem.length; i++){
                if (expensesItem[i].value != "") {
                    expensesBtn.addEventListener('click', function() {
                
                        let sum = 0;
                        for (let i = 0; i < expensesItem.length; i++) {
                            
                            let a = expensesItem[i].value,
                                b = expensesItem[++i].value;
                            if ((typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
                                appData.expenses[a] = b;
                                sum += +b;
                            } else {
                                --i;
                            }
                        }
                        expensesValue.textContent = sum;
                        
                        
                    });
                } 
            
        };
        
        

    } 
});

optionalExpensesBtn.addEventListener('mouseover', function(){
    if (appData.budget != undefined){  
        optionalExpensesBtn.addEventListener('click', function(){
            
            for (let i = 0; i < optionalExpensesItem.length; i++) {
                let opt = optionalExpensesItem[i].value;
                appData.optionalExpenses[i] = opt;
                optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
            }
        });
    } 
});

countBtn.addEventListener('mouseover', function(){
    if (appData.budget != undefined){   
        countBtn.addEventListener('click', function() {
            if (appData.budget != undefined) {
                let sum = 0; 
                for (let key in appData.expenses){
                    sum += +appData.expenses[key];
                }
                appData.moneyPerDay = ((appData.budget - sum) / 30).toFixed();
                dayBudgetValue.textContent = appData.moneyPerDay;
        
                if (appData.moneyPerDay < 100) {
                    levelValue.textContent = 'Минимальный уровень достатка';
                } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                    levelValue.textContent = 'Средний уровень достатка';
                } else if (appData.moneyPerDay > 2000) {
                    levelValue.textContent = 'Высокий уровень достатка';
                } else {
                    levelValue.textContent = 'Произошла ошибка';
                }
            } else {
                dayBudgetValue.textContent = 'Произошла ошибка';
            }
        });

    } 
});

incomeItem.addEventListener('input', function(){
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});
checkSavings.addEventListener('click', function(){
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});
sumValue.addEventListener('input', function(){
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome;
        yearSavingsValue.textContent = appData.yearIncome;
    }
});
percentValue.addEventListener('input', function(){
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings:  false
};