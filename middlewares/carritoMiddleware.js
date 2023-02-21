function carrito(req, res, next) {
	if (!req.session.userLogged) {
		return res.render('error-carrito');
	}
	 next();
}

module.exports = carrito;