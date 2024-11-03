// src/actions/queryActions.js
const User = require('./usuario.model');
const cloudinary = require('../config/cloudinary');

// Acción para consultar usuarios
async function getUsersBd(filters) {
  try {
    const users = await User.find(filters);
    for (const user of users) {
      console.log('user', user.foto);
      if (user.foto) {
        console.log('entre al if');
        user.foto = cloudinary.url(user.foto, {
          width: 500,
          height: 500,
          Crop: "fill",
        });
      }
    }
    console.log(users.foto);
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

async function getUserByNroDocumento(nroDocumento) {
  try {
    const user = await User.findOne(nroDocumento);
    if (user.foto) {
      console.log('entre al if');
      user.foto = cloudinary.url(user.foto, {
        width: 500,
        height: 500,
        Crop: "fill",
      });
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = { getUsersBd, getUserByNroDocumento };