function storeItem(item){
    let  items = [];
    // Check if any items in ls
    if(localStorage.getItem('items') === null){
      // Push new item
      items.push(item);
    } else {
      // Get what is already in ls
      items = JSON.parse(localStorage.getItem('items'));
      // Push new item
      items.push(item);

    }
    localStorage.setItem('items', JSON.stringify(items));
}

function setItems(items){
    localStorage.setItem('items', JSON.stringify(items));
}

function getItemsFromStorage(){
    let items= [];
    if(localStorage.getItem('items') !== null){
      items = JSON.parse(localStorage.getItem('items'));
    } 

    return items;
}

export {getItemsFromStorage, storeItem, setItems};
