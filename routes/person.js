const express = require("express");
const router = express.Router();

router.get("/person", (request, response) => {
  if (request.query.name) {
    response.send(`You have requested a person ${request.query.name}`);
  } else {
    response.send("You have requested a person");
  }
});

router.get("/person/:name", (request, response) => {
  response.send(`You have requested a person ${request.params.name}`);
});

router.get("/error", (request, response) => {
  throw new Error("you have requested a person error");
});

module.exports = router;
