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
    // console.log(objectSearch);

    if(objectSearch.regex) {
        find.title = objectSearch.regex
    }


    // Pagination
    let objectPagination = {
        currentPage: 1,
        limitItem: 4
    }


    if(req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page) 
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem

    console.log(objectPagination.skip);

    const countProducts =  await Product.countDocuments(find)

    const totalPage =  Math.ceil(countProducts / objectPagination.limitItem)

    objectPagination.totalPage = totalPage

    // End pagination

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
        pagination: objectPagination,
    })
}