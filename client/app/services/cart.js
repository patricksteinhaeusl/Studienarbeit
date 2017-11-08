'use strict';

appServices.service('CartService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

  let storageItems = { items: JSON.parse(localStorageService.get('items')) };

  let getItems = function() {
    return storageItems;
  };

  let insert = function(product) {
    let found = false;
    let item = {
      quantity: 1,
      product: product
    };

    if(!storageItems.items) {
      storageItems.items = [];
      storageItems.items.push(item);
    } else {
      storageItems.items.forEach(function(element) {
        if(element.product._id === item.product._id) {
          found = true;
          element.quantity++;
          return found;
        }
      });
      if(!found) {
        storageItems.items.push(item);
      }
    }
    localStorageService.set('items', JSON.stringify(storageItems.items));
  };

  let getTotalPrice = function() {
    let totalPrice = 0;

    storageItems.items.forEach(function(element) {
      totalPrice += element.product.price * element.quantity;
    });

    return totalPrice;
  };

  return {
    getItems: getItems,
    insert: insert,
    getTotalPrice : getTotalPrice
  };
}]);