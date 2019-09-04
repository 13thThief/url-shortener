'use strict';

let dns = require('dns');
let regex = new RegExp(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}/i);

let API = require('../api/api');

// GET /api/shorturl/:short_url
let fetch = (req, res, next) => {
  let shortid = req.params.short_url;
  // Short url is only of length 5
  if (shortid.length !== 5)
    return  res
              .status(400) // Bad Request
              .json({ error: "No short url found for given input OR Wrong Format" });

  API
    .fetchURL(shortid)
    .then( result => {
      if (!result.length)
       return res
                .status(400) // Bad request
                .json({ error: "No short url found for given input OR Wrong Format" });
      return res.redirect(result[0].url)
    })
    .catch( e => {
      console.error('Error Controller.fetch', e);
      next(e)
    })
}

// POST /api/shorturl/new
let create = (req, res, next) => {
  let url = req.body.url;

  // Check if the url is valid
  let isValidURL = regex.test(url);

  if (!isValidURL)
      return res
              .status(400) // Bad request
              .json({ error: "invalid URL" })

  // Check if the url is already in the database
  API
    .itExists(url)
    .then(result => {
      if (result.length > 0)
        return res.json({ original_url: url, short_url: result[0].short_url })
      // Check if DNS can resolve the url
      if (canDNSResolve(url)) {
        // If yes, generate short ID for the url
        API.generateShortID(url)
        .then( shortID => 
          res.json({ original_url: url, short_url: shortID})
        )
      }
      else return res
                    .status(400) // Bad request
                    .json({ error: "invalid Hostname" });
    })
    .catch( e => {
      console.error('Error Controller.itExists', e);
      next(e)
    })
}
  
function canDNSResolve(url){
  let hostname = new URL(url).hostname;
  return dns.resolve(hostname, err => !Boolean(err));
}

module.exports = {
  create,
  fetch
}