
const express = require("express");


const logger = require("morgan");


const favicon = require("serve-favicon");

const path = require("path");


module.exports = (app) => {

  app.use(logger("dev"));


  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));


  app.set("views", path.join(__dirname, "..", "views"));

  app.set("view engine", "hbs");
  // Handles access to the public folder
  app.use(express.static(path.join(__dirname, "..", "public")));

  // Handles access to the favicon
  app.use(favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));
};
