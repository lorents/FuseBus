var Storage = require('FuseJS/Storage');

var data = 'favorites';


/* ...
-----------------------------------------------------------------------------*/
var addFavorite
, deleteFavorite
, getFavorites;



/* Functions
-----------------------------------------------------------------------------*/
addFavorite = function(id, favName) {
  var favorite = getFavorites();

  if (favorite[id]) {
    return;
  }

  favorite[id] = { name: favName };
  Storage.writeSync(data, JSON.stringify(favorite));
};

deleteFavorite = function(id) {
  var favorite = getFavorites();

  if (favorite[id]) {
    delete favorite[id];
    Storage.writeSync(data, JSON.stringify(favorite));
  }
};

getFavorites = function() {
  var favorites = JSON.parse(Storage.readSync(data));

  if (favorites === null) {
    favorites = {};
    Storage.write(data, JSON.stringify(favorites));
  }

  return favorites;
};


/* Exports
-----------------------------------------------------------------------------*/
module.exports = {
  addFavorite: addFavorite,
  deleteFavorite: deleteFavorite,
  getFavorites: getFavorites
};