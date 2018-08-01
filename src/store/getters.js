export const getCurrentTableIndex = state => state.currentTableIndex

export const getActiveClient = state => state.activeClient

export const getTables = state => state.tables

export const getTable = state => tableIndex => state.tables[tableIndex]

export const getClients = state => ids => {
  let clients = []

  ids.forEach(clientId => {
    clients.push(state.clients.find(x => x.id === clientId))
  })

  return clients
}

export const getTableOrders = state => tableIndex => {
  let orders = []
  const ordersData = state.tables[tableIndex].orders

  ordersData.forEach(orderData => {
    const product = state.products.find(x => x.id === orderData.product_id)
    const client = state.clients.find(x => x.id === orderData.client_id)

    let order = {
      product: product.name,
      productId: product.id,
      client: client.name,
      clientId: client.id,
      amount: orderData.amount,
      price: product.price,
      status: orderData.status
    }

    orders.push(order)
  })

  return orders
}

export const getClientOrders = state => (tableIndex, id) => {
  let orders = []
  const ordersData = state.tables[tableIndex].orders

  ordersData.forEach(orderData => {
    if (orderData.client_id !== id) { return }

    const product = state.products.find(x => x.id === orderData.product_id)

    let order = {
      product: product.name,
      productId: product.id,
      amount: orderData.amount,
      price: product.price,
      status: orderData.status
    }

    orders.push(order)
  })

  return orders
}
