// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = 'https://group3-mapd713.onrender.com'; // Replace this with the correct base URL

// chai.use(chaiHttp);
// const expect = chai.expect;

// // Begin the test suite for Patient API
// describe('Patient API Tests', () => {
//   let createdPatientId; // To store the ID of the patient created during testing

//   // Test for adding a new patient
//   describe('POST /patients/add', () => {
//     it('should add a new patient', (done) => {
//       const newPatient = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@example.com',
//         phoneNumber: '1234567890',
//         weight: '70',
//         height: '175',
//         address: '123 Main St',
//         gender: 1, // Assuming 1 for male, 0 for female
//       };

//       chai.request(server)
//         .post('/patients/add')
//         .set('Content-Type', 'application/json')
//         .send(newPatient)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(201);
//           expect(res).to.be.json;
//           expect(res.body).to.have.property('success').to.equal(true);
//           expect(res.body).to.have.property('message').to.equal('Patient added successfully.');
//           expect(res.body).to.have.property('data');
//           expect(res.body.data).to.have.property('_id');
//           createdPatientId = res.body.data._id; // Store the created patient ID
//           done();
//         });
//     });
//   });

//   // Test for getting patient details by ID
//   describe('GET /patients/view/:patientId', () => {
//     it('should get patient details by ID', (done) => {
//       chai.request(server)
//         .get(`/patients/view/${createdPatientId}`)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.have.property('success').to.equal(true);
//           expect(res.body).to.have.property('data');
//           expect(res.body.data).to.have.property('_id').to.equal(createdPatientId);
//           done();
//         });
//     });
//   });

//   // Test for getting patient details by name
//   describe('GET /patients/viewByName/:patientName', () => {
//     it('should get patient details by name', (done) => {
//       const patientName = 'John';

//       chai.request(server)
//         .get(`/patients/viewByName/${patientName}`)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.have.property('success').to.equal(true);
//           expect(res.body).to.have.property('data');
//           // Assuming only one patient with the name 'John' is returned
//           expect(res.body.data[0]).to.have.property('firstName').to.equal(patientName);
//           done();
//         });
//     });
//   });

//   // Test for getting patient details by email
//   describe('GET /patients/viewByEmail/:patientEmail', () => {
//     it('should get patient details by email', (done) => {
//       const patientEmail = 'john.doe@example.com';

//       chai.request(server)
//         .get(`/patients/viewByEmail/${patientEmail}`)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.have.property('success').to.equal(true);
//           expect(res.body).to.have.property('data');
//           // Assuming only one patient with the email 'john.doe@example.com' is returned
//           expect(res.body.data[0]).to.have.property('email').to.equal(patientEmail);
//           done();
//         });
//     });
//   });

//   // Test for getting a list of all patients
//   describe('GET /patients/list', () => {
//     it('should get a list of all patients', (done) => {
//       chai.request(server)
//         .get('/patients/list')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.have.property('success').to.equal(true);
//           expect(res.body).to.have.property('data').to.be.an('array');
//           done();
//         });
//     });
//   });

//   // Test for deleting a patient by ID
//   describe('DELETE /patients/delete/:patientId', () => {
//     it('should delete a patient by ID', (done) => {
//       chai.request(server)
//         .delete(`/patients/delete/${createdPatientId}`)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.have.property('success').to.equal(true);
//           expect(res.body).to.have.property('message').to.equal('Patient deleted successfully.');
//           done();
//         });
//     });
//   });

//   // Test for editing patient details by ID
//   describe('PUT /patients/:patientId', () => {
//     it('should edit patient details by ID', (done) => {
//       const updatedPatientDetails = {
//         firstName: 'UpdatedJohn',
//         lastName: 'Doe',
//         email: 'updated.john.doe@example.com',
//         phoneNumber: '9876543210',
//         weight: '75',
//         height: '180',
//         address: '456 Second St',
//         gender: 1,
//       };

//       chai.request(server)
//         .put(`/patients/${createdPatientId}`)
//         .set('Content-Type', 'application/json')
//         .send(updatedPatientDetails)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.have.property('success').to.equal(true);
//           expect(res.body).to.have.property('message').to.equal('Patient details updated successfully.');
//           done();
//         });
//     });
//   });
// });

// // End of the test suite
