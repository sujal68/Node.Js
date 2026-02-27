const moment = require("moment");
const ManagerService = require("../../services/manager/manager.service");
const { successResponse } = require("../../utils/response");
const { MSG } = require("../../utils/msg");

const managerService = new ManagerService();

module.exports.createManager = async (req, res) => {

    req.body.created_date = moment().format("YYYY-MM-DD HH:mm:ss");
    req.body.updated_date = moment().format("YYYY-MM-DD HH:mm:ss");

    const manager = await managerService.createManager(req.body);

    return res.status(201).json(successResponse(201, MSG.Manager_Created, manager));
};

module.exports.getManagers = async (req, res) => {

    const data = await managerService.getAll();
    return res.status(200).json(successResponse(200, "Managers Fetched", data));
};

module.exports.deleteManager = async (req, res) => {

    await managerService.deleteById(req.params.id);
    return res.status(200).json(successResponse(200, MSG.Manager_Deleted));
};

module.exports.updateManager = async (req, res) => {

    req.body.updated_date = moment().format("YYYY-MM-DD HH:mm:ss");

    const updated = await managerService.updateById(req.params.id, req.body);

    return res.status(200).json(successResponse(200, MSG.Manager_Updated, updated));
};