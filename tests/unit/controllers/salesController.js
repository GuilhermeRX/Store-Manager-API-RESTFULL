const { expect } = require("chai");
const sinon = require("sinon");
const salesController = require("../../../controllers/salesController");
const salesService = require("../../../services/salesService");

const body = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

describe('SalesController', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#post', function () {
    it('Testa se é possivel cadastrar uma venda com status "201"', async function () {
      const req = {};
      const res = {};

      req.body = body
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub();

      sinon.stub(salesService, 'checkIfExist').resolves(req.body)
      sinon.stub(salesService, 'post').resolves({ id: 3, itemsSold: [{ product: 1, quantity: 2 }] })
      await salesController.post(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  })

  describe('getAll', function () {
    it('Testa se é possivel listar todas as vendas com status "200"', async function () {
      const req = {};
      const res = {};

      req.body = body
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub();

      sinon.stub(salesService, 'getAll').resolves([{ saleId: 1 }, { saleId: 2 }])
      await salesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith([{ saleId: 1 }, { saleId: 2 }])).to.be.equal(true);
    });
  })

  describe('getById', function () {
    it('Testa se é possivel listar uma venda especifica com status "200"', async function () {
      const req = {};
      const res = {};

      req.body = body
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub();

      sinon.stub(salesService, 'validateParamsId').returns(5)
      sinon.stub(salesService, 'getById').resolves([{ productId: 1 }, { productId: 2 }]);
      sinon.stub(salesService, 'checkSaleExists').resolves(true)

      await salesController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith([{ productId: 1 }, { productId: 2 }])).to.be.equal(true);
    });
  })
})