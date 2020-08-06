Vue.component("search", {
    data() {
        return {
            userSearch: "",
        };
    },
    template: `
        <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
            <button type="submit" class="search-btn">
                <i class="fas fa-search"></i>
            </button>
            <input
                type="text"
                class="search-input"
                v-model="userSearch"
                placeholder="Search..."
            />
        </form>
    `,
});
