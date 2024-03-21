const express = require("express");
const controller = require("./controller");

const router = express.Router();

router
  .route("/item")
  .get( controller.getItems)
  .post(  controller.addItem);

router
  .route("/item/:id")
  .get( controller.getItem)
  .put( controller.updateItem)
  .delete( controller.deleteItem);

router
  .route("/bill")
  .get( controller.getBills)
  .post( controller.createBill);

router
  .route("/bill/:id")
  .get( controller.getBill)
  .put( controller.updateBill)
  .delete( controller.deleteBill);

module.exports = router;
