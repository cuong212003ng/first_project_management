const Product = require('../../models/product.model')
const filterStatusHelper = require('../../helpers/filterStatus')
//[GET] /admin/products
module.exports.product = async (req, res) => {

    // console.log(req.query.status);
    
    // Đoạn bộ lọc

    const filterStatus = filterStatusHelper(req.query)

    // End bộ lọc

    let find = {
        deleted: false
    }

    // Đoạn tìm kiếm
    let keyword = ""

    if(req.query.keyword) {

        keyword = req.query.keyword

        const regex = new RegExp(keyword, "i") // chức năng tìm kiếm từ khóa không phân biệt hoa thường

        find.title = regex
    }

    // Đoạn lọc trạng thái
    if (req.query.status) {
        find.status = req.query.status
    }

    // Đoạn lấy dữ liệu
    const products = await Product.find(find)

    // console.log(products);

    res.render("admin/pages/products/index", {
        titlePage: "Quản lý sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    })
}