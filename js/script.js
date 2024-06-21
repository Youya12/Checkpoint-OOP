// Product Class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// ShoppingCartItem Class
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    // Method to get the total price of the items
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart Class
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    addItem(productId) {
        const product = this.findProduct(productId);
        const cartItem = this.items.find(item => item.product.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            this.items.push(new ShoppingCartItem(product, 1));
        }

        this.updateTotal();
        this.displayCart();
    }

    removeItem(productId) {
        const cartItem = this.items.find(item => item.product.id === productId);

        if (cartItem && cartItem.quantity > 0) {
            cartItem.quantity--;
        } else {
            this.items = this.items.filter(item => item.product.id !== productId);
        }

        this.updateTotal();
        this.displayCart();
    }

    deleteItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateTotal();
        this.displayCart();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
        document.querySelector('.total').textContent = '$' + this.total;
    }

    displayCart() {
        this.items.forEach(item => {
            const productCard = document.querySelector(`.card-body[data-product-id="${item.product.id}"]`);
            const quantitySpan = productCard.querySelector('.quantity');
            quantitySpan.textContent = item.quantity;
        });
    }

    findProduct(productId) {
        const products = [
            new Product(1, 'Baskets', 100),
            new Product(2, 'Socks', 20),
            new Product(3, 'Bag', 50)
        ];
        return products.find(product => product.id === productId);
    }
}

const shoppingCart = new ShoppingCart();

// Change color for the heart icon
function changeColor(heart) {
    heart.style.color = heart.style.color === 'red' ? 'black' : 'red';
}
