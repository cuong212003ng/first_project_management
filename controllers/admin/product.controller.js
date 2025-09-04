const Product = require('../../models/product.model')
const filterStatusHelper = require('../../helpers/filterStatus')
const SearchHelper = require('../../helpers/Search')
const paginationHelper = require('../../helpers/pagination')
const systemConfig = require('../../config/system')

//[GET] /admin/products
module.exports.product = async (req, res) => {
    let find = {
        deleted: false
    }

    // Đoạn bộ lọc
    const filterStatus = filterStatusHelper(req.query)

    // Đoạn tìm kiếm
    
    const objectSearch = SearchHelper(req.query)

    if(objectSearch.regex) {
        find.title = objectSearch.regex
    }


    // Đoạn phân trang
    const countProducts =  await Product.countDocuments(find)

    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItem: 4
        },
        countProducts,
        req.query

    )

    // Đoạn lọc trạng thái
    if (req.query.status) {
        find.status = req.query.status
    }

    // Đoạn lấy dữ liệu
    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip)

    res.render("admin/pages/products/index", {
        titlePage: "Quản lý sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

//[GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    // console.log(req.params);
    const status = req.params.status
    const id = req.params.id

    await Product.updateOne({ _id: id }, { status: status })
    
    // res.send(`${status} - ${id}`)
    res.redirect(req.get('referer') || req.originalUrl || '/');



}