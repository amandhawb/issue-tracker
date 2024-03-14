const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Issue Tracker API', () => {
    it('should return all issues', (done) => {
        chai.request(server)
            .get('/issues')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});