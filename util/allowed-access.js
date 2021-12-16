
const allowed_access = (req, res, next) => {
    if (req.session.userid == undefined) {
        res.redirect('/nalozi/logout');
    }
}

module.exports = allowed_access;