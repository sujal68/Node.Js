
const home = (req, res) => {
    return res.render('home');
};

const Employee = (req, res) => {
    return res.render('Employee');
};

module.exports = {
    home,
    Employee
};