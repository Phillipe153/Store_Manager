const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const getProducts = require('../../models/productsModel');

describe('Busca os produtos cadastrados', () => {
    describe('Quando nao retorna nenhum produto', () => {

        const resultExecute = []
        before(() => {
            sinon.stub(connection, 'execute').resolves([resultExecute]);
        });
        after(() => {
            connection.execute.restore()
        })

        it('retorna um array', async () => {
            const result = await getProducts.getProducts();

            expect(result).to.be.an('array');
        });
        it('retorna um array vazio', async () => {
            const result = await getProducts.getProducts();

            expect(result).to.be.empty;
        });
    });

       describe('Quando existe produtos cadastrados', () => {

        const resultExecute = [{
            id: 1,
            name: 'telefone',
            quantity: 10,
        }]

        before(() => {
            sinon.stub(connection, 'execute').resolves([resultExecute]);
        });

        after(() => {
            connection.execute.restore();
        })

        // it('retorna um array', () => {});
        // it('retorna um array nao vazio', () => {});
        it('retorna um array que possui objetos', async () => {
            const [result] = await getProducts.getProducts();

            expect(result).to.be.an('object');
        });
        it('o objeto possui os atributos id, name e quantity ', async () => {
            const [result] = await getProducts.getProducts();

            expect(result).to.be.includes.all.keys(
                'id',
                'name',
                'quantity'
            );
        })
    })
    describe('Busca por produto cadastrado por id', () => {

        const resultExecute = [{
            id: 1,
            name: 'telefone',
            quantity: 10,
        }]

        before(() => {
            sinon.stub(connection, 'execute').resolves([resultExecute]);
        });

        after(() => {
            connection.execute.restore();
        })

        // it('retorna um array', () => {});
        // it('retorna um array nao vazio', () => {});
        it('retorna um array que possui objetos', async () => {
            const [result] = await getProducts.getProductsById(1);

            expect(result).to.be.an('object');
        });
        it('o objeto possui os atributos id, name e quantity ', async () => {
            const [result] = await getProducts.getProductsById(1);

            expect(result).to.be.includes.all.keys(
                'id',
                'name',
                'quantity'
            );
        })
    })
    describe('Verifica se é possivel adicionar um produto', () => {

        const resultExecute = [{
            id: 1,
            name: 'telefone',
            quantity: 10,
        },
        {
            id: 4,
            name: "Marreta do chapolin",
            quantity: 5
        }]

        const newProduct = {
            "id": 2,
            "name": "Marreta do chapolin",
            "quantity": 5
        }

        before(() => {
            sinon.stub(connection, 'execute').resolves([resultExecute, newProduct]);
        });

        after(() => {
            connection.execute.restore();
        })

        // it('retorna um array', () => {});
        // it('retorna um array nao vazio', () => {});
        it('retorna um array que possui objetos', async () => {
            const result = await getProducts.addProduct();

            expect(result.newProduct).to.be.length(2);
        });
        it('o objeto possui os atributos telefone e Marreta do chapolin ', async () => {
            const result = await getProducts.addProduct();

            expect(result.productsListName[0]).to.equal(
                'telefone',
            );
            expect(result.productsListName[1]).to.equal(
                'Marreta do chapolin'
            );
        })
    })
    
})