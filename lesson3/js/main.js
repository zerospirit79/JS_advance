'use strict'

const API =
  'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

// Переделать в ДЗ (не на fetch!!! а на Promise)
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error')
      } else {
        cb(xhr.responseText)
      }
    }
  }
  xhr.send()
}

class List {
  constructor (url, container, list = listContext) {
    this.container = container
    this.list = list
    this.url = url
    this.goods = []
    this.allProducts = []
    this._init()
  }

  // #fetchProducts() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     this.goods = JSON.parse(data);
  //     console.log(this.goods);
  //     this.render();
  //   });
  // }
  getProducts () {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log('Error!', error)
      })
  }
  /**
   * Метод занимается обработкой полученных с сервера данных
   * @param data
   */
  handleData (data) {
    this.goods = [...data]
    this.render()
  }

  /**
   * Метод подсчитывет полную сумму товаров
   */
  calcSum () {
    return this.allProducts.reduce((sum, { price }) => sum + price, 0)
  }

  /**
   * Метод отрисовывает список
   */
  render () {
    const block = document.querySelector(this.container)

    for (let product of this.goods) {
      const productObject = new this.list[this.constructor.name](product)

      this.allProducts.push(productObject)
      block.insertAdjacentHTML('beforeend', productObject.render())
    }
  }
}

class Item {
  constructor (product, img = ' ') {
    this.title = product.product_name
    this.price = product.price
    this.id = product.id_product
    this.img = img
  }

  render () {
    return ``
  }
}

class ProductsList extends List {
  constructor (cart, container = '.products', url = '/catalogData.json') {
    super(url, container)
    this.cart = cart
    this.getProducts().then(data => this.handleData(data))
  }

  _init () {
    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('buy-btn')) {
        this.cart.addProduct(e.target)
      }
    })
  }
}

class ProductItem extends Item {
  render () {
    return `<div class="product-item" data-id="${this.id}">
                 <img src="https://loremflickr.com/300/240/${this.title}" alt="Some img">
                 <div class="product-item-desc">
                    <h3>${this.title}</h3>
                    <p class="cart-price">${this.price} \u20bd</p>
                    <button
                       class="button buy-btn"
                       data-id="${this.id}"
                       data-title="${this.title}"
                       data-price="${this.price}">Купить</button>
                 </div>
           </div>`
  }
}

class Cart extends List {
  constructor (container = '.cart-drop', url = '/getBasket.json') {
    super(url, container)
    this.getProducts().then(data => {
      this.handleData(data.contents)
    })
  }

  /**
   * Метод добавляет товар в корзину
   * @param element
   */
  addProduct (element) {
    this.getProducts(`${API}/addToBasket.json`).then(data => {
      if (data.result === 1) {
        let productId = +element.dataset['id']
        let find = this.allProducts.find(product => product.id === productId)
        if (find) {
          find.quantity++
          this._updateCart(find)
        } else {
          let product = {
            id_product: productId,
            price: +element.dataset['price'],
            product_name: element.dataset['title'],
            quantity: 1
          }

          this.goods = [product]

          this.render()
        }
      } else {
        alert('Error')
      }
    })
  }

  /**
   * Метод удаляет товар из корзины
   * @param element
   */
  removeProduct (element) {
    this.getProducts(`${API}/deleteFromBasket.json`).then(data => {
      if (data.result === 1) {
        let productId = +element.dataset['id']
        let find = this.allProducts.find(product => product.id === productId)
        if (find.quantity > 1) {
          // если товара > 1, то уменьшаем количество на 1
          find.quantity--
          this._updateCart(find)
        } else {
          // удаляем
          this.allProducts.splice(this.allProducts.indexOf(find), 1)
          document.querySelector(`.cart-body[data-id="${productId}"]`).remove()
        }
      } else {
        alert('Error')
      }
    })
  }

  /**
   * Метод обновляет данные в корзине
   * @param product
   * @private
   */
  _updateCart (product) {
    let block = document.querySelector(`.cart-body[data-id="${product.id}"]`)
    block.querySelector(
      '.product-quantity'
    ).textContent = `${product.quantity} \u00D7 ${product.price} \u20BD`
    block.querySelector('.product-price').textContent = `${product.quantity *
      product.price} \u20BD`
  }

  _init () {
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('hidden')
    })
    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('del-btn')) {
        this.removeProduct(e.target)
      }
    })
  }
}

class CartItem extends Item {
  constructor (product, img = '') {
    super(product, img)
    this.quantity = product.quantity
  }

  /**
   * Метод отрисовывает товары в корзине
   */
  render () {
    return `<div class="cart-body" data-id="${this.id}">
                 <div class="cart-item-left">
                    <a href="#"><img src="https://loremflickr.com/300/240/${
                      this.title
                    }" alt="Some image"></a>
                    <div class="cart-item-text">
                       <a href="#"><h4 class="product-title">${
                         this.title
                       }</h4></a>
                       <p class="product-quantity">${this.quantity} &times; ${
      this.price
    } &#8381</p>
                       <p class="product-price">${this.quantity *
                         this.price} &#8381;</p>
                    </div>
                 </div>
                 <i class="del-btn fas fa-times-circle" data-id="${
                   this.id
                 }"></i>
              </div>`
  }
}

const listContext = {
  ProductsList: ProductItem,
  Cart: CartItem
}

const cart = new Cart()
const list = new ProductsList(cart)
