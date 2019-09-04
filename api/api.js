'use strict';

let nanoid = require('nanoid');
let URL = require('../models/URL');

// Query the database for short url
let fetchURL = async shortID => {
  try {
    let result = await URL
                        .query()
                        .where('short_url', '=', shortID);
    return result;
  } catch(e) {
    console.error('Error in API.fetchURL', e);
  }
}

let generateShortID = async url => {
  /* Assuming that there will be no collisions,
   * else we can increase the length of ID
   * or check in the db before inserting
   */
  let shortID = nanoid(5);

  try {
    let result = await URL
                        .query()
                        .insert({
                          url: url,
                          short_url: shortID
                        })
    return result.short_url;
  } catch(e) {
    console.error('Error in API.generateShortID', e);
  }
}

// Check if the url already exists in the database
let itExists = async url => {
  try {
    let result = await URL
                        .query()
                        .where('url', '=', url);
    return result;
  } catch(e) {
    console.error('Error in API.itExists', e);
  }
}

module.exports = {
  fetchURL,
  generateShortID,
  itExists
}