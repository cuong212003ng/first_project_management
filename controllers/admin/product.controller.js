const Product = require('../../models/product.model')
const filterStatusHelper = require('../../helpers/filterStatus')
const SearchHelper = require('../../helpers/Search')

//[GET] /admin/products
module.exports.product = async (req, res) => {
    let find = {
        deleted: false
    }

    // Đoạn bộ lọc
    const filterStatus = filterStatusHelper(req.query)
    // End bộ lọc

    // Đoạn tìm kiếm
    
    const objectSearch = SearchHelper(req.query)
    console.log(objectSearch);

    if(objectSearch.regex) {
        find.title = objectSearch.regex
    }

    // Đoạn lọc trạng thái
    if (req.query.status) {
        find.status = req.query.status
    }

    // Đoạn lấy dữ liệu
    const products = await Product.find(find)

    res.render("admin/pages/products/index", {
        titlePage: "Quản lý sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    })
}