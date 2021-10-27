import * as localStorage  from "./localStorage.js";
import * as itemController  from "./itemController.js";
import * as uiController  from "./uiController.js";


  // Load event listeners
function loadEventListeners(){
    // Get UI selectors
    const UISelectors = uiController.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

     // Back button event
     document.querySelector(UISelectors.backBtn).addEventListener('click', uiController.clearEditState);

     // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
}

function init(){

    // Clear edit state / set initial set
    uiController.clearEditState();

    // Fetch items from data structure
    const items = itemController.getItems();

    // Check if any items
    if(items.length === 0){
        uiController.hideList();
    } else {
        // Populate list with items
        uiController.populateItemList(items);
    }

    // Get total calories
    const totalCalories = itemController.getTotalCalories();
    // Add total calories to UI
    uiController.showTotalCalories(totalCalories);

    // Load event listeners
    loadEventListeners();

}

// Add item submit
function itemAddSubmit(e){
    // Get form input from UI Controller
    const input = uiController.getItemInput();

    // Check for name and calorie input
    if(input.name !== '' && input.calories !== ''){
      // Add item
      const newItem = itemController.addItem(input.name, input.calories);
      console.log(newItem)

      // Add item to UI list
      uiController.addListItem(newItem);

      // Get total calories
      const totalCalories = itemController.getTotalCalories();
      // Add total calories to UI
      uiController.showTotalCalories(totalCalories);

      //Store in localStorage
      localStorage.storeItem(newItem);

      // Clear fields
      uiController.clearInput();
    }

    e.preventDefault();
}

  // Click edit item
function itemEditClick(e){
    if(e.target.classList.contains('edit-item')){
      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = itemController.getItemById(id);

      // Set current item
      itemController.setCurrentItem(itemToEdit);

      // Add item to form
      uiController.addItemToForm();
    }

    e.preventDefault();
}

 // Update item submit
function itemUpdateSubmit(e){
    // Get item input
    const input = uiController.getItemInput();

    // Update item
    itemController.updateItem(input.name, input.calories);

    // Update UI
    uiController.populateItemList(itemController.getItems());
     // Get total calories
     const totalCalories = itemController.getTotalCalories();
     // Add total calories to UI
     uiController.showTotalCalories(totalCalories);

     uiController.clearEditState();

    e.preventDefault();
}

 // Delete button event
 function itemDeleteSubmit(e){
    // Get current item
    const currentItem = itemController.getCurrentItem();

    // Delete from data structure
    itemController.deleteItem(currentItem.id);

    // Delete from UI
    uiController.populateItemList(itemController.getItems());

    // Get total calories
    const totalCalories = itemController.getTotalCalories();
    // Add total calories to UI
    uiController.showTotalCalories(totalCalories);


    uiController.clearEditState();

    e.preventDefault();
  }

   // Clear items event
   const clearAllItemsClick = function(){
    // Delete all items from data structure
    itemController.clearAllItems();

    // Get total calories
    const totalCalories = itemController.getTotalCalories();
    // Add total calories to UI
    uiController.showTotalCalories(totalCalories);

    // Remove from UI
    uiController.populateItemList(itemController.getItems());


    // Hide UL
    uiController.hideList();
    
  }

init();
