const Product = require('../../models/product.model')

//[GET] /admin/products
module.exports.product = async (req, res) => {

    // console.log(req.query.status);
    

    let filterStatus = [
        {
            name: "Tất cả",
            value: "",
            class: ""
        },
        {
            name: "Hoạt động",
            value: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            value: "inactive",
            class: ""
        }
    ]


    if(req.query.status) {
        const index = filterStatus.findIndex(item => item.value == req.query.status)
        filterStatus[index].class = "active"
    } else {
        const index = filterStatus.findIndex(item => item.value == "")
        filterStatus[index].class = "active"
    }

    
    let find = {
        deleted: false
    }

    let keyword = ""

    if(req.query.keyword) {

        keyword = req.query.keyword

        const regex = new RegExp(keyword, "i") // chức năng tìm kiếm từ khóa không phân biệt hoa thường

        find.title = regex
    }

    if (req.query.status) {
        find.status = req.query.status
    }

    let price = 0

    if(req.query.price == "true") {
        price = 20
        find.price = { $lte: price }
    }

    const products = await Product.find(find)

    // console.log(products);

    res.render("admin/pages/products/index", {
        titlePage: "Quản lý sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword,
        price: price
    })
}