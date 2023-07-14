const mongoose = require('mongoose');

const pengunjungSchema = new mongoose.Schema({
 
  nama: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },
});

const PengunjungModel = mongoose.model('Pengunjung', pengunjungSchema);

module.exports = PengunjungModel;
