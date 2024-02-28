const PatientController = require('../controllers/patient.controller');

module.exports = app => {
    app.get('/api/patients', PatientController.findAllPatients);
    app.get('/api/patients/:id', PatientController.findOneSinglePatient);
    app.post('/api/patients', PatientController.createNewPatient);
    app.patch('/api/patients/:id', PatientController.updateExistingPatient);
    app.delete('/api/patients/:id', PatientController.deleteAnExistingPatient);


}
