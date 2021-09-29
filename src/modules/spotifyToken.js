const axios = require("axios");
const qs = require("qs");

const clientID = process.env.VUE_APP_CLIENT_ID;
const clientSecret = process.env.VUE_APP_CLIENT_SECRET;

const postHeaders = {
  headers: {
    Authorization:
      "Basic " + Buffer.from(`${clientID}:${clientSecret}`).toString("base64"),
  },
};

let postBody = {
  grant_type: "client_credentials",
};

module.exports = getToken;
function getToken() {
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(postBody),
      postHeaders
    )
    .then(function(response) {
      return response.data.access_token;
    });
}
