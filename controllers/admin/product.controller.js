const Product = require('../../models/product.model')

//[GET] /admin/products
module.exports.product = async (req, res) => {

    const products = await Product.find({})

    console.log(products);

    res.render("admin/pages/products/index", {
        titlePage: "Quản lý sản phẩm",
        products: products

    })
}