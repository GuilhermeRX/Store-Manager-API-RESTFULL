const { expect } = require("chai");
const sinon = require("sinon");
const db = require('../../../models/connection');
const salesModel = require("../../../models/salesModel");

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

const mockByID = [[{ product: 1, quantity: 3 }, { product: 2, quantity: 4 }]];
const returnMock = [{ product: 1, quantity: 3 }, { product: 2, quantity: 4 }];
describe('SalesModel', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#post', function () {
    it('Testa se é possivel cadastrar uma venda', async function () {
      sinon.stub(db, 'query').resolves([{ insertId: 1 }])
      const result = await salesModel.post(body)
      expect(result).to.be.equal(1)
    })
  });

  describe('#getAll', function () {
    it('Testa se devolve todas as vendas', async function () {
      sinon.stub(db, 'query').resolves([[{ product: 1 }, { product: 2 }]]);
      const result = await salesModel.getAll()
      expect(result).to.be.deep.equal([{ product: 1 }, { product: 2 }])
    })
  });

  describe('#getById', function () {
    it('Testa se devolve a venda especifica', async function () {
      sinon.stub(db, 'query').resolves(mockByID);
      const result = await salesModel.getById(3)
      expect(result).to.be.deep.equal(returnMock)
    })
  });

  describe('#checkSalesExist', function () {
    it('Testa se retorna "true" caso receba um valor válido', async function () {
      sinon.stub(db, 'query').resolves([[{ product: 1 }]]);
      const result = await salesModel.checkSalesExist(3)
      expect(result).to.be.equal(true)
    })
  });
});