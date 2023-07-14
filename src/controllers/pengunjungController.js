const PengunjungModel = require('../models/pengunjungModel');

exports.getAllPengunjung = async (req, res) => {
  try {
    const PengunjungList = await PengunjungModel.find();
    res.json(PengunjungList);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Pengunjung' });
  }
};

exports.getOnePengunjung = async (req, res) => {
  const { id } = req.params;

  try {
    const PengunjungList = await PengunjungModel.findById(id);
    res.json(PengunjungList);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Pengunjung' });
  }
};

exports.createPengunjung = async (req, res) => {
  const { nama, email, phone } = req.body;
  try {
    const newPengunjung = new PengunjungModel({ nama, email, phone });
    const savedPengunjung = await newPengunjung.save();
    res.status(201).json(savedPengunjung);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Pengunjung' });
  }
};

exports.deletePengunjung = async (req, res) => {
  const { id } = req.params;

  try {
    await PengunjungModel.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Pengunjung' });
  }
};

exports.editPengunjung = async (req, res) => {
  const { id } = req.params;
  const { nama, email, phone } = req.body;

  try {
    const updatedPengunjung = await PengunjungModel.findByIdAndUpdate(
      id,
      { nama, email, phone },
      { new: true }
    );
    res.json(updatedPengunjung);
  } catch (error) {
    res.status(500).json({ message: 'Error editing Pengunjung' });
  }
};
