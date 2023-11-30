const chai = require('chai');
const chaiHttp = require('chai-http');
const server = 'https://group3-mapd713.onrender.com'; // Update the server URL

chai.use(chaiHttp);
const expect = chai.expect;

describe('Clinical Test API Tests', () => {
  let createdClinicalTestId;  

  describe('POST /api/clinical-tests/clinical-tests', () => {
    it('should create a new clinical test', (done) => {
      const newClinicalTest = {
        bloodPressure: 214,
        respiratoryRate: 1234,
        bloodOxygenLevel: 1234,
        heartbeatRate: 1234,
        chiefComplaint: 'dfvdfd',
        pastMedicalHistory: 'Dad',
        medicalDiagnosis: 'Add',
        medicalPrescription: 'sdfs',
        creationDateTime: '2023-11-29T07:26:44.180+00:00',
        patient: '6563a7e6823f646b53d6cb16',
      };
  
      chai.request(server)
        .post('/api/clinical-tests/clinical-tests')
        .set('Content-Type', 'application/json')
        .send(newClinicalTest)
        .end((err, res) => {
          if (err) {
            console.error('Error:', err);
            if (res) {
              console.log('Response:', res.body);
              console.log('Status Code:', res.status);
            }
            done(err);
          } else {
            expect(res).to.have.status(201);  // Update this line
            expect(res).to.be.json;
            expect(res.body).to.have.property('success').to.equal(true);
            expect(res.body).to.have.property('message').to.equal('Clinical test created successfully');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('_id');
            createdClinicalTestId = res.body.data._id;
            done();
          }
        });
    });
  });  

  describe('GET /api/clinical-tests/clinical-tests', () => {
    it('should get all clinical tests', (done) => {
      chai.request(server)
        .get('/api/clinical-tests/clinical-tests')
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

  describe('GET /api/clinical-tests/clinical-tests/{clinicalTestId}', () => {
    it('should get a specific clinical test by ID', (done) => {
      chai.request(server)
        .get(`/api/clinical-tests/clinical-tests/${createdClinicalTestId}`)
        .end((err, res) => {
          if (err) {
            console.error('Error:', err);
            if (res) {
              console.log('Response:', res.body);
              console.log('Status Code:', res.status);
            }
            done(err);
          } else {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('success').to.equal(true);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('_id').to.equal(createdClinicalTestId);
            expect(res.body.data).to.have.property('patient');
            expect(res.body.data.patient).to.have.property('_id').to.equal('6563a7e6823f646b53d6cb16');
            done();
          }
        });
    });
  });

  describe('PUT /api/clinical-tests/clinical-tests/{clinicalTestId}', () => {
    it('should update an existing clinical test', (done) => {
      const updatedClinicalTest = {
        bloodPressure: 220,
        respiratoryRate: 25,
      };

      chai.request(server)
        .put(`/api/clinical-tests/clinical-tests/${createdClinicalTestId}`)
        .set('Content-Type', 'application/json')
        .send(updatedClinicalTest)
        .end((err, res) => {
          if (err) {
            console.error('Error:', err);
            if (res) {
              console.log('Response:', res.body);
              console.log('Status Code:', res.status);
            }
            done(err);
          } else {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('success').to.equal(true);
            expect(res.body).to.have.property('message').to.equal('Clinical test updated successfully');
            done();
          }
        });
    });
  });

  describe('DELETE /api/clinical-tests/clinical-tests/{clinicalTestId}', () => {
    it('should delete an existing clinical test', (done) => {
      chai.request(server)
        .delete(`/api/clinical-tests/clinical-tests/${createdClinicalTestId}`)
        .end((err, res) => {
          if (err) {
            console.error('Error:', err);
            if (res) {
              console.log('Response:', res.body);
              console.log('Status Code:', res.status);
            }
            done(err);
          } else {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('success').to.equal(true);
            expect(res.body).to.have.property('message').to.equal('Clinical test deleted successfully');
            done();
          }
        });
    });
  });
});
