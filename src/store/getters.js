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
  if (state.currentTableIndex === null) { return [] }
  const clientsIds = state.tables[state.currentTableIndex].clients
  return state.orders.filter(order => clientsIds.includes(order.client_id))
}

export const clientOrders = state => (tableIndex, id) => {
  if (state.orders === null) { return [] }
  return state.orders.filter(order => order.client_id === id)
}

export const clientTotal = (state, getters) => id => {
  const tableIndex = state.currentTableIndex
  const orders = getters.clientOrders(tableIndex, id)
  let total = 0

  orders.forEach(order => {
    total += (getters.getProduct(order.product_id).price * order.amount)
  })
  return total
}

export const activeClientTotal = (state, getters) => {
  if (state.activeClient === -1) { return }
  return getters.clientTotal(state.activeClient)
}

export const activeClientName = (state) => {
  if (state.activeClient === -1) { return }
  return state.clients.find(x => x.id === state.activeClient).name
}

export const clientName = state => id => {
  return state.clients.find(x => x.id === id).name
}

export const getTotal = (state, getters) => id => {
  let total = 0
  const clientsIds = state.tables[state.currentTableIndex].clients
  clientsIds.forEach(x => {
    if (state.clients.find(y => y.id === x).paid) { return }
    total += getters.clientTotal(x)
  })
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

export const productsList = state => category => {
  if (state.products === null) { return }
  return state.products.filter(x => x.category === category)
}

export const clientCheckoutReady = (state, getters) => {
  const orders = getters.clientOrders(state.currentTableIndex, state.activeClient)
  return orders.every(x => x.status === true)
}

export const tableCheckoutReady = (state, getters) => {
  return getters.tableOrders.every(x => x.status === true)
}

export const getProduct = (state) => id => {
  return state.products.find(x => x.id === id)
}

export const getClient = (state) => id => {
  return state.clients.find(x => x.id === id)
}
