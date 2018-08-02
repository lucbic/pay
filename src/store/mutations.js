import * as types from './mutation-types'

export default {
  [types.SET_CURRENT_TABLE_INDEX] (state, tableIndex) {
    state.currentTableIndex = tableIndex
  },
  [types.SET_ACTIVE_CLIENT] (state, id) {
    state.activeClient = id
  },
  [types.SET_TABLES] (state, tables) {
    state.tables = tables
  },
  [types.SET_CLIENTS] (state, clients) {
    state.clients = clients
  },
  [types.SET_PRODUCTS] (state, products) {
    state.products = products
  },
  [types.ADD_CLIENT] (state, { name, tableIndex }) {
    const client = {
      id: (state.clients.length + 1),
      name: name
    }

    state.tables[tableIndex].clients.push(client.id)
    state.clients.push(client)
  },
  [types.SET_SCREEN_SM] (state, scr) {
    state.screenSm = scr
  }
}
