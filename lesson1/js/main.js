const products = [{
        id: 1,
        title: 'Notebook',
        price: 20000
    },
    {
        id: 2,
        title: 'Mouse',
        price: 1500
    },
    {
        id: 3,
        title: 'Keyboard',
        price: 5000
    },
    {
        id: 4,
        title: 'Gamepad',
        price: 4500
    },
];

const renderProduct = (title = NotePC, price = 10000, img = 'NotePC') => {

    return `<div class="product-item">
            <h3>${title}</h3>
            <img src="https://loremflickr.com/300/240/${title}" alt="">
            <p>Цена: ${price} рублей</p>
            <button class="by-btn">Добавить в корзину</button>
          </div>`;

};

const renderProducts = list => {
    const productList = list.map(id => renderProduct(id.title, id.price)).join('');
    document.querySelector('.products').innerHTML = productList;
};

renderProducts(products);