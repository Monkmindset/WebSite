document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('catalog-search');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    let cart = [];

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productId = productCard.getAttribute('data-category') + '-' + 
                            productCard.querySelector('h3').textContent;
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));

            addToCart(productId, productName, productPrice);
            updateCartUI();
            showNotification('Product added to cart!', 'success');
        });
    });

    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1
            });
        }
    }

    function updateCartUI() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">x${item.quantity}</span>
                <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-id="${item.id}">×</button>
            `;
            cartItems.appendChild(itemElement);
            
            total += item.price * item.quantity;
        });

        totalAmount.textContent = `$${total.toFixed(2)}`;
    }

    // Remove from cart
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const itemId = e.target.getAttribute('data-id');
            cart = cart.filter(item => item.id !== itemId);
            updateCartUI();
            showNotification('Product removed from cart!', 'success');
        }
    });

    // Checkout functionality
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        
        // Here you would typically integrate with a payment processor
        showNotification('Proceeding to checkout...', 'success');
        cart = [];
        updateCartUI();
    });

    // Product animation on scroll
    const animateProducts = () => {
        productCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            
            if (cardTop < window.innerHeight && cardBottom > 0) {
                card.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateProducts);
    window.addEventListener('load', animateProducts);
});

// Notification system (reusing from contact.js)
function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('visible'), 100);
    
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
} 