
const allowed_access = (req, res, next) => {
    if (req.session.userid == undefined) {
        res.redirect('/logout');
    }
}


module.exports = allowed_access;