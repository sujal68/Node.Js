module.exports.setFlash = function (req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.warning = req.flash('warning');
    res.locals.info = req.flash('info');
    
    // Legacy support
    res.locals.flash = {
        'success': res.locals.success,
        'error': res.locals.error,
        'warning': res.locals.warning,
        'info': res.locals.info
    };

    next();
}