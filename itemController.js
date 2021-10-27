import * as localStorage  from "./localStorage.js";
import * as idGenerator from "./idGenerator.js";


const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
}

// Data Structure / State
const data = {
    items: localStorage.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
}

const ids = idGenerator.createId(data.items.length + 1);

function getItems(){
    return data.items;
}

function getItemById(id){
    let found = null;
    // Loop through items
    data.items.forEach(function(item){
      if(item.id === id){
        found = item;
      }
    });
    return found;
}

function setCurrentItem(item){
    data.currentItem = item;
}

function getCurrentItem(){
    return data.currentItem;
}

function addItem(name, calories){
    let id = ids.next().value;
    console.log(id)
    let newItem = new Item(id, name, parseInt(calories));

    data.items.push(newItem);

    return newItem;

}

function updateItem(name, calories){
    // Calories to number
    calories = parseInt(calories);

    let found = null;

    data.items.forEach(function(item){
      if(item.id === data.currentItem.id){
        item.name = name;
        item.calories = calories;
        found = item;
      }
    });

    localStorage.setItems(data.items);

    return found;
}

function deleteItem(id){
    // Get ids
    const ids = data.items.map(function(item){
      return item.id;
    });

    // Get index
    const index = ids.indexOf(id);

    // Remove item
    data.items.splice(index, 1);

    localStorage.setItems(data.items);
}

function clearAllItems(){
    data.items = [];
    localStorage.setItems(data.items);
}

function getTotalCalories(){
    let total = 0;

    // Loop through items and add cals
    data.items.forEach(function(item){
      total += item.calories;
    });

    // Set total cal in data structure
    data.totalCalories = total;

    // Return total
    return data.totalCalories;
}

export {clearAllItems, deleteItem, updateItem, getCurrentItem, setCurrentItem, getItemById, getTotalCalories, getItems, addItem};