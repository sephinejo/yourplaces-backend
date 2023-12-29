const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = 'pk.84831afac35cafe02994d26f560481bb';

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${encodeURIComponent(
      address
    )}&format=json`
  );

  const data = response.data;

  if (!data) {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const { lat, lon } = data[0];
  const coordinates = { lat, lng: lon };

  return coordinates;
}

module.exports = getCoordsForAddress;
