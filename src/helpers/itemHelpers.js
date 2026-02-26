// src/helpers/itemHelpers.js
// Helper functions for adding, deleting, and editing items in the Stocktake database

import axios from 'axios'

//API endpoints
const API_PREFIX_SHORT = "http://localhost:3001";
const API_PREFIX_LONG = API_PREFIX_SHORT + "/api/inft3050"

//Add new item to Stocktake DB (server)  
const tryAddNewItem = (sourceId, productId, quantity, price) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    let newItem = {
        SourceId: parseInt(sourceId,10),
        ProductId: parseInt(productId,10),
        Quantity: parseInt(quantity,10),
        Price: parseFloat(price),
    }

    console.log(newItem);
    // Post new item to server
    axios.post(API_PREFIX_LONG + "/Stocktake", newItem,
        { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
        .then(response => {
            alert("Item created successfully!");
            window.location.reload();
        }).catch(error => {
            if (error.message) {
                alert("Error: " + error.message);
            } else {
                alert("An error occurred while creating the item.");
            }
        })




}



//delete item from Stocktake DB (server)
const tryDeleteItem = (itemId) => {
    const headers = {
        'Accept': 'application/json',
    };
    axios.delete(API_PREFIX_LONG + "/Stocktake/" + itemId,
        { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
        .then(response => {
            alert("Item deleted successfully!");
            window.location.reload();
        }).catch(error => {
            if (error.message) {
                alert("Error: " + error.message);
            } else {
                alert("An error occurred while deleting the item.");
            }
        })
}

//edit item in Stocktake DB (server)
const tryEditItem = (itemId, sourceId, quantity, price) => {
    const headers = {
        'Accept': 'application/json',
    };
    
    let updatedItem = {
        SourceId: sourceId,
        Quantity: quantity,
        Price: price,
    }

    // Patch updated item to server
    axios.patch(API_PREFIX_LONG + "/Stocktake/" + itemId, updatedItem,
        { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
        .then(response => {
            alert("Item updated successfully!");
            window.location.reload();
        }).catch(error => {
            if (error.message) {
                alert("Error: " + error.message);
            } else {
                alert("An error occurred while updating the item.");
            }
        })
}

export { tryAddNewItem, tryDeleteItem, tryEditItem };