Vue.component("products", {
    data() {
        return {
            catalogUrl: "/catalogData.json",
            imgCatalog: "https://via.placeholder.com/250",
            products: [],
            filtered: [],
            noMatch: false,
            noMatchText: "No matches found", // если при поиске товаров ничего не найдено
        };
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, "i");
            this.filtered = this.products.filter((el) => regexp.test(el.product_name));
            // если ничего не найдено
            if (this.filtered.length < 1) {
                this.noMatch = true;
            } else {
                this.noMatch = false;
            }
        },
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`).then((data) => {
            for (let el of data) {
                this.products.push(el);
                this.filtered.push(el);
            }
        });
    },
    template: `
        <div class="products">
            <div class="noMatches" v-show="noMatch">{{ noMatchText }}</div>
            <product
                v-for="item of filtered"
                :key="item.id_product"
                :img="imgCatalog"
                :product="item">
            </product>
        </div>
    `,
});

Vue.component("product", {
    props: ["product", "img"],
    data() {
        return {
            /**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             */
            cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
        };
    },

    template: `
        <div class="product-item">
            <img :src="img" alt="product_image">
            <div class="product-item-desc">
                <h3>{{ product.product_name }}</h3>
                <p>{{ product.price }} &#8381;</p>
                <button
                    class="buy-btn"
                    @click="cartAPI.addProduct(product)"
                >Add to Cart</button>
            </div>
        </div>
    `,
});
