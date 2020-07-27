

class ProductList {
  //#privateProp

  constructor (container = '.products') {
    this.container = container
    this.goods = []
    this.allProducts = []
    this.#privateProp = '123'

    this.fetchProducts()
    this.render()
    this.sumOfGoods()
  }

  get prop () {
    return this.#privateProp
  }

  set prop (value) {
    this.#privateProp = value
  }

  fetchProducts () {
    this.goods = [
      { id: 1, title: 'NotePC', price: 20000 },
      { id: 2, title: 'PCMouse', price: 1500 },
      { id: 3, title: 'Keyboard', price: 5000 },
      { id: 4, title: 'Gamepad', price: 4500 }
    ]
  }

  render () {
    const block = document.querySelector(this.container)

    for (let product of this.goods) {
      const productObject = new ProductItem(product)

      this.allProducts.push(productObject)
      block.insertAdjacentHTML('beforeend', productObject.render())
    }
  }

  sumOfGoods () {
    let listHtml = ''
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(title, price)
      listHtml += goodItem.sumOfGoods()
    })
    document.querySelector('.goods-list').innerHTML = listHtml
    console.log(this.sumOfGoods())
  }
}

class ProductItem {
  constructor (product, img = '') {
    this.title = product.title
    this.price = product.price
    this.id = product.id
    this.img = img
  }

  render () {
    return `<div class="product-item" data-id="${this.id}">
              <img src="https://loremflickr.com/300/240/${this.title}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`
  }
}

class Cart {
  constructor (product, price) {
    this.addProduct //добавляем товар в карзину
    this.totalSumm //выводим сумму товара
    this.removeProduct //удаляем товар
  }
}

const list = new ProductList()

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://placehold.it/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
// document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);
//
