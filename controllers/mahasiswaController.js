const Mahasiswa = require('../models/mahasiswa');
const validateMahasiswa = require('../validators/customMahasiswaValidator');

const mahasiswaController = {
  tambahMahasiswa: async (req, res) => {
    const { nama, jurusan, angkatan } = req.body;

    const mahasiswa = new Mahasiswa({ nama, jurusan, angkatan });

    const errors = validateMahasiswa(mahasiswa);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      await mahasiswa.save();

      res.json({ message: 'Data mahasiswa berhasil ditambahkan', data: mahasiswa });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  },

  semuaMahasiswa: async (req, res) => {
    try {
      const mahasiswas = await Mahasiswa.find();
      res.json({ data: mahasiswas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  },

  detailMahasiswa: async (req, res) => {
    const { id } = req.params;

    try {
      const mahasiswa = await Mahasiswa.findById(id);
      if (!mahasiswa) {
        return res.status(404).json({ message: 'Data mahasiswa tidak ditemukan' });
      }

      res.json({ data: mahasiswa });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  },

  cariMahasiswa: async (req, res) => {
    const { keyword } = req.query;

    try {
      const mahasiswas = await Mahasiswa.find({ nama: { $regex: keyword, $options: 'i' } });
      res.json({ data: mahasiswas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  },

  updateMahasiswa: async (req, res) => {
    const { id } = req.params;
    const { nama, jurusan, angkatan } = req.body;

    const mahasiswa = new Mahasiswa({ nama, jurusan, angkatan });
    const errors = validateMahasiswa(mahasiswa);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const updatedMahasiswa = await Mahasiswa.findByIdAndUpdate(
        id,
        { nama, jurusan, angkatan },
        { new: true }
      );

      if (!updatedMahasiswa) {
        return res.status(404).json({ message: 'Data mahasiswa tidak ditemukan' });
      }

      res.json({ message: 'Data mahasiswa berhasil diperbarui', data: updatedMahasiswa });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  },

  hapusMahasiswa: async (req, res) => {
    const { id } = req.params;

    try {
      const mahasiswa = await Mahasiswa.findByIdAndDelete(id);
      if (!mahasiswa) {
        return res.status(404).json({ message: 'Data mahasiswa tidak ditemukan' });
      }

      res.json({ message: 'Data mahasiswa berhasil dihapus', data: mahasiswa });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  },
};

module.exports = mahasiswaController;
