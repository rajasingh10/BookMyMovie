// const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bookmymovie",
});
exports.db = db;
