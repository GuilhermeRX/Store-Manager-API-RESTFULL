const { expect } = require("chai");
const sinon = require("sinon");
const salesModel = require("../../../models/salesModel");
const productsService = require("../../../services/productsService");
const { validateParamsId, validateBody } = require("../../../services/salesService");
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

describe('SalesService', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#post', function () {
    it('Testa se é possivel cadastrar uma nova venda', async function () {
      sinon.stub(salesModel, 'post').resolves(8)
      const result = await salesService.post(body);
      expect(result).to.be.deep.property('itemsSold')
    })
  });

  describe('#checkIfExist', function () {
    it('Verifica se passando um id de produtos válidos retorna o esperado', async function () {
      sinon.stub(productsService, 'checkIfExists').resolves(true)
      const result = await salesService.checkIfExist(body);
      expect(result).to.be.deep.equal(true);
    })
  });

  describe('#getAll', function () {
    it('Se retorna todas as vendas', async function () {
      sinon.stub(salesModel, 'getAll').resolves([{ sale: 1 }, { sale: 2 }])
      const result = await salesService.getAll();
      expect(result).to.be.deep.equal([{ sale: 1 }, { sale: 2 }]);
    })
  });

  describe('#getById', function () {
    it('Se retorna uma venda especifica', async function () {
      sinon.stub(salesModel, 'getById').resolves([{ product: 1, quantity: 3 }])
      const result = await salesService.getById(6);
      expect(result).to.be.deep.equal([{ product: 1, quantity: 3 }]);
    })
  });

  describe('#checkSaleExists', function () {
    it('Se retorna "true" quando recebe um id válido', async function () {
      sinon.stub(salesModel, 'checkSalesExist').resolves(true)
      const result = await salesService.checkSaleExists(20);
      expect(result).to.be.deep.equal(true);
    })

    it('Se retorna um erro quando recebe um id inválido', async function () {
      sinon.stub(salesModel, 'checkSalesExist').resolves(false)
      expect(salesService.checkSaleExists(6)).to.be.rejectedWith();
    })
  });

  describe('#validateBody', function () {
    it('Se retorna um erro quando recebe um body inválido', async function () {
      expect(() => validateBody({ valid: 'invalid' })).to.be.throws('"productId" is required');
    })
  });

  describe('#validateParamsId', function () {
    it('Se retorna um erro quando recebe um id inválido', async function () {
      expect(() => validateParamsId({ valid: 'invalid' })).to.be.throws('"id" is required');
    })
  });
});