const chai = require('chai');
const chaiHttp = require('chai-http');
const server = 'https://group3-mapd713.onrender.com'; // Replace this with the correct base URL

chai.use(chaiHttp);
const expect = chai.expect;

// Begin the test suite for Patient API
describe('Patient API Tests', () => {
  let createdPatientId; // To store the ID of the patient created during testing
  let idForUpdate = "6563a7e6823f646b53d6cb16";

  // Test for adding a new patient
describe('POST /patients/add', () => {
    it('should add a new patient', (done) => {
      const newPatient = {
        firstName: 'Ranjan',
        lastName: 'David',
        email: 'kk@example.com',
        phoneNumber: '123-456-7890',
        weight: '160 lbs',
        height: '6\'2',
        address: '123 Main St, City, Country',
        gender: 0, // Assuming 0 for female
      };
  
      chai.request(server)
        .post('/patient/add') // Corrected the endpoint
        .set('Content-Type', 'application/json')
        .send(newPatient)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.have.property('success').to.equal(true);
          expect(res.body).to.have.property('message').to.equal('Patient added successfully.');
          // The response does not contain data in your case
          // expect(res.body).to.have.property('data');
          // expect(res.body.data).to.have.property('_id');
          // createdPatientId = res.body.data._id; // No data field in the response
          done();
        });
    });
  });

 // Test for getting patient details by name
describe('GET /patients/viewByName/:patientName', () => {
    it('should get patient details by name', (done) => {
      const patientName = 'Ranjan';
  
      chai.request(server)
        .get(`/patient/viewByName/${patientName}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('success');
  
          if (res.body.success) {
            // If success is true, assume there's at least one patient with the name 'Ranjan'
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('array').that.is.not.empty;
            expect(res.body.data[0]).to.have.property('firstName').to.equal(patientName);
          } else {
            // If success is false, assert the appropriate message
            expect(res.body).to.have.property('message').to.equal('Patient not found.');
          }
  
          done();
        });
    });
  });
  
  // Test for getting a list of all patients
  describe('GET /patient/list', () => {
    it('should get a list of all patients', (done) => {
      chai.request(server)
        .get('/patient/list')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('success').to.equal(true);
          expect(res.body).to.have.property('data').to.be.an('array');
          done();
        });
    });
  });

  // Test for editing patient details by ID
  describe('PUT /patient/patients/:patientId', () => {
    it('should edit patient details by ID', (done) => {
      const updatedPatientDetails = {
        firstName: 'Ranjan',
        lastName: 'Doe',
        email: 'doe@example.com',
        phoneNumber: '9876543210',
        weight: '75',
        height: '180',
        address: '456 Second St',
        gender: 1,
      };

      chai.request(server)
        .put(`/patient/patients/${idForUpdate}`)
        .set('Content-Type', 'application/json')
        .send(updatedPatientDetails)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('success').to.equal(true);
          expect(res.body).to.have.property('message').to.equal('Patient details updated successfully.');
          done();
        });
    });
  });
});

// End of the test suite
