'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Refund = mongoose.model('Refund');

var credentials,
    token,
    mockup;

describe('Refund CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            doc_date: '2563-03-18',
            personalid: 'asas',
            contactno: 'dfdf',
            deviceno: 'ghgh',
            items: [
                {
                    refno: '232323232',
                    refdate: '2323232',
                    contactname: 'ddddddd',
                    contacttype: 'ffff',
                    amount: '1000'
                }
            ]
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Refund get use token', (done) => {
        request(app)
            .get('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Refund get by id', function (done) {

        request(app)
            .post('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/refunds/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.personalid, mockup.personalid);
                        assert.equal(resp.data.contactno, mockup.contactno);
                        assert.equal(resp.data.deviceno, mockup.deviceno);
                        assert.equal(resp.data.items[0].refno, mockup.items[0].refno);
                        assert.equal(resp.data.items[0].refdate, mockup.items[0].refdate);
                        assert.equal(resp.data.items[0].contactname, mockup.items[0].contactname);
                        assert.equal(resp.data.items[0].contacttype, mockup.items[0].contacttype);
                        assert.equal(resp.data.items[0].amount, mockup.items[0].amount);
                        done();
                    });
            });

    });

    it('should be Refund post use token', (done) => {
        request(app)
            .post('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.personalid, mockup.personalid);
                assert.equal(resp.data.contactno, mockup.contactno);
                assert.equal(resp.data.deviceno, mockup.deviceno);
                assert.equal(resp.data.items[0].refno, mockup.items[0].refno);
                assert.equal(resp.data.items[0].refdate, mockup.items[0].refdate);
                assert.equal(resp.data.items[0].contactname, mockup.items[0].contactname);
                assert.equal(resp.data.items[0].contacttype, mockup.items[0].contacttype);
                assert.equal(resp.data.items[0].amount, mockup.items[0].amount);
                done();
            });
    });

    it('should be refund put use token', function (done) {

        request(app)
            .post('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    doc_date: '2563-03-18',
                    personalid: 'asas',
                    contactno: 'dfdf',
                    deviceno: 'ghgh',
                    items: [
                        {
                            refno: '232323232',
                            refdate: '2323232',
                            contactname: 'ddddddd',
                            contacttype: 'ffff',
                            amount: '1000'
                        }
                    ]
                }
                request(app)
                    .put('/api/refunds/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.personalid, update.personalid);
                        assert.equal(resp.data.contactno, update.contactno);
                        assert.equal(resp.data.deviceno, update.deviceno);
                        assert.equal(resp.data.items[0].refno, update.items[0].refno);
                        assert.equal(resp.data.items[0].refdate, update.items[0].refdate);
                        assert.equal(resp.data.items[0].contactname, update.items[0].contactname);
                        assert.equal(resp.data.items[0].contacttype, update.items[0].contacttype);
                        assert.equal(resp.data.items[0].amount, update.items[0].amount);
                        done();
                    });
            });

    });

    it('should be refund delete use token', function (done) {

        request(app)
            .post('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/refunds/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be refund get not use token', (done) => {
        request(app)
            .get('/api/refunds')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be refund post not use token', function (done) {

        request(app)
            .post('/api/refunds')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be refund put not use token', function (done) {

        request(app)
            .post('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/refunds/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be refund delete not use token', function (done) {

        request(app)
            .post('/api/refunds')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/refunds/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Refund.deleteMany().exec(done);
    });

});
describe('refund Check Exist Data', function () {
    before(function (done) {
        mockup = {
            doc_date: '2563-03-18',
            personalid: '3180200756700',
            contactno: 'dfdf',
            deviceno: 'ghgh',
            items: [
                {
                    refno: '232323232',
                    refdate: '2323232',
                    contactname: 'ddddddd',
                    contacttype: 'ffff',
                    amount: '1000'
                }
            ]
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('Check Not Exist Data', function (done) {
        request(app)
            .post('/api/checkExistData')
            .set('Authorization', 'Bearer ' + token)
            .send({
                personalid: '3180200756700'
            })
            .expect(400)
            .end(done);
    })

    it('Check Exist Data in Refund', function (done) {
        let refund = new Refund(mockup);
        refund.save();
        request(app)
            .post('/api/checkExistData')
            .set('Authorization', 'Bearer ' + token)
            .send({
                personalid: '3180200756700'
            })
            .expect(200)
            .end(done);
    })


    it('Check Exist Data in Personal', function (done) {
        let personal = new Personal({
            personalid: '3180200756700',
            contactno: 'dfdf',
            deviceno: 'ghgh',
            items: [
                {
                    refno: '232323232',
                    refdate: '2323232',
                    contactname: 'ddddddd',
                    contacttype: 'ffff',
                    amount: '1000'
                }
            ]
        });
        personal.save();
        request(app)
            .post('/api/checkExistData')
            .set('Authorization', 'Bearer ' + token)
            .send({
                personalid: '3180200756700'
            })
            .expect(200)
            .end(done);
    })

    // afterEach(function (done) {
    //     Personal.deleteMany().exec(done);
    // });
})
