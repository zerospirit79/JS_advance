const products = [{
        id: 1,
        title: 'Notebook',
        price: 20000
    },
    {
        id: 2,
        title: 'PCMouse',
        price: 1500
    },
    {
        id: 3,
        title: 'PCKeyboard',
        price: 5000
    },
    {
        id: 4,
        title: 'Gamepad',
        price: 4500
    },
];

const renderProduct = (title, price, img = '') => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <img src="https://loremflickr.com/300/240/${title}" alt="">
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const renderProducts = list => {
    const productList = list.map(item => renderProduct(item.title, item.price));
    console.log(productList);
    document.querySelector('.products').innerHTML = productList;
};

renderProducts(products);