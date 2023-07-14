const express = require('express');
const router = express.Router();
const { loggerMiddleware } = require('./middleware');
const {
  getAllDosen,
  createDosen,
  deleteDosen,
  editDosen,
} = require('./controllers/dosenController');
const {
  getAllMahasiswa,
  createMahasiswa,
  deleteMahasiswa,
  editMahasiswa,
} = require('./controllers/mahasiswaController');
const {
  getAllPengunjung,
  createPengunjung,
  deletePengunjung,
  editPengunjung,
  getOnePengunjung,
} = require('./controllers/pengunjungController');
const {
  getAllUser,
  createregisterUser,
  createloginUser,
} = require('./controllers/userController');


// Middleware
router.use(loggerMiddleware);

// Dosen routes
router.get('/dosen', getAllDosen);
router.post('/dosen', createDosen);
router.delete('/dosen/:id', deleteDosen);
router.put('/dosen/:id', editDosen);


// Mahasiswa routes
router.get('/mahasiswa', getAllMahasiswa);
router.post('/mahasiswa', createMahasiswa);
router.delete('/mahasiswa/:id', deleteMahasiswa);
router.put('/mahasiswa/:id', editMahasiswa);

// Mahasiswa routes
router.get('/pengunjung', getAllPengunjung);
router.get('/pengunjung/:id', getOnePengunjung);
router.post('/pengunjung',   createPengunjung,);
router.delete('/pengunjung/:id', deletePengunjung);
router.put('/pengunjung/:id', editPengunjung);

// User routes
router.get('/user', getAllUser);
router.post('/register', createregisterUser);
router.post('/login', createloginUser);

module.exports = router;
