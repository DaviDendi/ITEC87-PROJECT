function calculateTotal() {
    const items = document.querySelectorAll('.item');
    let total = 0;
    items.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const input = item.querySelector('input[type="number"]');
        const price = parseFloat(item.querySelector('p').textContent.replace('₱', ''));
        const quantity = parseInt(input.value);
        let stock = parseInt(item.dataset.stock);
        if (checkbox.checked) {
            if (quantity > stock) {
                alert("Not enough stock!");
                checkbox.checked = false;
                input.value = 0;
            } else {
                total += price * quantity;
                stock -= quantity;
                item.dataset.stock = stock;
            }
        }
        item.querySelector('span').textContent = "Stock: " + stock;
    });
    // Apply discounts if checkboxes are checked
    if (document.getElementById('seniorCheckbox').checked) {
        total *= 0.8; // 20% discount for senior
    }
    if (document.getElementById('pwdCheckbox').checked) {
        total *= 0.7; // 30% discount for PWD
    }
    if (document.getElementById('studentCheckbox').checked) {
        total *= 0.9; // 10% discount for student
    }
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function enableInput(checkbox) {
    const inputField = checkbox.parentElement.querySelector('input[type="number"]');
    inputField.disabled = !checkbox.checked;
    if (checkbox.checked) {
        inputField.removeAttribute('disabled');
        inputField.focus();
    } else {
        inputField.setAttribute('disabled', true);
        inputField.value = 0;
        calculateTotal(); 
    }
}

function calculateChange() {
    var enteredMoney = parseFloat(document.getElementById("moneyInput").value);
    var totalPrice = parseFloat(document.getElementById("totalPrice").innerText);
    var change = enteredMoney - totalPrice;
    document.getElementById("totalChange").innerText = change.toFixed(2);
}

function calculateTotalItems() {
    var items = document.querySelectorAll('.item input[type="number"]');
    var totalItems = 0;
    items.forEach(item => {
        totalItems += parseInt(item.value);
    });
    document.getElementById('totalItems').textContent = totalItems;
}
function generateReceipt() {
  const items = document.querySelectorAll('.item');
  let receiptContent = '';

  items.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const input = item.querySelector('input[type="number"]');
    const itemName = item.querySelector('h3').textContent;
    const quantity = parseInt(input.value);
    const price = parseFloat(item.querySelector('p').textContent.replace('₱', ''));
    if (checkbox.checked && quantity > 0) {
      receiptContent += `${itemName}: ${quantity} x ₱${price.toFixed(2)}\n`;
    }
  });

  const enteredMoney = parseFloat(document.getElementById("moneyInput").value);
  const totalPrice = parseFloat(document.getElementById("totalPrice").innerText);
  const change = parseFloat(document.getElementById("totalChange").innerText);

  let discountDetails = '';
  if (document.getElementById('seniorCheckbox').checked) {
    discountDetails += 'Senior Discount: 20%\n';
  }
  if (document.getElementById('pwdCheckbox').checked) {
    discountDetails += 'PWD Discount: 30%\n';
  }
  if (document.getElementById('studentCheckbox').checked) {
    discountDetails += 'Student Discount: 10%\n';
  }

  receiptContent += '\nDiscounts:\n';
  receiptContent += discountDetails;

  receiptContent += `\nEntered Money: ₱${enteredMoney.toFixed(2)}\n`;
  receiptContent += `Change: ₱${change.toFixed(2)}`;

  alert(receiptContent);
}
