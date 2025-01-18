document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formDataObj = Object.fromEntries(formData.entries());
        
        try {
            // Here you would typically send the data to your backend
            // For demonstration, we'll just show a success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('There was an error sending your message. Please try again.', 'error');
        }
    });
});

// Notification system
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Add visible class for animation
    setTimeout(() => notification.classList.add('visible'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Form validation
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    const value = input.value.trim();
    
    if (input.required && !value) {
        setInputError(input, 'This field is required');
        return false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setInputError(input, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (input.type === 'tel' && value) {
        const phoneRegex = /^\+?[\d\s-()]{10,}$/;
        if (!phoneRegex.test(value)) {
            setInputError(input, 'Please enter a valid phone number');
            return false;
        }
    }
    
    clearInputError(input);
    return true;
}

function setInputError(input, message) {
    input.classList.add('invalid');
    
    let errorMessage = input.parentElement.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        input.parentElement.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}

function clearInputError(input) {
    input.classList.remove('invalid');
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
} 