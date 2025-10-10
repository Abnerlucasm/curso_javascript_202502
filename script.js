document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://fakestoreapi.com/products';
    const STORAGE_KEY_STOCK = 'fakestore_stock';

    let allProducts = [];
    let cart = {}; 


    /**
     * @returns {Object}
     */
    const getPersistentStock = () => {
        const stockData = localStorage.getItem(STORAGE_KEY_STOCK);
        return stockData ? JSON.parse(stockData) : {};
    };

    /**
     * 
     * @param {Object} stockData
     */
    const setPersistentStock = (stockData) => {
        localStorage.setItem(STORAGE_KEY_STOCK, JSON.stringify(stockData));
    };

    /**
     * @param {Array} productsData 
     * @returns {Object} 
     */
    const initializeStock = (productsData) => {
        let stock = getPersistentStock();
        
        if (Object.keys(stock).length === 0) {
            productsData.forEach(product => {
              
                stock[product.id] = 10; 
            });
            setPersistentStock(stock);
        }
        return stock;
    };

    /**
     * @param {Array} products 
     * @param {Object} stock 
     */
    const renderProducts = (products, stock) => {
        const productListEl = document.getElementById('product-list');
        productListEl.innerHTML = '<h2>Produtos Disponíveis</h2>';

        products.forEach(product => {
            const currentStock = stock[product.id] || 0;
            const isAvailable = currentStock > 0;

        
            const cardClass = isAvailable ? 'product-card' : 'product-card unavailable';
            
            const productHTML = `
                <div class="${cardClass}" data-product-id="${product.id}">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                        <div class="product-stock">Estoque: ${currentStock}</div>
                    </div>
                    <button class="btn btn-primary add-to-cart-btn" 
                            data-product-id="${product.id}"
                            ${isAvailable ? '' : 'disabled'}>
                        Adicionar ao Carrinho
                    </button>
                </div>
            `;
            productListEl.innerHTML += productHTML;
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                addToCart(productId);
            });
        });
    };

    const renderCart = () => {
        const cartItemsEl = document.getElementById('cart-items');
        const totalValueEl = document.getElementById('cart-total-value');
        const checkoutBtn = document.getElementById('checkout-button');
        let total = 0;

        cartItemsEl.innerHTML = '';
        const cartItemIds = Object.keys(cart).filter(id => cart[id] > 0);

        if (cartItemIds.length === 0) {
            cartItemsEl.innerHTML = '<p class="empty-cart-message">O carrinho está vazio.</p>';
            checkoutBtn.disabled = true;
            totalValueEl.textContent = 'R$ 0.00';
            return;
        }
        
        cartItemIds.forEach(productIdStr => {
            const productId = parseInt(productIdStr);
            const quantityInCart = cart[productId];
            const product = allProducts.find(p => p.id === productId);
            
            if (product) {
                const subtotal = product.price * quantityInCart;
                total += subtotal;

                const itemHTML = `
                    <div class="cart-item">
                        <div class="cart-item-details">
                            <strong>${product.title}</strong>
                            <span>${quantityInCart}x | R$ ${subtotal.toFixed(2)}</span>
                        </div>
                    </div>
                `;
                cartItemsEl.innerHTML += itemHTML;
            }
        });

        totalValueEl.textContent = `R$ ${total.toFixed(2)}`;
        checkoutBtn.disabled = false;
    };


    /**
     * @param {number} productId
     */
    const addToCart = (productId) => {
        const stock = getPersistentStock();
        const availableStock = stock[productId] || 0;
        const currentCartQuantity = cart[productId] || 0;

        if (availableStock > currentCartQuantity) {
            cart[productId] = currentCartQuantity + 1;
            renderCart();
        } else {
            alert('Produto esgotado ou quantidade máxima atingida no carrinho!');
        }
    };

    const checkout = () => {
        if (!confirm('Tem certeza que deseja finalizar a compra?')) {
            return;
        }

        let stock = getPersistentStock();

        Object.keys(cart).forEach(productIdStr => {
            const productId = parseInt(productIdStr);
            const quantityInCart = cart[productId];
            
            if (stock[productId] !== undefined) {
                stock[productId] -= quantityInCart;
            
                if (stock[productId] < 0) stock[productId] = 0;
            }
        });

        setPersistentStock(stock);

        cart = {};

        renderCart();
        renderProducts(allProducts, stock); 

        alert('Compra finalizada com sucesso!');
    };


    const init = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allProducts = await response.json();
            
            const initialStock = initializeStock(allProducts);

            renderProducts(allProducts, initialStock);

            renderCart();

            document.getElementById('checkout-button').addEventListener('click', checkout);

        } catch (error) {
            console.error('Erro ao buscar dados da API ou inicializar:', error);
            document.getElementById('product-list').innerHTML = '<p>Erro ao carregar produtos. Tente novamente.</p>';
        }
    };

    init();
});