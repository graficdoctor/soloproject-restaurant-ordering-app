import { menuArray } from '/menuarray.js';

const orders = document.getElementById('orders');
const cards = document.getElementById('cards');
const completeOrderBtn = document.getElementById('order-button');
const modal = document.getElementById('modal');
const paymentDetailsForm = document.getElementById('payment-details-form');

const itemsInCart = [];

document.addEventListener('click', function (event) {
	if (event.target.dataset.add) {
		addItemToCart(event.target.dataset.add);
		renderOrders();
	} else if (event.target.id === 'order-button') {
		const modal = document.getElementById('modal');
		modal.style.display = 'block';
	} else if (event.target.dataset.remove) {
		removeItemFromCart(event.target.dataset.remove);
		renderOrders();
	}
});

function loadMenuHtml() {
	let menuFeedHtml = ``;
	menuArray.forEach((menu) => {
		menuFeedHtml += `
    	<div class="card">
			<img
				src="${menu.image}"
				class="img"
				alt="${menu.name}"
			/>
			<div class="card--product">
				<h2>${menu.name}</h2>
				<p class="small">${menu.ingredients}</p>
				<p class="price">$${menu.price}</p>
			</div>
			<button type="button" data-type="add-order">
				<img
			  	src="/images/circle-plus.svg"
					class="add-order"
					alt="add order button"
          data-add="${menu.id}"
				/>
			</button>
		</div>
    `;
	});
	return menuFeedHtml;
}

function renderMenu() {
	cards.innerHTML = loadMenuHtml();
}

function addItemToCart(itemID) {
	const itemObj = menuArray.filter((item) => {
		return item.id === Number(itemID);
	})[0];
	itemsInCart.push(itemObj);
}

function removeItemFromCart(itemID) {
	const index = itemsInCart.findIndex((item) => item.id === Number(itemID));
	if (index !== -1) {
		itemsInCart.splice(index, 1);
	}
}

function loadOrderedItems() {
	let totalToPay = 0;
	let orderedItemsHtml = `
  <h2 class="text-align-center margin-bottom-16">Your order</h2>
  `;

	itemsInCart.forEach(function (item) {
		totalToPay += item.price;
		orderedItemsHtml += `
    <div class="order">
    <h2>${item.name}</h2>
    <button type="button" data-type="remove-order" data-remove="${item.id}">remove</button>
    <p class="price">$${item.price}</p>
    </div>
    `;
	});

	orderedItemsHtml += `
  	<div class="order--total">
			<h2>Total price:</h2>
			<p class="price">$${totalToPay}</p>
	  </div>
	  <button type="submit" id="order-button" data-type="complete-order">
	    complete order
	  </button>`;

	return orderedItemsHtml;
}

function renderOrders() {
	orders.style.display = 'block';
	orders.innerHTML = loadOrderedItems();
}

paymentDetailsForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const paymentDetailsFormData = new FormData(paymentDetailsForm);
	const fullName = paymentDetailsFormData.get('fullname');
	orders.innerHTML = `
		<h2 class="text-align-center clr-primary-800 bg-primary-350 padding-24">
			Thanks ${fullName}! Your order is on its way.
		</h2>
  `;
	modal.style.display = 'none';
});

renderMenu();
