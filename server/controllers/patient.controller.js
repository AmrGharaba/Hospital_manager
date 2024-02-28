const Patient = require('../models/patient.models');

module.exports.findAllPatients = (req, res) => {
    Patient.find().collation({ locale: 'en', strength: 2 }).sort({ name: 1 })
        .then((allPatients) => {
            res.json({ Patients: allPatients })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.findOneSinglePatient = (req, res) => {
    Patient.findOne({ _id: req.params.id })
        .then(oneSinglePatient => {
            res.json({ Patient: oneSinglePatient })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.createNewPatient = (req, res) => {
    Patient.create(req.body)
        .then(newlyCreatedPatient => {
            res.json({ Patient: newlyCreatedPatient })
        })
        .catch(err => res.status(400).json(err))
}

module.exports.updateExistingPatient = (req, res) => {
    Patient.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedPatient => {
            res.json({ Patient: updatedPatient })
        })
        .catch(err => res.status(400).json(err))
}


module.exports.deleteAnExistingPatient = (req, res) => {
    Patient.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json(err)
        });
}
