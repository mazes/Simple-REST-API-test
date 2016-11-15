
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./index.js');
const should = chai.should();

chai.use(chaiHttp);


it('the service shall exist', function () {
    chai.expect(server).to.exist;
});

describe('API Integration Test ', function() {

    it('Server should exist', function () {
        chai.expect(server).to.exist;
    });

    describe('GET /api/users/', function() {
        it('should have status 200 and return an Array of Objects', function(done) {
            chai.request(server)
            .get('/api/users/')
            .end((err, res) => {
                res.should.have.a.status(200);
                res.body.should.be.an('array');
                res.body[0].should.be.an('object');
                done();
            });
        });
    });

    describe('POST /api/users/', function() {
        it('should create a new user', function(done) {
            chai.request(server)
            .post('/api/users/')
            .send({
                "name" : "Jeff",
                "age" : 60
            })
            .end((err, res) => {
                res.should.have.a.status(201);
                res.body.should.be.an('object');
                res.body.should.have.property('name').eql('Jeff');
                done();
            });
        });


        it('should have persisted Jeff in database', function(done) {
            chai.request(server)
            .get('/api/users/')
            .end((err, res) => {
                res.should.have.a.status(200);
                res.body[res.body.length - 1].should.have.property('name').eql('Jeff');
                done();
            });
        });
    });
});
