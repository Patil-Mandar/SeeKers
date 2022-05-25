
module.exports.login = (req, res) => {
    req.flash('success', 'LogedIn Successfully!')
    res.redirect('/dashboard');
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('warning', 'Sayonara!')
    res.redirect('/');
}