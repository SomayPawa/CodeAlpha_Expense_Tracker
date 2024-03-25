document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const expenseInput = document.getElementById('expense-input');
        const amountInput = document.getElementById('amount-input');

        const expenseDescription = expenseInput.value;
        const expenseAmount = parseFloat(amountInput.value);

        if (expenseDescription.trim() === '' || isNaN(expenseAmount)) {
            alert('Please provide valid expense details.');
            return;
        }

        addExpense(expenseDescription, expenseAmount);

        expenseInput.value = '';
        amountInput.value = '';
    });

    expenseList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            event.target.parentElement.remove();
            updateLocalStorage();
        }
    });

    function addExpense(description, amount) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${description}</span>
            <span>$${amount}</span>
            <button class="delete">X</button>
        `;
        expenseList.appendChild(li);
        updateLocalStorage();
    }

    function updateLocalStorage() {
        const expenses = document.querySelectorAll('#expense-list li');
        const expensesArray = [];
        expenses.forEach(function(expense) {
            const expenseDescription = expense.querySelector('span:first-child').textContent;
            const expenseAmount = parseFloat(expense.querySelector('span:last-child').textContent.replace('$', ''));
            expensesArray.push({ description: expenseDescription, amount: expenseAmount });
        });
        localStorage.setItem('expenses', JSON.stringify(expensesArray));
    }
});