if (document.readyState == 'loading') {
     document.addEventListener('DOMContentLoaded', ready())
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-clear')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('teaButton')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
function sizeChanged(){
    
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value <= 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('teaTitle')[0].innerText
    var price = shopItem.getElementsByClassName('teaPrice')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('tea-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-item-price cart-column">${price}</span>
        <div class="cartSizeOptions cart-column">
                    <select name="size" class="cart-size">
                        <option value="1000">Small 1000LKR</option>
                        <option value="2500" selected="selected">Medium 2500LKR</option>
                        <option value="5000">Large 5000LKR</option>
                    </select>
                </div>
<div class="cartPackageOptions cart-column">
                <select name="package" class="cart-package">
                    <option value="1000">Paper Pouches 1000LKR</option>
                    <option value="5000" selected="selected">Tins 5000LKR</option>
                    <option value="2500">Bags 2500LKR</option>
                </select>
            </div>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn-clear" type="button">Remove</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-clear')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-item-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('LKR', ''));
        var quantity = quantityElement.value;
        var sizeElement =cartRow.getElementsByClassName('cart-size')[0];
        var size=parseFloat(sizeElement.options[sizeElement.selectedIndex].value);
        var packageElement =cartRow.getElementsByClassName('cart-package')[0];
        var package=parseFloat(packageElement.options[packageElement.selectedIndex].value);
        total = (total+size+package) + (price* quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '' + total +' LKR';
}