import * as types from './mutation-types'

export default {
  [types.SET_CURRENT_TABLE_INDEX] (state, tableIndex) {
    state.currentTableIndex = tableIndex
  },
  [types.SET_ACTIVE_CLIENT] (state, id) {
    state.activeClient = id
  },
  [types.DELETE_ACTIVE_CLIENT] (state) {
    const client = state.clients.find(x => x.id === state.activeClient)
    const tableClients = state.tables[state.currentTableIndex].clients
    const tableClient = tableClients.find(x => x === state.activeClient)
    const index = state.clients.indexOf(client)
    const indexTable = tableClients.indexOf(tableClient)

    state.clients.splice(index, 1)
    tableClients.splice(indexTable, 1)
    state.activeClient = -1

    if (state.tables[state.currentTableIndex].clients.length === 0) {
      state.tables[state.currentTableIndex].open = false
    }
  },
  [types.SET_ACTIVE_ORDER] (state, id) {
    state.activeOrder = id
  },
  [types.TOGGLE_ACTIVE_ORDER_STATUS] (state) {
    let order = state.orders.find(x => x.id === state.activeOrder)
    order.status = !order.status
    state.activeOrder = -1
  },
  [types.DELETE_ACTIVE_ORDER] (state) {
    const order = state.orders.find(x => x.id === state.activeOrder)
    const index = state.orders.indexOf(order)

    state.orders.splice(index, 1)
    state.activeOrder = -1
  },
  [types.SET_TABLES_AND_ORDERS] (state, tables) {
    let orders = []

    tables.forEach(table => {
      if (table.orders.length === 0) { return }
      orders.push(...table.orders)
      delete table.orders
    })

    state.tables = tables
    state.orders = orders
  },
  [types.SET_CLIENTS] (state, clients) {
    clients.map(client => { client.paid = false })
    state.clients = clients
  },
  [types.SET_PRODUCTS] (state, products) {
    state.products = products
  },
  [types.ADD_CLIENT] (state, { name, tableIndex }) {
    let largestId = -1

    state.clients.forEach(client => {
      if (client.id > largestId) { largestId = client.id }
    })

    const client = {
      id: largestId + 1,
      name: name,
      paid: false
    }

    if (state.tables[tableIndex].clients.length === 0) {
      state.tables[tableIndex].open = true
    }
    state.tables[tableIndex].clients.push(client.id)
    state.clients.push(client)
  },
  [types.SET_SCREEN_SM] (state, scr) {
    state.screenSm = scr
  },
  [types.ADD_ORDERS] (state, orders) {
    let largestId = -1

    state.orders.forEach(order => {
      if (order.id > largestId) { largestId = order.id }
    })

    orders.forEach(order => {
      largestId += 1
      delete order.client
      delete order.product
      delete order.price
      order.paid = false
      order.id = largestId
      state.orders.push(order)
    })
  },
  [types.CHECKOUT_ACTIVE_CLIENT] (state) {
    let client = state.clients.find(x => x.id === state.activeClient)
    client.paid = true

    state.orders.forEach(x => { if (x.client_id === client.id) { x.paid = true } })

    state.activeClient = -1
  },
  [types.CLOSE_CURRENT_TABLE] (state) {
    // reset table
    let table = state.tables[state.currentTableIndex]
    table.open = false
    table.clients = []
    table.orders = []
    // remove clients from database
    const ids = state.tables[state.currentTableIndex].clients
    ids.forEach(id => {
      const index = state.clients.findIndex(x => x.id === id)
      state.clients.splice(index, 1)
    })
    // set current table to null
    state.currentTableIndex = null
  },
  [types.SET_FIXED_SCREEN] (state, val) {
    state.fixedScreen = val
  },
  [types.TOGGLE_FULL_SCREEN] (state) {
    state.fullscreen = !state.fullscreen
  }
}
