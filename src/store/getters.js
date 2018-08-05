export const tableClients = state => {
  if (state.currentTableIndex === null) { return }

  let clients = []
  const ids = state.tables[state.currentTableIndex].clients

  ids.forEach(clientId => {
    clients.push(state.clients.find(x => x.id === clientId))
  })

  return clients
}

export const tableOrders = state => {
  if (state.currentTableIndex === null) { return }

  let orders = []
  const clientsIds = state.tables[state.currentTableIndex].clients
  const ordersData = state.orders.filter(order => {
    return clientsIds.includes(order.client_id)
  })

  ordersData.forEach(orderData => {
    const product = state.products.find(x => x.id === orderData.product_id)
    const client = state.clients.find(x => x.id === orderData.client_id)

    let order = {
      id: orderData.id,
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

export const clientOrders = state => (tableIndex, id) => {
  let orders = []

  const ordersData = state.orders.filter(x => id === x.client_id)

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

export const clientTotal = (state, getters) => id => {
  const tableIndex = state.currentTableIndex
  const orders = getters.clientOrders(tableIndex, id)
  let total = 0

  orders.forEach(order => {
    total += (order.price * order.amount)
  })
  return total
}

export const activeClientTotal = (state, getters) => id => {
  if (state.activeClient === -1) { return }
  return getters.clientTotal(state.activeClient)
}

export const activeClientName = (state) => {
  if (state.activeClient === -1) { return }
  return state.clients.find(x => x.id === state.activeClient).name
}

export const getTotal = (state, getters) => id => {
  const orders = getters.tableOrders
  let total = 0

  orders.forEach(order => { total += order.price * order.amount })

  return total
}

export const activeOrderStatus = (state) => {
  if (state.activeOrder === -1) { return }
  return state.orders.find(x => x.id === state.activeOrder).status
}

export const activeOrderProduct = state => {
  if (state.activeOrder === -1) { return }
  const order = state.orders.find(x => x.id === state.activeOrder)
  const product = state.products.find(x => x.id === order.product_id)
  return {
    name: product.name,
    amount: order.amount
  }
}
