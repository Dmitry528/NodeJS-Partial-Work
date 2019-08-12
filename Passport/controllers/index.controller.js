exports.home_page_get = (req, res) => {
    res.render('index', {
        title: 'Index page'
    });
};