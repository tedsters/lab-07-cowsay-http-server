'use strict';

const server = require('../server');
const cowsay = require('cowsay');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function(){
  before(done => {
    server.listen(8080);
    done();
  });
  describe('POST method', function(){
    describe('/ endpoint', function(){
      it('should respond with a 400 a bad request', done => {
        chai.request(server)
        .post('/huh')
        .send({})
        .end((err, res) =>{
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
    describe('/cowsay endpoint', function(){
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/cowsay')
        .send({text: 'hello'})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('GET method', function(){
    describe('/ endpoint', function(){
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/duh')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
    describe('/cowsay endpoint', function(){
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/cowsay')
        .send({text: 'hello'})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('should respond with a 400 on bad request', done =>{
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
