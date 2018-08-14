export default {
  tables: [
    {
      open: true,
      clients: [
        0,
        1
      ],
      orders: [
        {
          id: 0,
          client_id: 0,
          product_id: 36,
          amount: 2,
          status: false,
          paid: false
        },
        {
          id: 1,
          client_id: 1,
          product_id: 4,
          amount: 1,
          status: false,
          paid: false
        }
      ]
    },
    {
      open: false,
      clients: [],
      orders: []
    },
    {
      open: false,
      clients: [],
      orders: []
    },
    {
      open: false,
      clients: [],
      orders: []
    },
    {
      open: false,
      clients: [],
      orders: []
    },
    {
      open: false,
      clients: [],
      orders: []
    },
    {
      open: false,
      clients: [],
      orders: []
    },
    {
      open: false,
      clients: [],
      orders: []
    },
    {
      open: false,
      clients: [],
      orders: []
    },
    {
      open: false,
      clients: [],
      orders: []
    }
  ],
  clients: [
    {
      id: 0,
      name: 'João Pereira'
    },
    {
      id: 1,
      name: 'Maria Silva'
    },
    {
      id: 2,
      name: 'José Costa'
    },
    {
      id: 3,
      name: 'Clara Nascimento'
    },
    {
      id: 4,
      name: 'Marcos de Andrade'
    },
    {
      id: 5,
      name: 'Andressa Carvalho'
    },
    {
      id: 6,
      name: 'André Oliveira'
    },
    {
      id: 7,
      name: 'Márcia Campobello'
    },
    {
      id: 8,
      name: 'Robson Soares'
    },
    {
      id: 9,
      name: 'Laura Lima'
    }
  ],
  products: [
    {
      id: 0,
      category: 'drinks',
      name: 'Água Mineral 500ml',
      price: 3.5
    },
    {
      id: 1,
      category: 'drinks',
      name: 'Água Mineral c/ Gás 500ml',
      price: 3.5
    },
    {
      id: 2,
      category: 'drinks',
      name: 'Refrigerante Lata 350ml',
      price: 5
    },
    {
      id: 3,
      category: 'drinks',
      name: 'Suco Integral Lata 350ml',
      price: 5
    },
    {
      id: 4,
      category: 'drinks',
      name: 'Cerveja Pilsen Long Neck 355ml',
      price: 8
    },
    {
      id: 5,
      category: 'drinks',
      name: 'Chopp Copo 500ml',
      price: 8
    },
    {
      id: 6,
      category: 'drinks',
      name: 'Capirinha Copo 500ml',
      price: 10
    },
    {
      id: 7,
      category: 'drinks',
      name: 'Drink Morango Copo 500ml',
      price: 10
    },
    {
      id: 8,
      category: 'drinks',
      name: 'Chá Mate c/ Limão 300ml',
      price: 6
    },
    {
      id: 9,
      category: 'drinks',
      name: 'Milkshake Chocolate 500ml',
      price: 6
    },
    {
      id: 10,
      category: 'dishes',
      name: 'Hambúrguer Cheddar',
      price: 15
    },
    {
      id: 11,
      category: 'dishes',
      name: 'Hambúrguer Frango',
      price: 13.5
    },
    {
      id: 12,
      category: 'dishes',
      name: 'Hambúrguer Picanha',
      price: 18
    },
    {
      id: 13,
      category: 'dishes',
      name: 'Hambúrguer Faláfel Vegan',
      price: 15
    },
    {
      id: 14,
      category: 'dishes',
      name: 'Hambúrguer Molho Picante',
      price: 17
    },
    {
      id: 15,
      category: 'dishes',
      name: 'Big Burguer Bacon',
      price: 20
    },
    {
      id: 16,
      category: 'dishes',
      name: 'Panqueca Três Queijos',
      price: 15
    },
    {
      id: 17,
      category: 'dishes',
      name: 'Panqueca Espinafre Vegan',
      price: 14
    },
    {
      id: 18,
      category: 'dishes',
      name: 'Panqueca Frango Cream Cheese',
      price: 16
    },
    {
      id: 19,
      category: 'dishes',
      name: 'Panqueca Carne',
      price: 16
    },
    {
      id: 20,
      category: 'sides',
      name: 'Fritas Dois Queijos Pequeno',
      price: 12
    },
    {
      id: 21,
      category: 'sides',
      name: 'Fritas Dois Queijos Médio',
      price: 15
    },
    {
      id: 22,
      category: 'sides',
      name: 'Fritas Dois Queijos Grande',
      price: 20
    },
    {
      id: 23,
      category: 'sides',
      name: 'Onion Rings Pequeno',
      price: 15
    },
    {
      id: 24,
      category: 'sides',
      name: 'Onion Rings Grande',
      price: 20
    },
    {
      id: 25,
      category: 'sides',
      name: 'Nachos c/ Cheddar Grande',
      price: 24
    },
    {
      id: 26,
      category: 'sides',
      name: 'Frango Frito Pequeno',
      price: 18
    },
    {
      id: 27,
      category: 'sides',
      name: 'Frango Frito Grande',
      price: 24
    },
    {
      id: 28,
      category: 'sides',
      name: 'Bolinho Tapioca c/ Queijo',
      price: 30
    },
    {
      id: 29,
      category: 'sides',
      name: 'Bolinho Shimeji Vegan',
      price: 30
    },
    {
      id: 30,
      category: 'desserts',
      name: 'Sorvete Chocolate Belga',
      price: 12
    },
    {
      id: 31,
      category: 'desserts',
      name: 'Sorvete Amora Vegan',
      price: 15
    },
    {
      id: 32,
      category: 'desserts',
      name: 'Mini Churros Doce de Leite',
      price: 10
    },
    {
      id: 33,
      category: 'desserts',
      name: 'Taça Morangos c/ Chantilly',
      price: 12
    },
    {
      id: 34,
      category: 'desserts',
      name: 'Crepe Francês Banana Caramelo',
      price: 12
    },
    {
      id: 35,
      category: 'desserts',
      name: 'Crepe Francês Creme Avelã',
      price: 14
    },
    {
      id: 36,
      category: 'desserts',
      name: 'Crepe Francês Frutas Vermelhas',
      price: 14
    },
    {
      id: 37,
      category: 'desserts',
      name: 'Pudim de Leite',
      price: 8
    },
    {
      id: 38,
      category: 'desserts',
      name: 'Mousse Caseira Chocolate',
      price: 8.5
    },
    {
      id: 39,
      category: 'desserts',
      name: 'Mousse Caseira Maracujá',
      price: 8.5
    }
  ]
}
