const mainController = {
    index: (req, res) => {
        res.render("index");
    },
    productDetail: (req, res) => {
        res.render("./products/productDetail.ejs");
    },
    productCart: (req, res) => {
        res.render("./products/productCart");
    },
    productEdit: (req, res) => {
        res.render("./products/productEdit");
    },
    productList: (req, res) => {
        res.render("./products/productList");
    },
    productload: (req, res) => {
        res.render("./products/productload");
    },
    login: (req, res) => {
        res.render("./users/login");
    },
    register: (req, res) => {
        res.render("./users/register");
    },
};

module.exports = mainController;