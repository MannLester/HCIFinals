document.addEventListener('DOMContentLoaded', function() {
    // Get all quantity controls
    const quantityControls = document.querySelectorAll('.quantity-controls');
    const removeButtons = document.querySelectorAll('.remove-item');
    
    function calculateTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let total = 0;
        
        cartItems.forEach(item => {
            const basePrice = parseFloat(item.dataset.basePrice);
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            const itemTotal = basePrice * quantity;
            
            // Update item price display
            const priceDisplay = item.querySelector('.price');
            if (priceDisplay) {
                priceDisplay.textContent = `$${itemTotal.toFixed(2)}`;
            }
            total += itemTotal;
        });
        
        // Update Order Summary - using more specific class names
        const subtotal = document.querySelector('.cart-summary .summary-row:not(.total) span:last-child');
        const totalDisplay = document.querySelector('.cart-summary .summary-row.total span:last-child');
        
        if (subtotal && totalDisplay) {
            const formattedTotal = `$${total.toFixed(2)}`;
            subtotal.textContent = formattedTotal;
            totalDisplay.textContent = formattedTotal;
        }
    }
    
    // Add event listeners to quantity controls
    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const input = control.querySelector('.quantity-input');
        
        minusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                calculateTotal();
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value < 10) {
                input.value = value + 1;
                calculateTotal();
            }
        });
        
        input.addEventListener('change', () => {
            let value = parseInt(input.value);
            if (value < 1) input.value = 1;
            if (value > 10) input.value = 10;
            calculateTotal();
        });
    });
    
    // Add event listeners to remove buttons
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cartItem = button.closest('.cart-item');
            cartItem.style.opacity = '0';
            setTimeout(() => {
                cartItem.remove();
                calculateTotal();
            }, 300);
        });
    });
    
    // Initialize totals
    calculateTotal();

    // Modal functionality
    const modal = document.getElementById('thankYouModal');
    const checkoutBtn = document.querySelector('.checkout-btn');

    function showThankYouModal() {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    checkoutBtn.addEventListener('click', showThankYouModal);
});
