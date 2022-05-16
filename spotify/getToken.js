
const express = require("express");
require("dotenv").config();
const fetch = require("node-fetch");

var client_id = process.env.CLIENT_KEY;
var client_secret = process.env.CLIENT_SECRET;

const fetchToken = async () => {
  const url = "https://accounts.spotify.com/api/token";
  const headers = {
    Authorization:
      "Basic " +
      new Buffer.from(client_id + ":" + client_secret).toString("base64"),
  };

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: params,
  });
  const data = await response.json();

  return  data.access_token;
};

module.exports = { fetchToken };
