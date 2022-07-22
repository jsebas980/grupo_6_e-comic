const mainController = {
    index: (req, res) => {
        res.render("index");
    },
    productDetail: (req, res) => {
        res.render("productDetail");
    },
    productCart: (req, res) => {
        res.render("productCart");
    },
    productEdit: (req, res) => {
        res.render("productEdit");
    },
    productList: (req, res) => {
        res.render("productList");
    },
    productload: (req, res) => {
        res.render("productload");
    },
    login: (req, res) => {
        res.render("login");
    },
    register: (req, res) => {
        res.render("register");
    },
};

module.exports = mainController;