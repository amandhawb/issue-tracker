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
    it('should return a single issue by ID', (done) => {
        chai.request(server)
            .get('/issues/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.title).to.equal('Issue 1');
                done();
            })
    });
    it('should return a 404 error when ID is not found', (done) => {
        chai.request(server)
            .get('/issues/100')
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.text).to.equal('{"message":"Issue not found"}')
                done();
            })
    });
    it('should create a new issue', (done) => {
        chai.request(server)
            .post('/issues')
            .send({
                title: 'New issue',
                description: 'Description...'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body.title).to.equal('New issue');
                done();
            });
    });
});

