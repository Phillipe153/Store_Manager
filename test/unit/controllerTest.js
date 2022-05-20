const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const getProducts = require('../../controllers/indexController');
const teste = require('../../services/productsService');
const getSales = require('../../controllers/indexController');
const testeSales = require('../../services/salesService')

const { any } = require('joi');

describe('Controller: Busca os produtos cadastrados', () => {
    describe('Quando existe produtos cadastrados', () => {

        const res ={};
        const req ={};

        const resultExecute = [
            {
                "id": 1,
                "name": "Martelo de Thor",
                "quantity": 20
            },
            {
                "id": 2,
                "name": "Traje de encolhimento",
                "quantity": 20
            },
            {
                "id": 3,
                "name": "Escudo do Capitão América",
                "quantity": 20
            }
        ]
        before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(teste, 'getProducts').resolves( resultExecute);
        });

        after(() => {
            teste.getProducts.restore();
        })

        it('retorna um array', async () => {

            const result = await getProducts.getProducts(req, res);
            console.log(res.status);

            expect(res.status.calledWith(200)).to.be.eq(true);

        });
    });

    //    describe('Quando existe produtos cadastrados', () => {

    //        const resultProducts =[
    //            {
    //                "id": 1,
    //                "name": "Martelo de Thor",
    //             "quantity": 10
    //         },
    //         {
    //             "id": 2,
    //             "name": "Traje de encolhimento",
    //             "quantity": 20
    //         },
    //         {
    //             "id": 3,
    //             "name": "Escudo do Capitão América",
    //             "quantity": 30
    //         }
    //     ];
    //     const resultExecute = {status: 200, message: resultProducts}

    //     before(() => {

    //         sinon.stub(teste, 'getProducts').resolves([resultExecute] );
    //     });

    //     after(() => {
    //         teste.getProducts.restore();
    //     })

    //     it('retorna um array que possui objetos', async () => {
    //         const [result] = await getProducts.getProducts();
    //         console.log(result);
            
    //         expect(result).to.be.an('object');
    //     });
    //     it('o objeto possui os atributos id, name e quantity ', async () => {
    //         const [result] = await getProducts.getProducts();

    //         expect(result.status).to.be.equal(200);
    //         expect(result.message).to.be.equal(resultProducts);
    //         expect(result.message[0]).to.be.includes.key(
    //             'id',
    //             'name',
    //             'quantity');


    //     })
    // })
    describe('Controller:  Buscando produto por um id', () => {


        const res ={};
        const req ={};


        const resultProducts =[
            {
                "id": 1,
                "name": "Martelo de Thor",
             "quantity": 10
         }
     ];
    //  const resultExecute = {status: 200, message: resultProducts}
    //  const resultotExecute = {status: 404, message: 'Product not found'}

    
     before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(teste, 'getProducts').resolves( resultProducts);
    });

    after(() => {
        teste.getProducts.restore();
    })
    
    //  it('retorna um array que possui objetos', async () => {
    //      const result = await getProducts.getProductsById(2);
    //      console.log;
    //      expect(result[1].status).to.be.equal(404);
    //      expect(result[1].message).to.be.equal( 'Product not found');
    //  });
     it('o objeto possui os atributos id, name e quantity ', async () => {
         const result = await getProducts.getProductsById(req, res);
         expect(res.status.calledWith(404)).to.be.eq(false);

    
     })
    })
    describe('Verifica se é possivel adicionar um produto', () => {

        const resultReturn = 
        {
            id: 2,
            name: "Marreta do chapolin",
            quantity: 5
        };

        const newProduct = {
            "name": "Marreta do chapolin",
            "quantity": 5
        }

        const resultExecute = [{status: 200, message: resultReturn}]

     
        before(() => {
            
            sinon.stub(getProducts, 'postProduct').resolves(resultExecute );
        });
        
        after(() => {
            getProducts.postProduct.restore();
        })
        
        it('retorna um array que possui objetos', async () => {
            const [result] = await getProducts.postProduct(newProduct);
            console.log(result);

            expect(result.status).to.be.equal(200);
            expect(result.message).to.be.equal(resultReturn);
    
        });
        it('o objeto possui os atributos telefone e Marreta do chapolin ', async () => {
            const [result] = await getProducts.postProduct(newProduct);

            
            expect(result.message.name).to.equal(
                'Marreta do chapolin'
            );
        })
    })
    describe('Verifica se é possivel deletar um produto', () => {
        const resultReturn2 = {}
        const resultExecute = [{status: 200, message: {}}]


        before(() => {
            sinon.stub(getProducts, 'deleteProduct').resolves(resultExecute);
        });

        after(() => {
            getProducts.deleteProduct.restore();
        })

        // it('retorna um array', () => {});
        // it('retorna um array nao vazio', () => {});
        
        it('o objeto possui os atributos telefone e Marreta do chapolin ', async () => {
            const [result] = await getProducts.deleteProduct(2);
            console.log(result);

            expect(result.status).to.be.equal(200);
            expect(result.message).to.be.empty;
            
        })
    })
    describe('Verifica se é possivel atualizar um produto', () => {

        const newProduct = [{
            id: 1,
            name: 'telefone celular',
            quantity: 10,
        }];

                const resultExecute = [{status: 200, message:newProduct }]


        before(() => {
            sinon.stub(getProducts, 'putProduct').resolves(resultExecute);
        });

        after(() => {
            getProducts.putProduct.restore();
        })

        it('retorna um array que possui objetos', async () => {
            const [result] = await getProducts.putProduct(1);
            console.log(result.message[0].name);

            expect(result.message[0].name).to.be.equal('telefone celular');
        });
    })
    describe('Quando existe vendas cadastradas', () => {

        const res ={};
        const req ={};

        const resultExecute = [
            {
                "date": "2022-05-19T12:08:18.000Z",
                "productId": 1,
                "quantity": 5
            }
        ]
        before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(testeSales, 'getSales').resolves( resultExecute);
        });

        after(() => {
            testeSales.getSales.restore();
        })

        it('retorna um array', async () => {

            const result = await getSales.getSales(req, res);
            console.log(res.status);

            expect(res.status.calledWith(200)).to.be.eq(true);

        });
    });
    
    
})
