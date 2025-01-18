// Portfolio filtering and search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('portfolio-search');
    const filterTags = document.querySelectorAll('.filter-tag');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Filter functionality
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            tag.classList.add('active');

            const filter = tag.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        portfolioItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const tag = item.querySelector('.tag').textContent.toLowerCase();

            if (title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                tag.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Add animation on scroll
    const animatePortfolioItems = () => {
        portfolioItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;
            
            if (itemTop < window.innerHeight && itemBottom > 0) {
                item.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animatePortfolioItems);
    window.addEventListener('load', animatePortfolioItems);
}); 