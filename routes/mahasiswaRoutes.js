const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswaController');
const validateMahasiswa = require('../validators/customMahasiswaValidator');

router.post('/tambah', (req, res) => {
  const errors = validateMahasiswa(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  mahasiswaController.tambahMahasiswa(req, res);
});

router.get('/semua', mahasiswaController.semuaMahasiswa);
router.get('/:id', mahasiswaController.detailMahasiswa);
router.get('/cari', mahasiswaController.cariMahasiswa);

router.put('/:id', (req, res) => {
  const errors = validateMahasiswa(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  mahasiswaController.updateMahasiswa(req, res);
});

router.delete('/:id', mahasiswaController.hapusMahasiswa);

module.exports = router;
