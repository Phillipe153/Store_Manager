// const { expect } = require('chai');
// const sinon = require('sinon');
// const connection = require('../../models/connection');
// const getProducts = require('../../controllers/productsController');
// const teste = require('../../services/productsService');

// const { any } = require('joi');

// describe('Controller: Busca os produtos cadastrados', () => {
//     describe('Quando nao retorna nenhum produto', () => {


//         const resultExecute = [[],{status: 404, message: 'Product not found'} ]
//         // const resultExecute = {status: 200, message: []}
//         before(() => {
//             sinon.stub(getProducts, 'getProducts').resolves([ resultExecute]);
//         });

//         after(() => {
//             getProducts.getProducts.restore();
//         })

//         it('retorna um array', async () => {
//             const [result] = await getProducts.getProducts();
//             // console.log(result[1]);

//             expect(result[0]).to.be.an('array');
//         });
//         it('retorna um array vazio', async () => {
//             const [result] = await getProducts.getProducts();

//             expect(result[0]).to.be.empty;
//             expect(result[1].status).to.be.equal(404);
//             expect(result[1].message).to.be.equal('Product not found');
//         });
//     });

//        describe('Quando existe produtos cadastrados', () => {

//            const resultProducts =[
//                {
//                    "id": 1,
//                    "name": "Martelo de Thor",
//                 "quantity": 10
//             },
//             {
//                 "id": 2,
//                 "name": "Traje de encolhimento",
//                 "quantity": 20
//             },
//             {
//                 "id": 3,
//                 "name": "Escudo do Capitão América",
//                 "quantity": 30
//             }
//         ];
//         const resultExecute = {status: 200, message: resultProducts}

//         before(() => {

//             sinon.stub(getProducts, 'getProducts').resolves([resultExecute] );
//         });

//         after(() => {
//             getProducts.getProducts.restore();
//         })

//         it('retorna um array que possui objetos', async () => {
//             const [result] = await getProducts.getProducts();
            
//             expect(result).to.be.an('object');
//         });
//         it('o objeto possui os atributos id, name e quantity ', async () => {
//             const [result] = await getProducts.getProducts();

//             expect(result.status).to.be.equal(200);
//             expect(result.message).to.be.equal(resultProducts);

//         })
//     })
//     describe('Controller:  Buscando produto por um id', () => {

//         const resultProducts =[
//             {
//                 "id": 1,
//                 "name": "Martelo de Thor",
//              "quantity": 10
//          }
//      ];
//      const resultExecute = {status: 200, message: resultProducts}
//      const resultotExecute = {status: 404, message: 'Product not found'}

    
//      before(() => {
    
//          sinon.stub(getProducts, 'getProductsById').resolves([resultExecute, resultotExecute] );
//      });
    
//      after(() => {
//          getProducts.getProductsById.restore();
//      })
    
//      // it('retorna um array', () => {});
//      // it('retorna um array nao vazio', () => {});
//      it('retorna um array que possui objetos', async () => {
//          const result = await getProducts.getProductsById(2);
//          expect(result[1].status).to.be.equal(404);
//          expect(result[1].message).to.be.equal( 'Product not found');
//      });
//      it('o objeto possui os atributos id, name e quantity ', async () => {
//          const [result] = await getProducts.getProductsById(1);
         
//          expect(result.status).to.be.equal(200);
//          expect(result.message).to.be.equal(resultProducts);
    
//      })
//     })
//     describe('Verifica se é possivel adicionar um produto', () => {

//         const resultReturn = 
//         {
//             id: 2,
//             name: "Marreta do chapolin",
//             quantity: 5
//         };

//         const newProduct = {
//             "name": "Marreta do chapolin",
//             "quantity": 5
//         }

//         const resultExecute = {status: 200, message: resultReturn}

     
//         before(() => {
            
//             sinon.stub(getProducts, 'postProduct').resolves([resultExecute] );
//         });
        
//         after(() => {
//             getProducts.postProduct.restore();
//         })
        
//         it('retorna um array que possui objetos', async () => {
//             const [result] = await getProducts.postProduct(newProduct);

//             expect(result.status).to.be.equal(200);
//             expect(result.message).to.be.equal(resultReturn);
    
//         });
//         // it('o objeto possui os atributos telefone e Marreta do chapolin ', async () => {
//         //     const [result] = await getProducts.postProduct(newProduct);

//         //     expect(result.productsListName[0]).to.equal(
//         //         'telefone',
//         //     );
//         //     expect(result.productsListName[1]).to.equal(
//         //         'Marreta do chapolin'
//         //     );
//         // })
//     })
//     // describe('Verifica se é possivel deletar um produto', () => {

//     //     const newProduct = [{
//     //         id: 1,
//     //         name: 'telefone',
//     //         quantity: 10,
//     //     }];

//     //     before(() => {
//     //         sinon.stub(connection, 'execute').resolves([ newProduct]);
//     //     });

//     //     after(() => {
//     //         connection.execute.restore();
//     //     })

//     //     // it('retorna um array', () => {});
//     //     // it('retorna um array nao vazio', () => {});
//     //     it('retorna um array que possui objetos', async () => {
//     //         const result = await getProducts.deleteProduct(2);
//     //         console.log(result);

//     //         expect(result).to.be.length(1);
//     //     });
//     //     it('o objeto possui os atributos telefone e Marreta do chapolin ', async () => {
//     //         const [result] = await getProducts.deleteProduct(2);

//     //         expect(result).to.equal(
//     //             1,
//     //         );
//     //     })
//     // })
//     // describe('Verifica se é possivel atualizar um produto', () => {

//     //     const newProduct = [{
//     //         id: 1,
//     //         name: 'telefone celular',
//     //         quantity: 10,
//     //     }];

//     //     before(() => {
//     //         sinon.stub(connection, 'execute').resolves([ newProduct]);
//     //     });

//     //     after(() => {
//     //         connection.execute.restore();
//     //     })

//     //     it('retorna um array que possui objetos', async () => {
//     //         const result = await getProducts.toUpdateProduct(1);

//     //         expect(result.productUpdated[0].name).to.be.equal('telefone celular');
//     //     });
//     // })
    
    
// })
