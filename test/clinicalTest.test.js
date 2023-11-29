const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp);

// Define the base path for your API endpoints
const basePath = '/clinicalTest/clinical-tests';  // Update the base URL
const specificClinicalTestPath = '/clinical-test/6563a7e6823f646b53d6cb16';  // Adjust this based on your actual API structure

describe('Clinical Test API', () => {
    // Assuming a patient with the ID '6563a7e6823f646b53d6cb16' exists in your test database
    const existingPatientId = '6563a7e6823f646b53d6cb16';

    describe('POST ' + basePath, () => {
        it('should create a new clinical test', async () => {
            const newClinicalTest = {
                bloodPressure: 121,
                respiratoryRate: 19,
                bloodOxygenLevel: 99,
                heartbeatRate: 75,
                chiefComplaint: 'Knee pain',
                pastMedicalHistory: 'Yes',
                medicalDiagnosis: 'No',
                medicalPrescription: 'X',
                creationDateTime: '2023-11-02T10:30:00Z',
                patientId: '6563a7e6823f646b53d6cb16',
            };
    
            try {
                const res = await chai.request(app)
                    .post(basePath)
                    .set('Content-Type', 'application/json')
                    .send(newClinicalTest);
    
                console.log(res.status); // Log the response status
                console.log(res.body);  // Log the response body
    
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('success').to.equal(true);
                expect(res.body).to.have.property('message').to.equal('Clinical test created successfully');
            } catch (error) {
                console.error(error); // Log any errors that occur during the test
                throw error; // Rethrow the error to fail the test explicitly
            }
        });
    });

    describe('PUT ' + specificClinicalTestPath, () => {
        it('should update an existing clinical test', async () => {
            const updatedClinicalTest = {
                bloodPressure: 121,
                respiratoryRate: 19,
                bloodOxygenLevel: 99,
                heartbeatRate: 75,
                chiefComplaint: 'Knee pain',
                pastMedicalHistory: 'Yes',
                medicalDiagnosis: 'No',
                medicalPrescription: 'X',
                creationDateTime: '2023-11-02T10:30:00Z',
                patientId: '6563a7e6823f646b53d6cb16',
            };

            const res = await chai.request(app)
                .put(specificClinicalTestPath)
                .send(updatedClinicalTest);

            console.log("2", res.body); // Log the response body

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('success').to.equal(true);
            expect(res.body).to.have.property('message').to.equal('Clinical test updated successfully');
        });
    });

    describe('GET ' + basePath, () => {
        it('should get all clinical tests', async () => {
            const res = await chai.request(app)
                .get(basePath)
                .send();

            console.log("3", res.body); // Log the response body

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('success').to.equal(true);
            expect(res.body).to.have.property('data').to.be.an('array');
        });
    });

    // Add more describe blocks for other endpoints like DELETE, etc.
});
