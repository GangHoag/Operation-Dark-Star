const formatProducts = (arr) => {
  var newArr = [];
  arr.forEach((a) => {
    var obj = {};
    obj.id = a.id;
    obj.name = a.product_name;
    obj.slogan = a.slogan;
    obj.description = a.product_description;
    obj.category = a.category;
    obj.default_price = a.default_price;
    newArr.push(obj);
  })
  return newArr;
}

var singleProduct = (arr) => {
  var newArr = [];
  var obj = {};
    obj.id = arr[0].id;
    obj.name = arr[0].product_name;
    obj.slogan = arr[0].slogan;
    obj.description = arr[0].product_description;
    obj.category = arr[0].category;
    obj.default_price = arr[0].default_price;
  var feats = []
  arr.forEach((a) => {
    var fee = {};
      fee.feature = a.feature;
      fee.value = a.feature_value;
      feats.push(fee);
  })
    obj.features = feats;
  newArr.push(obj);
  return newArr;
}

var productStyles = (arr) => {
  var newObj = {}
  newObj.product_id = arr[0].product;
  newObj.results = [];
  arr.forEach((a) => {
    var obj = {};
    obj['default?'] = (a.style_default === 1 ? true : false);
    obj.name = a.style_name;
    obj.original_price = a.original_price;
    obj.sale_price = (a.sale_price === "null" ? null : a.sale_price);
    obj.style_id = a.id;
    obj.photos = [];
    obj.skus = {};
    a.photos.forEach((photo) => {
      var phoObj = {};
      phoObj.url = photo.base_url;
      phoObj.thumbnail_url = photo.thumbnail_url;
      obj.photos.push(phoObj);
    })
    a.skus.forEach((sku) => {
      obj.skus[sku.id] = {'quantity': sku.quantity, 'size': Number.parseFloat(sku.size)};
    })
    newObj.results.push(obj);
  })
  return newObj;
}

module.exports = {
  formatProducts,
  singleProduct,
  productStyles
}