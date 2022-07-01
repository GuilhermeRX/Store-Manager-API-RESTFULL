const { expect } = require("chai");
const { getAll, getById, checkIfExists, post } = require('../../../models/productsModel');
const db = require('../../../models/connection');
const sinon = require("sinon");
const productsModel = require("../../../models/productsModel");


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


describe('productsModel', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#getAll', function () {
    it('Testa se recupera todos os produtos', async function () {
      sinon.stub(db, 'query').resolves([allproducts]);
      const result = await getAll();
      expect(result).to.be.equal(allproducts)
    })
  })

  describe('#getById', function () {
    it('Testa se retorna o produto especificado pelo ID', async function () {
      sinon.stub(db, 'query').resolves([[{ id: 1, name: 'thor' }]]);
      const result = await getById(1);
      expect(result).to.be.a('object')
      expect(result).to.be.a.property('id')
      expect(result).to.be.a.property('name')
    })
  })

  describe('#checkIfExists', function () {
    it('Verifica se o produto existe', async function () {
      sinon.stub(db, 'query').resolves([[{ id: 1, name: 'thor' }]]);
      const result = await checkIfExists(1);
      expect(result).to.be.equal(true)
    })
  })

  describe('#post', function () {
    it('Testa se é possivel criar um novo produto', async function () {
      sinon.stub(db, 'query').resolves([{ insertId: 1 }]);
      const result = await productsModel.post({ name: 'Luiz' });
      expect(result).to.be.equal(1)
    })
  })

  describe('#put', function () {
    it('Testa se é possivel editar um produto', async function () {
      sinon.stub(db, 'query').resolves([{ affectedRows: 2 }]);
      const result = await productsModel.put(1);
      expect(result).to.be.equal(2)
    })
  })

  describe('#delete', function () {
    it('Testa se é possivel deletar um produto', async function () {
      sinon.stub(db, 'query').resolves([{ affectedRows: 1 }]);
      const result = await productsModel.delete(6);
      expect(result).to.be.equal(1)
    })
  })

})