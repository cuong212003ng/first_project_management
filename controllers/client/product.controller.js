const Product = require('../../models/product.model')

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    })

    console.log(products);
    

    res.render("client/pages/product/index", {
        titlePage: "Danh sách sản phẩm",
        products: products
    })
}