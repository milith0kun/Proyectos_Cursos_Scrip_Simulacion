export class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.init();
        this.updateCartDisplay();
    }

    init() {
        this.cartOverlay = document.querySelector('.cart-overlay');
        this.cartBtn = document.querySelector('.cart-link');
        this.closeCartBtn = document.querySelector('.close-cart');
        this.cartItemsContainer = document.querySelector('.cart-items');
        this.totalAmount = document.querySelector('.total-amount');
        this.emptyCartMessage = document.querySelector('.empty-cart');
        this.checkoutBtn = document.querySelector('.checkout-btn');
        
        // Event Listeners mejorados
        this.cartBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openCart();
        });
        
        this.closeCartBtn?.addEventListener('click', () => this.closeCart());
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.cartOverlay.classList.contains('active')) {
                this.closeCart();
            }
        });

        // Cerrar al hacer clic fuera
        this.cartOverlay?.addEventListener('click', (e) => {
            if (e.target === this.cartOverlay) this.closeCart();
        });

        // Botones de agregar al carrito
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.addToCart(e);
                this.showNotification('Producto agregado al carrito');
            });
        });

        // Checkout
        this.checkoutBtn?.addEventListener('click', () => this.handleCheckout());
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `cart-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }, 100);
    }

    updateCartDisplay() {
        this.updateTotal();
        this.updateCartCount();
        this.toggleEmptyCartMessage();
        this.saveToLocalStorage();
    }

    toggleEmptyCartMessage() {
        if (this.emptyCartMessage) {
            this.emptyCartMessage.classList.toggle('visible', this.items.length === 0);
        }
        if (this.checkoutBtn) {
            this.checkoutBtn.disabled = this.items.length === 0;
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    addToCart(e) {
        const productCard = e.target.closest('.product-card');
        if (!productCard) return;

        const productData = {
            id: productCard.dataset.productId || Date.now(),
            title: productCard.querySelector('.product-title')?.textContent,
            price: parseFloat(productCard.querySelector('.product-price')?.textContent.replace(/[^0-9.-]+/g, '')),
            image: productCard.querySelector('.product-image')?.dataset.src || 
                   productCard.querySelector('.product-image')?.style.backgroundImage.replace(/url\(['"](.+)['"]\)/, '$1'),
            quantity: 1,
            maxQuantity: parseInt(productCard.dataset.maxQuantity) || 10
        };

        if (!productData.title || isNaN(productData.price)) {
            this.showNotification('Error al agregar el producto', 'error');
            return;
        }

        const existingItem = this.items.find(item => item.id === productData.id);
        
        if (existingItem) {
            if (existingItem.quantity < existingItem.maxQuantity) {
                existingItem.quantity++;
                this.updateCartItem(existingItem);
                this.showNotification('Cantidad actualizada');
            } else {
                this.showNotification('Cantidad máxima alcanzada', 'warning');
            }
        } else {
            this.items.push(productData);
            this.addCartItem(productData);
        }

        this.updateCartDisplay();
    }

    addCartItem(item) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.dataset.id = item.id;
        itemElement.dataset.category = item.category; // Add this line
        
        itemElement.innerHTML = `
            <div class="cart-item-image ${item.imageClass}"></div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                </div>
                <button class="remove-item">Eliminar</button>
            </div>
        `;
    
        this.cartItemsContainer.appendChild(itemElement);

        // Add event listeners for quantity buttons
        itemElement.querySelector('.minus').addEventListener('click', () => this.updateQuantity(item.id, -1));
        itemElement.querySelector('.plus').addEventListener('click', () => this.updateQuantity(item.id, 1));
        itemElement.querySelector('.remove-item').addEventListener('click', () => this.removeItem(item.id));
    }

    updateCartItem(item) {
        const itemElement = this.cartItemsContainer.querySelector(`[data-id="${item.id}"]`);
        if (itemElement) {
            itemElement.querySelector('.quantity').textContent = item.quantity;
        }
    }

    updateQuantity(id, change) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity < 1) {
                this.removeItem(id);
            } else {
                this.updateCartItem(item);
                this.updateTotal();
            }
        }
    }

    removeItem(id) {
        const itemElement = this.cartItemsContainer.querySelector(`[data-id="${id}"]`);
        if (itemElement) {
            itemElement.remove();
            this.items = this.items.filter(item => item.id !== id);
            this.updateTotal();
            this.updateCartCount();
        }
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.totalAmount.textContent = `$${this.total.toFixed(2)}`;
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = itemCount;
    }

    handleCheckout() {
        if (this.items.length === 0) {
            this.showNotification('El carrito está vacío', 'warning');
            return;
        }

        // Aquí iría la lógica de checkout
        console.log('Procesando checkout:', this.items);
        this.showNotification('Procesando su pedido...', 'info');
    }

    openCart() {
        this.cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        this.cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}