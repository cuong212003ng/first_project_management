module.exports.index = (req, res) => {
    res.render("client/pages/product/index", {
        titlePage: "Danh sách sản phẩm"
    })
}