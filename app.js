var list = document.getElementById('list');
var form = document.getElementById('new-item-form');
var sortingMethod = document.getElementById('sorting').value;

// These will be added to every new list item - so I'll
// define them out here
var editButton = document.createElement('button');
editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
var deleteButton = document.createElement('button');
deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

var items = [
  { name: 'Milk', qty: 1 },
  { name: 'Eggs', qty: 3 }, 
  { name: 'Protein Bars', qty: 2 },
  { name: 'Steak', qty: 5 }, 
  { name: 'Rice', qty: 11 }
];

// Sorting Methods
// Alphabetical 
function alphabetize() {
  for(var i = 0; i < items.length; i++) {
    items[i].name
  }
}
// items.sort()
// Reverse Alphabetical
// Shortest to Greatest
// Reverse Shortest to Greatest

function renderItem(name, qty) {
  var container = document.createElement('div'); 
  container.classList.add('list-item');

  container.appendChild(document.createTextNode(name));
  container.appendChild(document.createTextNode(qty));
  container.appendChild(editButton);
  container.appendChild(deleteButton);
  list.appendChild(container);
}


window.onload = function() {
  for (let i = 0; i < items.length; i++) {
    renderItem(items[i].name, items[i].qty);
  }
}




form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  var newName = document.getElementById('product-name').value; // Validate this
  var newQty = document.getElementById('product-qty').value; // Validate this

  var container = document.createElement('div'); 
  container.classList.add('list-item');

  // entry.appendChild(document.createTextNode(newItem));
  // container.appendChild(entry);
  container.appendChild(editButton);
  container.appendChild(deleteButton);
  list.appendChild(container);
});
