const { expect, use } = require("chai");
const productsService = require('../../../services/productsService');
const db = require('../../../models/connection');
const sinon = require("sinon");
const chaiAsPromised = require('chai-as-promised');
const productsController = require("../../../controllers/productsController");
use(chaiAsPromised)

const allproducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]

describe('productsControler', function () {
  beforeEach(function () {
    sinon.restore();
  });


  describe('#getAll', function () {
    it('Testa se devolve status 200', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productsService, 'getAll').resolves(allproducts);

      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(allproducts)).to.be.equal(true)
    })
  })


  describe('#getById', function () {
    it('Testa se devolve status 200', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 1 }

      sinon.stub(productsService, 'checkIfExists').resolves(true);
      sinon.stub(productsService, 'getById').resolves({ id: 1, name: 'thor' });

      await productsController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ id: 1, name: 'thor' })).to.be.equal(true);
    })
  })

  describe('#post', function () {
    it('Testa se devolve status 201', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.body = { name: 'Luiz Guilherme' }

      const { name } = productsService.validateBody(req.body)
      sinon.stub(productsService, 'post').resolves(21);

      await productsController.post(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith({ id: 21, name })).to.be.equal(true);
    })
  })

  describe('#put', function () {
    it('Testa se devolve status 200', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.body = { name: 'Martelo de Thor' }
      req.params = { id: 5 }

      const { id } = productsService.validateParamsId(req.params)
      const { name } = productsService.validateBody(req.body)

      sinon.stub(productsService, 'checkIfExists').resolves(true);
      sinon.stub(productsService, 'put').resolves(true);

      await productsController.put(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ id, name, })).to.be.equal(true);
    })
  })

  describe('#delete', function () {
    it('Testa se devolve status 204 em caso de sucesso', async function () {
      const res = {};
      const req = {};

      res.sendStatus = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 5 }


      sinon.stub(productsService, 'checkIfExists').resolves(true);
      sinon.stub(productsService, 'delete').resolves(true);

      await productsController.delete(req, res);

      expect(res.sendStatus.calledWith(204)).to.be.equal(true);
    })
  })
})