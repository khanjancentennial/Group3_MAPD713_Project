const chai = require('chai');
const chaiHttp = require('chai-http');
const server = 'https://group3-mapd713.onrender.com';

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Registration and Login Tests', () => {
  
  // Test for user login
  describe('POST /auth/login', () => {
    it('should login an existing user', (done) => {
      const loginDetails = {
        email: 'johndoe@example.com',
        password: 'john123',
      };

      chai.request(server)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send(loginDetails)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('success').to.equal(true);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.have.property('_id');
          expect(res.body.user).to.have.property('firstName').to.equal('John');
          expect(res.body.user).to.have.property('lastName').to.equal('Doe');
          expect(res.body.user).to.have.property('email').to.equal('johndoe@example.com');
          // Add more assertions for other user details if needed
          done();
        });
    });
  });
});
