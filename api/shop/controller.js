const service = require("./service");

exports.addItem = async (req, res, next) => {
  try {
    const { status, response } = await service.addItem(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getItems = async (req, res, next) => {
  try {
    const { status, response } = await service.getItems();
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getItem = async (req, res, next) => {
  try {
    const { status, response } = await service.getItem(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const { status, response } = await service.updateItem(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const { status, response } = await service.deleteItem(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.createBill = async (req, res, next) => {
  try {
    const { status, response } = await service.createBill(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getBills = async (req, res, next) => {
  try {
    const { status, response } = await service.getBills(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getBill = async (req, res, next) => {
  try {
    const { status, response } = await service.getBill(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateBill = async (req, res, next) => {
  try {
    const {status,response} = await service.updateBill(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.deleteBill = async (req, res, next) => {
  try {
    const {status,response} = await service.deleteBill(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};
