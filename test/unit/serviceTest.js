const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const getProducts = require('../../models/productsModel');
const teste = require('../../services/productsService');
const getSales = require('../../models/salesModel');
const testeSales = require('../../services/salesService')

describe('Service: Busca os produtos cadastrados', () => {
    describe('Quando nao retorna nenhum produto', () => {

        const resultExecute = []
        before(() => {
            sinon.stub(getProducts, 'getProducts').resolves([resultExecute]);
        });
        after(() => {
            getProducts.getProducts.restore()
        })

        it('retorna um array', async () => {
            const result = await teste.getProducts();

            expect(result).to.be.an('array');
        });
        it('retorna um array vazio', async () => {
            const [result] = await teste.getProducts();
            console.log(result);


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
            sinon.stub(getProducts, 'getProducts').resolves(resultExecute);
        });
        after(() => {
            getProducts.getProducts.restore()
        })

        it('retorna um array que possui objetos', async () => {
            const [result] = await teste.getProducts();

            expect(result).to.be.an('object');
        });
        it('o objeto possui os atributos id, name e quantity ', async () => {
            const [result] = await teste.getProducts();
            console.log(result);

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
            sinon.stub(getProducts, 'getProductsById').resolves(resultExecute);
        });

        after(() => {
            getProducts.getProductsById.restore();
        })

        it('retorna um array', () => {});
        it('retorna um array nao vazio', () => {});
        it('retorna um array que possui objetos', async () => {
            const result = await teste.getProductsById(1);

            expect(result).to.be.an('object');
        });
        it('o objeto possui os atributos id, name e quantity ', async () => {
            const result = await teste.getProductsById(1);

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
            id: 2,
            name: "Marreta do chapolin",
            quantity: 5
        }]

        const newProduct = {
            "id": 2,
            "name": "Marreta do chapolin",
            "quantity": 5
        }

        before(() => {
            sinon.stub(getProducts, 'addProduct').resolves([resultExecute, newProduct]);
        });

        after(() => {
            getProducts.addProduct.restore();
        })

        it('retorna um array', () => {});
        it('retorna um array nao vazio', () => {});
        it('retorna um array que possui objetos', async () => {
            const [result] = await getProducts.addProduct();
            
            expect(result).to.be.length(2);
        });
        it('o objeto possui os atributos telefone e Marreta do chapolin ', async () => {
            const [result] = await getProducts.addProduct();
            console.log(result[0].name);

            expect(result[0].name).to.equal(
                'telefone',
            );
            expect(result[1].name).to.equal(
                'Marreta do chapolin'
            );
        })
    })
    // describe('Verifica se é possivel deletar um produto', () => {

    //     // const resultExecute = [1]
    //     // const resultExecute = [{
    //     //     id: 1,
    //     //     name: 'telefone',
    //     //     quantity: 10,
    //     // },
    //     // {
    //     //     id: 2,
    //     //     name: "Marreta do chapolin",
    //     //     quantity: 5
    //     // }]

    //     // const newProduct = {
    //     //     "id": 2,
    //     //     "name": "Marreta do chapolin",
    //     //     "quantity": 5
    //     // }
    //     const resultExecute = {status: 200, message: resultProducts}
    //     const resultotExecute = {status: 404, message: 'Product not found'}

    //     before(() => {
    //         sinon.stub(getProducts, 'deleteProduct').resolves([resultExecute, newProduct, resultotExecute]);
    //     });

    //     after(() => {
    //         getProducts.deleteProduct.restore();
    //     })

    //     it('retorna um array', () => {});
    //     it('retorna um array nao vazio', () => {});
    //     it('retorna um array que possui objetos', async () => {
    //         const result = await getProducts.deleteProduct(3);
            
    //         expect(result[2].status).to.be.equal(404);
    //         expect(result[2].message).to.be.equal( 'Product not found');  
    //     });
    //     it('o objeto possui os atributos telefone e Marreta do chapolin ', async () => {
    //         const result = await getProducts.deleteProduct(2);
    //         console.log(result[0]);

    //         expect(result[0][0]).to.be.equal(1);
    //     })
    // })
    // describe('Verifica se é possivel atualizar um produto', () => {

    //     const newProduct = [{
    //         id: 1,
    //         name: 'telefone celular',
    //         quantity: 10,
    //     }];

    //     before(() => {
    //         sinon.stub(connection, 'execute').resolves([ newProduct]);
    //     });

    //     after(() => {
    //         connection.execute.restore();
    //     })

    //     it('retorna um array que possui objetos', async () => {
    //         const result = await getProducts.toUpdateProduct(1);

    //         expect(result.productUpdated).to.be.equal('telefone celular');
    //     });
    // })
    describe('Quando existe vendas cadastrados', () => {

        const resultExecute = [{
            id: 1,
            name: 'telefone',
            quantity: 10,
        }]

        before(() => {
            sinon.stub(getSales, 'getSales').resolves(resultExecute);
        });
        after(() => {
            getSales.getSales.restore()
        })

        it('retorna um array que possui objetos', async () => {
            const [result] = await testeSales.getSales();

            expect(result).to.be.an('object');
        });
        it('o objeto possui os atributos id, name e quantity ', async () => {
            const [result] = await testeSales.getSales();
            console.log(result);

            expect(result).to.be.includes.all.keys(
                'id',
                'name',
                'quantity'
            );
        })
    })  
    
    
})