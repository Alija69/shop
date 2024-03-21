const express = require("express");
const httpStatus = require("http-status");
const { Item, Bill, BillItem } = require("./models");
const router = express.Router();

exports.addItem = async (req) => {
  try {
    const { name, price, quantity } = req.body;
    const newItem = await Item.create({ name, price, quantity });
    return { status: httpStatus.CREATED, response: newItem };
  } catch (error) {
    return { status: httpStatus.BAD_REQUEST, response: error.message };
  }
};

exports.getItems = async () => {
  try {
    const items = await Item.findAll({attributes: ["id", "name", "price","quantity"]});
    return { status: httpStatus.OK, response: items };
  } catch (error) {
    return { status: httpStatus.BAD_REQUEST, response: error.message };
  }
};

exports.getItem = async (req) => {
  try {
    const item = await Item.findByPk(req.params.id);
    return { status: httpStatus.OK, response: item };
  } catch (error) {
    return { status: httpStatus.BAD_REQUEST, response: error.message };
  }
};

exports.updateItem = async (req) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return {
        status: httpStatus.BAD_REQUEST,
        response: { message: "Item not found" },
      };
    }
    await item.update(req.body);
    return { status: httpStatus.OK, response: item };
  } catch (error) {
    return { status: httpStatus.BAD_REQUEST, response: error.message };
  }
};

exports.deleteItem = async (req) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return {
        status: httpStatus.BAD_REQUEST,
        response: { message: "Item not found" },
      };
    }
    await item.destroy();
    return { status: httpStatus.OK, response: { message: "Item deleted" } };
  } catch (error) {
    return { status: httpStatus.BAD_REQUEST, response: error.message };
  }
};

exports.createBill = async (req) => {
  try {
    const { totalAmount, itemId, quantity } = req.body;
    const item = await Item.findByPk(itemId);
    if (!item) {
      return {
        status: httpStatus.NOT_FOUND,
        response: { message: "Item not found" },
      };
    } else if (item.quantity < quantity) {
      return {
        status: httpStatus.BAD_REQUEST,
        response: { message: "Low quantity available" },
      };
    }
    item.quantity -= quantity;
    await item.save();
    const bill = await Bill.create({ totalAmount, itemId, quantity });
    return { status: httpStatus.CREATED, response: bill };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.NOT_FOUND, response: error.message };
  }
};

exports.getBills = async () => {
  try {
    const bills = await Bill.findAll({
      attributes: ["id", "totalAmount", "quantity"],
      include: [
        {
          model: Item,
          attributes: ["id", "name", "price"],
        },
      ],
    });
    return { status: httpStatus.OK, response: bills };
  } catch (error) {
    return { status: httpStatus.BAD_REQUEST, response: error.message };
  }
};

exports.getBill = async (req) => {
  try {
    const bill = await Bill.findByPk(req.params.id, {
      attributes: ["id", "totalAmount", "quantity"],
      include: [
        {
          model: Item,
          attributes: ["id", "name", "price"],
        },
      ],
    });
    if (!bill) {
      return {
        status: httpStatus.NOT_FOUND,
        response: { message: "Bill not found" },
      };
    }
    return { status: httpStatus.OK, response: bill };
  } catch (error) {
    return { status: httpStatus.BAD_REQUEST, response: error.message };
  }
};

exports.updateBill = async (req) => {
  try {
    const { totalAmount, quantity } = req.body;
    const bill = await Bill.findByPk(req.params.id);
    if (!bill) {
      return {
        status: httpStatus.BAD_REQUEST,
        response: { message: "Bill not found" },
      };
    }
    const item = await Item.findByPk(bill.itemId);
    if (Number(bill.quantity)+Number(item.quantity) < Number(quantity)) {
      return {
        status: httpStatus.BAD_REQUEST,
        response: { message: "Low quantity available" },
      };
    }
    item.quantity = Number(bill.quantity)+Number(item.quantity) - Number(quantity)
    await item.save();
    await bill.update({ totalAmount, quantity });
    return { status: httpStatus.OK, response: bill };
  } catch (error) {
    return { status: httpStatus.BAD_REQUEST, response: error.message };
  }
};

exports.deleteBill = async (req) => {
  try {
    const bill = await Bill.findByPk(req.params.id);
    if (!bill) {
      return {
        status: httpStatus.BAD_REQUEST,
        response: { message: "Bill not found" },
      };
    }
    await bill.destroy();
    return { status: httpStatus.OK, response: { message: "Bill deleted" } };
  } catch (error) {
    return { status: httpStatus.BAD_REQUEST, response: error.message };
  }
};
