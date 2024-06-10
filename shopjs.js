document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.item');
    const cartItems = document.getElementById('cart-items');
    let total = 0;

    function addToCart(item) {
        const itemName = item.querySelector('h3').textContent;
        const itemPrice = parseFloat(item.querySelector('p').textContent.replace('₱', ''));

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${itemName} - ₱${itemPrice.toFixed(2)}</p>
            <input type="number" class="quantity-input" min="1" value="1">
            <button class="remove-from-cart">Remove</button>
        `;
        cartItems.appendChild(cartItem);

        total += itemPrice;
        document.getElementById('total').textContent = total.toFixed(2);

        const quantityInput = cartItem.querySelector('.quantity-input');
        quantityInput.addEventListener('change', function() {
            const newQuantity = parseInt(this.value);
            const itemTotal = itemPrice * newQuantity;
            total += itemTotal - (itemPrice * parseInt(this.getAttribute('value')));
            this.setAttribute('value', newQuantity);
            document.getElementById('total').textContent = total.toFixed(2);
        });
    }

    function removeFromCart(event) {
        const item = event.target.parentElement;
        const itemPrice = parseFloat(item.querySelector('p').textContent.split(' - ')[1].replace('₱', ''));
        total -= itemPrice;
        document.getElementById('total').textContent = total.toFixed(2);
        item.remove();
    }

    function checkout() {
        const cartItems = document.querySelectorAll('.cart-item');
        if (cartItems.length === 0) {
         //   window.alert("error!!");
            return;
        }
        let receipt = "Receipt:\n";
        cartItems.forEach(cartItem => {
            const itemName = cartItem.querySelector('p').textContent.split(' - ')[0];
            const itemPrice = cartItem.querySelector('p').textContent.split(' - ')[1];
            receipt += `${itemName}: ${itemPrice}\n`;
        });
        receipt += `\nTotal: ₱${total.toFixed(2)}`;
        window.alert(receipt);
    }

    items.forEach(item => {
        const addToCartButton = item.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => addToCart(item));
    });

    document.addEventListener('click', event => {
        if (event.target.classList.contains('remove-from-cart')) {
            removeFromCart(event);
        }
    });

    const checkoutButton = document.getElementById('checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }
});
