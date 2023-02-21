function logueado(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect(`/user/editar/${req.session.userLogged.nombre_usuario}`);
	}
	 next();
}

module.exports = logueado;