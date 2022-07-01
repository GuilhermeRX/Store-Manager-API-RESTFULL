const { expect, use } = require("chai");
const { getAll, getById, checkIfExists, validateParamsId, validateBody } = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const db = require('../../../models/connection');
const sinon = require("sinon");
const productsService = require("../../../services/productsService");
const chaiAsPromised = require("chai-as-promised");

use(chaiAsPromised)

describe('productsService', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#getAll', function () {
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

    it('Testa se devolve todos os produtos', async function () {
      sinon.stub(productsModel, 'getAll').resolves(allproducts);
      const result = await getAll();
      expect(result).to.be.equal(allproducts)
    })
  })

  describe('#getById', function () {
    it('Testa se devolve o produto espeficado', async function () {
      sinon.stub(productsModel, 'getById').resolves({ id: 1, name: 'thor' });
      const result = await getById(1);
      expect(result).to.be.a('object')
      expect(result).to.be.a.property('id')
      expect(result).to.be.a.property('name')
    })
  })

  describe('#checkIfExists', function () {
    it('Verifica se o produto existe se o id passado for válido', async function () {
      sinon.stub(productsModel, 'checkIfExists').resolves(true);
      const result = await checkIfExists(1);
      expect(result).to.be.equal(true)
    })

    it('Verifica se lança um erro se o id passado for inválido', async function () {
      sinon.stub(productsModel, 'checkIfExists').resolves(false);
      expect(productsService.checkIfExists(50)).to.be.rejectedWith('Product not found')
    })
  })

  describe('#validateParamsId', function () {
    it('se mandar um id válido deve retornar um objeto válido', async function () {
      const object = validateParamsId({ id: 1 })
      expect(object).to.be.deep.eq({ id: 1 })
    })
  })

  describe('#validatebody', function () {
    it('se mandar um body inválido lança um erro', async function () {
      expect(() => productsService.validateBody({ name: 456 }))
        .to.be.throws('"name" must be a string')
    })
  })

  describe('#post', function () {
    it('Testa se é possivel criar um novo produto', async function () {
      sinon.stub(productsModel, 'post').resolves(21)
      const result = await productsService.post('victoria')
      expect(result).to.be.equal(21)
    })
  })

  describe('#put', function () {
    it('Testa se é possivel editar um produto', async function () {
      sinon.stub(productsModel, 'put').resolves(1)
      const result = await productsService.put({ name: 'Martelo de Thor' })
      expect(result).to.be.equal(true)
    })

    it('Testa se lança um erro quando não é possivel editar um produto', async function () {
      sinon.stub(productsModel, 'put').resolves(false)
      expect(productsService.put({ name: 'Thor' })).to.be.rejectedWith()
    })
  })

  describe('#delete', function () {
    it('Testa se é possivel deletar um produto', async function () {
      sinon.stub(productsModel, 'delete').resolves(1)
      const result = await productsService.delete(8)
      expect(result).to.be.equal(true)
    })

    it('Testa se lança um erro quando não é possivel deletar um produto', async function () {
      sinon.stub(productsModel, 'delete').resolves(false)
      expect(productsService.delete(5)).to.be.rejectedWith()
    })
  })
})