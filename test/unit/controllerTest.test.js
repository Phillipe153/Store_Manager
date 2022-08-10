const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const index = require('../../app')
const connection = require('../../models/connection');
const getProducts = require('../../controllers/indexController');
const postProduct = require('../../controllers/indexController');

const addProduct = require('../../models/productsModel');
const teste = require('../../services/productsService');
const ProductModel = require('../../models/productsModel');



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
    describe('Controller:  Buscando produto por um id', async () => {


        const resultProducts =
            {
                "id": 1,
                "name": "Martelo de Thor",
             "quantity": 10
         }
     

    
     before(() => {

        sinon.stub(teste, 'getProductsById').resolves( resultProducts);
    });

    after(() => {
        teste.getProductsById.restore();
    })

   
    
     it('o objeto possui os atributos id, name e quantity ', async () => {
        response = await chai.request(index)
        .get('/products/1')

        console.log(response.body);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.includes.key('id', 'name', 'quantity');

    
     })
    })

    describe('Controller:  Buscando produto por um id que nao existe', async () => {

        before(() => {
            
            sinon.stub(ProductModel, 'getProductsById').callsFake(() => {
                throw {status: 404, message: 'Product not found'}
            } );

        });
        
        after(() => {
            ProductModel.getProductsById.restore();

        })
        
        it('retorna uma mensagem de erro ao cadastrar um produto ja existente', async () => {

            response = await chai.request(index)
            .get('/products/1')

            expect(response.status).to.be.equal(404);
    
        });
    })


    describe('Verifica se é possivel adicionar um produto ja existente', () => {

        

     
        before(() => {
            
            sinon.stub(ProductModel, 'addProduct').callsFake(() => {
                throw {status: 409, message: 'Product already exists'}
            } );

        });
        
        after(() => {
            ProductModel.addProduct.restore();

        })
        
        it('retorna uma mensagem de erro ao cadastrar um produto ja existente', async () => {

            response = await chai.request(index)
            .post('/products')
            .send({
                name: "Marreta do chapolin",
                quantity: 5
            })

            expect(response.status).to.be.equal(409);
    
        });
    });

    describe('Verifica se é possivel adicionar um produto', () => {

        const resultReturn = 
        {
            "id": 2,
            "name": "Marreta do chapolin",
            "quantity": 5
        };

        const newProduct = {
            "name": "Marreta do chapolin",
            "quantity": 5
        }

        const resultExecute = [{status: 200, message: resultReturn}]

     
        before(() => {
            
            sinon.stub(teste, 'addProduct').resolves(resultExecute );
            sinon.stub(teste, 'getProductsById').resolves(resultExecute[0] );
          
        });
        
        after(() => {
            teste.addProduct.restore();
            teste.getProductsById.restore();

        })       
       

        it('retorna uma mensagem de erro ao cadastrar sem o campo do nome', async () => {

            response = await chai.request(index)
            .post('/products')
            .send({
                
                quantity: 5
            })

            expect(response.status).to.be.equal(400);
            expect(response.body.message).to.be.eq('\"name\" is required');
    
        });
        it('retorna uma mensagem de erro ao cadastrar sem o campo do quantity', async () => {

            response = await chai.request(index)
            .post('/products')
            .send({
                name: "Marreta do chapolin"
            })


            expect(response.status).to.be.equal(400);
            expect(response.body.message).to.be.eq('\"quantity\" is required');
    
        });
        it('retorna uma mensagem de erro ao cadastrar o campo do nome menor que 5 caracteres', async () => {

            response = await chai.request(index)
            .post('/products')
            .send({
                name: "Mar"
            })


            expect(response.status).to.be.equal(422);
            expect(response.body.message).to.be.eq('\"name\" length must be at least 5 characters long');
    
        });
        it('retorna uma mensagem de erro ao cadastrar o campo do quantity menor que 1', async () => {

            response = await chai.request(index)
            .post('/products')
            .send({
                name: "Marreta do chapolin",
                quantity: 0
            })


            expect(response.status).to.be.equal(422);
            expect(response.body.message).to.be.eq('\"quantity\" must be greater than or equal to 1');
    
        });


        it('retorna um array que possui objetos', async () => {

            response = await chai.request(index)
            .post('/products')
            .send({
                name: "Marreta do chapolin",
                quantity: 5
            })

            expect(response.body.status).to.be.equal(200);
            expect(response.body.message).to.be.eqls(resultReturn);
    
        });
        it('o objeto possui os atributos telefone e Marreta do chapolin ', async () => {
            response = await chai.request(index)
            .post('/products')
            .send({
                name: "Marreta do chapolin",
                quantity: 5
            })
            
            expect(response.body.message.name).to.equal(
                'Marreta do chapolin'
            );
        })
    })
    describe('Verifica se é possivel deletar um produto', () => {

        const resultExecute = [{status: 200, message:{} }]

        before(() => {
            sinon.stub(teste, 'deleteProduct').resolves(resultExecute);
        });

        after(() => {
            teste.deleteProduct.restore();
        })
        
        it('Verifica se retorna um status 204 e um array vazio ', async () => {
            response = await chai.request(index)
            .delete('/products/1')

            console.log('teste',response.status);
           
            expect(response.status).to.be.equal(204);
            expect(response.body).to.be.empty;
            
        })
    })
    describe('Verifica se é possivel deletar um produto nao existente', () => {


        before(() => {
            sinon.stub(teste, 'deleteProduct').callsFake(() => {
                throw {status: 404, message: 'Product not found'}
            } );
        })

        after(() => {
            teste.deleteProduct.restore();
        })
        
        it('Verifica se retorna um status 204 e um array vazio ', async () => {
            response = await chai.request(index)
            .delete('/products/1')

            console.log('teste',response.status);
           
            expect(response.status).to.be.equal(404);
            // expect(response.body).to.be.empty;
            
        })
    })
    
    describe('Verifica se é possivel atualizar um produto', async () => {

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
            response = await chai.request(index)
            .put('/products/1')
            .send({
                name: "Marreta do chapolin",
                quantity: 10
            })
            

        });
    })
    describe('Verifica se é possivel atualizar um produto que nao existe', async () => {

        const newProduct = [{
            id: 1,
            name: 'telefone celular',
            quantity: 10,
        }];



        before(() => {
            sinon.stub(getProducts, 'putProduct').callsFake(() => {
                throw {status: 404, message: 'Product not found'}
            } );

        });

        after(() => {
            getProducts.putProduct.restore();
        })

        it('retorna um array que possui objetos', async () => {
            response = await chai.request(index)
            .put('/products/1')
            .send({
                name: "Marreta do chapolin",
                quantity: 10
            })
            

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
