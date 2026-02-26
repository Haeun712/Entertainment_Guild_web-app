// src/helpers/productHelpers.js
// Helper functions for adding, deleting, and editing products in the Product database (for admin)

import axios from 'axios'

//API endpoints
const API_PREFIX_SHORT = "http://localhost:3001";
const API_PREFIX_LONG = API_PREFIX_SHORT + "/api/inft3050"

//Add new product to Product DB (server)  
const tryAddNewProduct = (name, author, description, genre, subGenre, published, navigate) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };


    const lastUpdatedBy = JSON.parse(sessionStorage.getItem('user')).userData.username;


    let newProduct = {
        Name: name,
        Author: author,
        Description: description,
        Genre: parseInt(genre, 10),
        SubGenre: parseInt(subGenre, 10),
        Published: published,
        LastUpdatedBy: lastUpdatedBy,
        LastUpdated: new Date().toISOString(),
    }

    console.log(newProduct);
    // Post new product to server
    axios.post(API_PREFIX_LONG + "/Product", newProduct,
        { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
        .then(response => {
            navigate('/admin/products');
            alert("Product created successfully!");
        }).catch(error => {
            if (error.message) {
                alert("Error: " + error.message);
            } else {
                alert("An error occurred while creating the product.");
            }
        })




}



//delete product from Product DB (server)
const tryDeleteProduct = (productID, navigate, page) => {
    const headers = {
        'Accept': 'application/json',
    };
    axios.delete(API_PREFIX_LONG + "/Product/" + productID,
        { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
        .then(response => {
            navigate('/admin/products?page=' + page);
            alert("Product deleted successfully!");
        }).catch(error => {
            if (error.message) {
                alert("Error: " + error.message);
            } else {
                alert("An error occurred while deleting the product.");
            }
        })
}

//edit product in Product DB (server)
const tryEditProduct = (productID, name, author, description, genre, subGenre, published, navigate) => {
    const headers = {
        'Accept': 'application/json',
    };

    const lastUpdatedBy = JSON.parse(sessionStorage.getItem('user')).userData.username;


    let updatedProduct = {
        Name: name,
        Author: author,
        Description: description,
        Genre: parseInt(genre, 10),
        SubGenre: parseInt(subGenre, 10),
        Published: published,
        LastUpdatedBy: lastUpdatedBy,
        LastUpdated: new Date().toISOString(),
    }

    // Patch updated product to server
    axios.patch(API_PREFIX_LONG + "/Product/" + productID, updatedProduct,
        { headers: headers, withCredentials: true }) //withCredentials to include auth cookie
        .then(response => {
            navigate('/admin/products/' + productID);
            alert("Product updated successfully!");
        }).catch(error => {
            if (error.message) {
                alert("Error: " + error.message);
            } else {
                alert("An error occurred while updating the product.");
            }
        })
}

export { tryAddNewProduct, tryDeleteProduct, tryEditProduct };