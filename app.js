// Outer ul containing all list items
var container = document.getElementById('list'); 

// Form element
var form = document.getElementById('new-item-form');

// Adding a new list item
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  var newName = document.getElementById('product-name').value; 
  var newCount = document.getElementById('product-qty').value; 
  // Validation - name is flexible, count accepts only numbers
  if (newCount.match(/[^0-9]/)) {
    alert("Count must be numbers only");
    return false;
  }

  if (newName === '' || newCount === '') {
    alert("Input field can't be empty");
    return false;
  }

  var li = document.createElement('li');
  li.classList.add('list-item');

  var nameLabel = document.createElement("label");
  nameLabel.classList.add('list-item-name');
  nameLabel.innerText = newName;
  var editNameInput = document.createElement("input");
  editNameInput.type = "text";
  var countLabel = document.createElement("label");
  countLabel.classList.add('list-item-count');
  countLabel.innerText = newCount;
  var editCountInput = document.createElement("input");
  editCountInput.type = "text";
  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";
  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  li.appendChild(nameLabel);
  li.appendChild(editNameInput);
  li.appendChild(countLabel);
  li.appendChild(editCountInput);
  li.appendChild(editButton);
  li.appendChild (document.createTextNode(" "));
  li.appendChild(deleteButton);
  bindTaskEvents(li);
  container.appendChild(li)
  form.reset();
});

// Filtering out our list items by search query
// Get input element
var filterInput = document.getElementById('filterInput');
// Add event listener
filterInput.addEventListener('keyup', filterItems);
function filterItems(e) {
  /// Get value of input
  var filterValue = e.target.value.toUpperCase();

  const ul = container;
  // Get li's from ul
  var li = ul.querySelectorAll('li.list-item');
  // Loop through list-item li's
  for (var i = 0; i < li.length; i++) {
    var name = li[i].getElementsByClassName('list-item-name')[0];

    // If matched
    if (name.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
};

// Sorting our list items by chosen method
var sortingMethod = document.getElementById('sorting');
// Track the changes to the sorting method
sortingMethod.onchange = function(e) {
    var method = e.target.value;
    var methodsArr = [
      'alphabetical', 
      'reverse', 
      'shortest', 
      'longest', 
      'least', 
      'greatest'
    ];
    var index = methodsArr.indexOf(method);

    // All list item elements - push the innerHTML to an array of objects
    var listItemNames = document.querySelectorAll('.list-item-name');
    var listItemCounts = document.querySelectorAll('.list-item-count');
    var names = [];
    var counts = [];
    for (var i = 0; i < listItemNames.length; i++) {
      names.push(listItemNames[i].innerHTML);
      counts.push(listItemCounts[i].innerHTML);
    }

    //1) combine the names & counts arrays - create an array of objects:
    var list = [];
    for (var j = 0; j < listItemNames.length; j++) 
    list.push({'name': names[j], 'count': counts[j]});

    //2) sort according to method index:
    // Let's make a copy so that our inital array is untouched
    var newList = list.slice()
    var msg;

    switch (index) {
      case 0:
        msg = 'Alphabetical order';
        newList.sort(function(a, b) {
          var strA = a.name.toLowerCase();
          var strB = b.name.toLowerCase();
          if (strA < strB) {
            return -1;
          }
          if (strA > strB) {
            return 1;
          }
          return 0;
        });
        break;
      case 1:
        msg = 'Reverse alphabetical order';
        newList.sort(function(a, b) {
          var strA = a.name.toLowerCase();
          var strB = b.name.toLowerCase();
          if (strA < strB) {
            return 1;
          }
          if (strA > strB) {
            return -1;
          }
          return 0;
        });
        break;
      case 2:
        msg = 'Shortest item name first';
        newList.sort(function(a, b){
          if (a.name.length < b.name.length) {
            return -1;
          }
          if (a.name.length > b.name.length) {
            return 1;
          }
          return 0;
        });
        break;
      case 3:
        msg = 'Longest item name first';
        newList.sort(function(a, b){
          if (a.name.length < b.name.length) {
            return 1;
          }
          if (a.name.length > b.name.length) {
            return -1;
          }
          return 0;
        });
        break;
      case 4:
        msg = 'Least qty amount first';
        newList.sort(function(a, b) {
          return a.count - b.count;
        });
        break;
      case 5:
        msg = 'Greatest qty first';
        newList.sort(function(a, b) {
          return b.count - a.count;
        });
        break;
      default:
        msg = 'Default message';
        break;
    }

    //3) separate them back out:
    for (var k = 0; k < list.length; k++) {
    names[k] = newList[k].name;
    counts[k] = newList[k].count;
    }

    // Change the HTML content now
    for (var i = 0; i < listItemNames.length; i++) {
    listItemNames[i].innerHTML = names[i];
    listItemCounts[i].innerHTML = counts[i];
    }

  };

// Handle the delete
var deleteButtons = container.querySelectorAll('button.delete');

console.log(deleteButtons)

// Edit an existing entry
var editEntry = function() {
  console.log("Editing entry...");
  var listItem = this.parentNode;
  var editNameInput = listItem.querySelectorAll("input[type=text]")[0];
  var editCountInput = listItem.querySelectorAll("input[type=text]")[1];
  var nameLabel = listItem.querySelectorAll("label")[0];
  var countLabel = listItem.querySelectorAll("label")[1];

  var containsClass = listItem.classList.contains("editMode");

  // if class of the parent is .editMode
  if (containsClass) {
      // Switch from .editMode
      // label text become the input's value
      nameLabel.innerText = editNameInput.value;
      countLabel.innerText = editCountInput.value;
  } else {
      // Switch to .editMode
      // input value becomes the labels text
      editNameInput.value = nameLabel.innerText;
      editCountInput.value = countLabel.innerText;
  }
  // Toggle .editMode on the parent 
  listItem.classList.toggle("editMode");
}

// Delete an existing entry
var deleteEntry = function () {
  console.log("Delete Task...");
  // Remove the parent list item from the ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
}

var bindTaskEvents = function(taskListItem) {
  console.log("Bind List item events");
  // select listitems chidlren
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editEntry;
  //bind deleteTask to delete button
   deleteButton.onclick = deleteEntry;

}

for (var i = 0; i < list.children.length; i++) {
  //bind events to list item's children (taskCompleted)	
  bindTaskEvents(list.children[i]);
}





// How to have an inital render alphabetically & when a new item is added

// On initial page load - sort everything alphabetically
// window.onload = function(e) {
//   console.log('Page Loaded!');
// }

