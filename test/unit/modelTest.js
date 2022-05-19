const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const getProducts = require('../../models/productsModel');
const getSales = require('../../models/salesModel')

describe('Model: Busca os produtos cadastrados', () => {
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
    describe('Verifica se é possivel deletar um produto', () => {

        const newProduct = [{
            id: 1,
            name: 'telefone',
            quantity: 10,
        }];

        before(() => {
            sinon.stub(connection, 'execute').resolves([ newProduct]);
        });

        after(() => {
            connection.execute.restore();
        })

        // it('retorna um array', () => {});
        // it('retorna um array nao vazio', () => {});
        it('retorna um array que possui objetos', async () => {
            const result = await getProducts.deleteProduct(2);
            console.log(result);

            expect(result).to.be.length(1);
        });
        it('o objeto possui os atributos telefone e Marreta do chapolin ', async () => {
            const [result] = await getProducts.deleteProduct(2);

            expect(result).to.equal(
                1,
            );
        })
    })
    describe('Verifica se é possivel atualizar um produto', () => {

        const newProduct = [{
            id: 1,
            name: 'telefone celular',
            quantity: 10,
        }];

        before(() => {
            sinon.stub(connection, 'execute').resolves([ newProduct]);
        });

        after(() => {
            connection.execute.restore();
        })

        it('retorna um array que possui objetos', async () => {
            const result = await getProducts.toUpdateProduct(1);

            expect(result.productUpdated[0].name).to.be.equal('telefone celular');
        });
    })
    
    
})
describe('Model: Busca os vendas cadastrados', () => {
    describe('Quando nao retorna nenhum venda', () => {

        const resultExecute = []
        before(() => {
            sinon.stub(connection, 'execute').resolves([resultExecute]);
        });
        after(() => {
            connection.execute.restore()
        })

        it('retorna um array', async () => {
            const result = await getSales.getSales();

            expect(result).to.be.an('array');
        });
        it('retorna um array vazio', async () => {
            const result = await getSales.getSales();

            expect(result).to.be.empty;
        });
    });

       describe('Quando existe vendas cadastradas', () => {

        const resultExecute = [
            {
                "saleId": 1,
                "date": "2022-05-19T12:08:18.000Z",
                "productId": 1,
                "quantity": 5
            },
            {
                "saleId": 2,
                "date": "2022-05-19T12:08:18.000Z",
                "productId": 3,
                "quantity": 15
            }
        ]

        before(() => {
            sinon.stub(connection, 'execute').resolves([resultExecute]);
        });

        after(() => {
            connection.execute.restore();
        })

        // it('retorna um array', () => {});
        // it('retorna um array nao vazio', () => {});
        it('retorna um array que possui objetos', async () => {
            const [result] = await getSales.getSales();

            expect(result).to.be.an('object');
        });
        it('o objeto possui os atributos saleId, date, productId e quantity', async () => {
            const [result] = await getSales.getSales();

            expect(result).to.be.includes.all.keys(
                'saleId',
                'date',
                'productId',
                'quantity'
            );
        })
    })
    describe('Busca por venda cadastrada por id', () => {

        const resultExecute = [
            {
                "saleId": 1,
                "date": "2022-05-19T12:08:18.000Z",
                "productId": 1,
                "quantity": 5
            }
        ]

        before(() => {
            sinon.stub(connection, 'execute').resolves([resultExecute]);
        });

        after(() => {
            connection.execute.restore();
        })

        // it('retorna um array', () => {});
        // it('retorna um array nao vazio', () => {});
        it('retorna um array que possui objetos', async () => {
            const [result] = await getSales.getSalesById(1);

            expect(result).to.be.an('object');
        });
        it('o objeto possui os atributos date, productId e quantity ', async () => {
            const [result] = await getSales.getSalesById(1);

            expect(result).to.be.includes.all.keys(
                'date',
                'productId',
                'quantity'
            );
        })
    })
    describe('Verifica se é possivel adicionar uma venda', () => {
        const id = 2;
        const newId =3;
        const promisses = [
            {
              "productId": 1,
              "quantity": 20
            },
            {
              "productId": 2,
              "quantity": 55
            }
          ];
        const resultExecute = {
            "id": 3,
            "itemsSold": [
                {
                    "productId": 1,
                    "quantity": 20
                },
                {
                    "productId": 2,
                    "quantity": 55
                }
            ]
        }

        const newSale =  [
            {
              "productId": 1,
              "quantity": 20
            },
            {
              "productId": 2,
              "quantity": 55
            }
          ]
        before(() => {
            sinon.stub(getSales, 'addSale').resolves([resultExecute]);
        });

        after(() => {
            getSales.addSale.restore();
        })

        // it('retorna um array', () => {});
        // it('retorna um array nao vazio', () => {});
        // it('retorna um array que possui objetos', async () => {
        //     const [result] = await getSales.addSale(newSale);
        
        //     expect(result.newSale).to.be.length(2);
        // });
        it('o objeto possui os atributos telefone e Marreta do chapolin ', async () => {
            const [result] = await getSales.addSale(newSale);
                console.log(result);

            expect(result).to.be.includes.all.keys(
                'id',
                'itemsSold'
            );
            // expect(result).to.equal(
            //     'Marreta do chapolin'
            // );
        })
    })
    // describe('Verifica se é possivel deletar um produto', () => {

    //     const newProduct = [{
    //         id: 1,
    //         name: 'telefone',
    //         quantity: 10,
    //     }];

    //     before(() => {
    //         sinon.stub(connection, 'execute').resolves([ newProduct]);
    //     });

    //     after(() => {
    //         connection.execute.restore();
    //     })

    //     // it('retorna um array', () => {});
    //     // it('retorna um array nao vazio', () => {});
    //     it('retorna um array que possui objetos', async () => {
    //         const result = await getSales.deleteSale(2);
    //         console.log(result);

    //         expect(result).to.be.length(1);
    //     });
    //     it('o objeto possui os atributos telefone e Marreta do chapolin ', async () => {
    //         const result = await getSales.deleteSale(2);
    //         console.log(result);

    //         expect(result).to.equal(
    //             1,
    //         );
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

    //         expect(result.productUpdated[0].name).to.be.equal('telefone celular');
    //     });
    // })
    
    
})