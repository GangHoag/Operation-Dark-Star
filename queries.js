const db = require('./dbSetup.js')
var help = require('./formatHelpers');

const getLimitedProducts = async () => {
  var data = await db.query("SELECT * FROM product LIMIT 5").catch((err) => { throw err; })
  if (data.length === 0) {
    return 'No Data Found';
  }
  data = help.formatProducts(data);
  return data
}

const getSpecificProduct = async (id) => {
  var data = await db.query(`SELECT * FROM features INNER JOIN product ON product.id = features.product WHERE product.id = ${id}`).catch((err) => { throw err; });
  if (data.length === 0) {
    return 'No Data Found';
  }
  data = help.singleProduct(data);
  return data;
}

const getStyles = async (id) => {
  var productExists = await db.query(`SELECT * FROM features INNER JOIN product ON product.id = features.product WHERE product.id = ${id}`).catch((err) => { throw err; });
  var data = await db.query(`SELECT * FROM styles WHERE styles.product = ${id}`).catch((err) => {
    throw err;
  })
  if (typeof data !== 'object' || productExists.length === 0) {
    return 'No Data Found';
  }
  for(var i = 0; i < data.length; i++) {
    data[i].photos = await getPhotos(data[i].id);
    data[i].skus = await getSkus(data[i].id);
  }
  data = help.productStyles(data);
  return data;
}

const getPhotos = async (id) => {
  var data = await db.query(`SELECT base_url, thumbnail_url FROM photos WHERE photos.style = ${id}`)
  return data;
}

const getSkus = async (id) => {
  var data = await db.query(`SELECT id, quantity, size FROM skus WHERE skus.style = ${id}`)
  return data;
}

module.exports = {
  getLimitedProducts,
  getSpecificProduct,
  getStyles,
  getPhotos
};