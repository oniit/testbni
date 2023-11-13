const mongoose = require('mongoose');

const mahasiswaSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  jurusan: { type: String, required: true },
  angkatan: { type: Number, required: true },
});

const Mahasiswa = mongoose.model('Mahasiswa', mahasiswaSchema);

module.exports = Mahasiswa;
