const validateMahasiswa = (mahasiswa) => {
    const errors = {};
  
    if (!mahasiswa.nama || mahasiswa.nama.trim() === '') {
      errors.nama = 'Nama tidak boleh kosong';
    }
  
    if (!mahasiswa.jurusan || mahasiswa.jurusan.trim() === '') {
      errors.jurusan = 'Jurusan tidak boleh kosong';
    }
  
    if (!mahasiswa.angkatan || isNaN(mahasiswa.angkatan)) {
      errors.angkatan = 'Angkatan harus berupa angka';
    }
  
    return errors;
  };
  
  module.exports = validateMahasiswa;
  