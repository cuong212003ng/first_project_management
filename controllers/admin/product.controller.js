module.exports.product = (req, res) => {
    res.render("admin/pages/products/index", {
        titlePage: "Quản lý sản phẩm"
    })
}