const NOC = require('../models/noc.model');

// Apply for NOC
exports.applyNOC = async (req, res) => {
  try {
    const { fullName, mobile, email, address, buildingType, propertySize, hasFireSafety, extinguishers, smokeDetectors, waterSprinklers, declaration } = req.body;
    
    const aadhaarCard = req.files['aadhaarCard'] ? req.files['aadhaarCard'][0].path : null;
    const panCard = req.files['panCard'] ? req.files['panCard'][0].path : null;
    const fireSafetyCert = req.files['fireSafetyCert'] ? req.files['fireSafetyCert'][0].path : null;

    if (!aadhaarCard || !panCard) {
      return res.status(400).json({ message: 'Aadhaar and PAN card are required' });
    }

    const newNOC = new NOC({
      fullName, mobile, email, address, buildingType, propertySize, hasFireSafety, extinguishers, smokeDetectors, waterSprinklers, declaration,
      aadhaarCard, panCard, fireSafetyCert
    });

    await newNOC.save();
    res.status(201).json({ message: 'NOC Application submitted successfully', data: newNOC });

  } catch (error) {
    res.status(500).json({ message: 'Error applying for NOC', error: error.message });
  }
};

// Get all NOC applications (Admin)
exports.getAllNOCApplications = async (req, res) => {
  try {
    const nocApplications = await NOC.find();
    res.status(200).json(nocApplications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
};

// Get a specific NOC application
exports.getNOCApplication = async (req, res) => {
  try {
    const noc = await NOC.findById(req.params.id);
    if (!noc) return res.status(404).json({ message: 'NOC Application not found' });
    res.status(200).json(noc);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application', error: error.message });
  }
};

// Update NOC status (Admin)
exports.updateNOCStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedNOC = await NOC.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedNOC) return res.status(404).json({ message: 'NOC Application not found' });
    res.status(200).json({ message: 'NOC status updated', data: updatedNOC });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};
