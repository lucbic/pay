import * as types from './mutation-types'

export default {
  [types.SET_CURRENT_TABLE_INDEX] (state, tableIndex) {
    state.currentTableIndex = tableIndex
  },
  [types.SET_TABLES] (state, tables) {
    state.tables = tables
  },
  [types.SET_CLIENTS] (state, clients) {
    state.clients = clients
  },
  [types.SET_PRODUCTS] (state, products) {
    state.products = products
  }
}
