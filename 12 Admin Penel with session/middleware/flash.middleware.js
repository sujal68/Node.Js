module.exports.setFlash = function (req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    
    // Legacy support
    res.locals.flash = {
        'success': res.locals.success,
        'error': res.locals.error
    };

    next();
}