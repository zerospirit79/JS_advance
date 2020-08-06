Vue.component("cart", {
    data() {
        return {
            cartItems: [],
            cartUrl: "/getBasket.json",
            imgCart: "https://via.placeholder.com/70",
            showCart: false,
            cartEmptyText: "No Products",
        };
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`).then((data) => {
                if (data.result === 1) {
                    let find = this.cartItems.find((el) => el.id_product === product.id_product);
                    if (find) {
                        find.quantity++;
                    } else {
                        let prod = Object.assign({ quantity: 1 }, product);
                        this.cartItems.push(prod);
                    }
                } else {
                    alert("Error");
                }
            });
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`).then((data) => {
                if (data.result === 1) {
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    }
                }
            });
        },
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`).then((data) => {
            for (let el of data.contents) {
                this.cartItems.push(el);
            }
        });
    },
    template: `
        <div class="cart">
            <button class="btn-cart" type="button" @click="showCart = !showCart" title="Shopping Cart">
                <i class="fas fa-shopping-cart"></i><span>({{ cartItems.length }})</span>
            </button>
            <div class="cart-drop" v-show="showCart">
                <div v-show="!cartItems.length" class="cart-isEmpty">
                    <span>{{ cartEmptyText }}</span>
                </div>
                <cart-item
                    class="cart-item"
                    v-for="item of cartItems"
                    :key="item.id_product"
                    :cart-item="item"
                    :img="imgCart"
                    @remove="remove">
                </cart-item>
            </div>
        </div>
    `,
});

Vue.component("cart-item", {
    props: ["cartItem", "img"],
    template: `
        <div class="cart-item">
            <div class="cart-item-left">
                <a href="#"><img :src="img" alt="product_image"></a>
                <div class="cart-item-text">
                    <a href="#"><h4 class="product-title">{{ cartItem.product_name }}</h4></a>
                    <p class="product-quantity">{{ cartItem.quantity }} &times; {{ cartItem.price }} &#8381;</p>
                    <p class="product-price">{{ cartItem.quantity * cartItem.price }} &#8381;</p>
                </div>
            </div>
            <i class="del-btn fas fa-times-circle" @click="$emit('remove', cartItem)"></i>
        </div>
    `,
});
