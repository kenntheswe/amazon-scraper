const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());