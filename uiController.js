import * as itemController  from "./itemController.js";

const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
}

function populateItemList(iltalList){

    let html = '';

    iltalList.forEach(function(item){
      html += `<li class="collection-item" id="item-${item.id}">
      <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>
    </li>`;
    });

    // Insert list items
    document.querySelector(UISelectors.itemList).innerHTML = html;

}

function getSelectors(){
    return UISelectors; 
}

function getItemInput(){
    return {
      name:document.querySelector(UISelectors.itemNameInput).value,
      calories:document.querySelector(UISelectors.itemCaloriesInput).value
    }
}

function addListItem(item){
    // Show the list
    document.querySelector(UISelectors.itemList).style.display = 'block';
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Add ID
    li.id = `item-${item.id}`;
    // Add HTML
    li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
    <a href="#" class="secondary-content">
      <i class="edit-item fa fa-pencil"></i>
    </a>`;
    // Insert item
    document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
}

function showTotalCalories(totalCalories){
    document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
}

function clearInput(){
    document.querySelector(UISelectors.itemNameInput).value = '';
    document.querySelector(UISelectors.itemCaloriesInput).value = '';
}

function clearEditState(){
    clearInput();
    document.querySelector(UISelectors.updateBtn).style.display = 'none';
    document.querySelector(UISelectors.deleteBtn).style.display = 'none';
    document.querySelector(UISelectors.backBtn).style.display = 'none';
    document.querySelector(UISelectors.addBtn).style.display = 'inline';
}

function hideList(){
    document.querySelector(UISelectors.itemList).style.display = 'none';
}

function showEditState(){
    document.querySelector(UISelectors.updateBtn).style.display = 'inline';
    document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
    document.querySelector(UISelectors.backBtn).style.display = 'inline';
    document.querySelector(UISelectors.addBtn).style.display = 'none';
}

function addItemToForm(){
    document.querySelector(UISelectors.itemNameInput).value = itemController.getCurrentItem().name;
    document.querySelector(UISelectors.itemCaloriesInput).value = itemController.getCurrentItem().calories;
    showEditState();
}

export {addItemToForm, hideList, clearEditState, clearInput, addListItem, showTotalCalories, getSelectors, populateItemList, getItemInput};