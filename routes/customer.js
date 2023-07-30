const customerModel = require("../models/customerModel");
const CustomerModel = require("../models/customerModel");
const express = require("express");
const router = express.Router();

// Create new customer
router.post("/customer", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const customerModel = new CustomerModel(req.body);
  customerModel
    .save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get a specific customer
router.get("/customer", (req, res) => {
  if (!req.query.email) {
    customerModel
      .find()
      .then((doc) => {
        return res.json(doc);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    customerModel
      .findOne({
        email: req.query.email,
      })
      .then((doc) => {
        return res.json(doc);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
});

// Update customer information
router.put("/customer", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Missing URL parameter: email");
  }

  customerModel
    .findOneAndUpdate(
      {
        email: req.query.email,
      },
      req.body,
      {
        new: true,
      }
    )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/customer", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Missing URL parameter: email");
  }

  customerModel
    .findOneAndRemove({
      email: req.query.email,
    })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
