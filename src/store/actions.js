import * as types from './mutation-types'
import Data from './data'

export const fetchData = ({ commit }) => {
  commit(types.SET_TABLES_AND_ORDERS, Data.tables)
  commit(types.SET_CLIENTS, Data.clients)
  commit(types.SET_PRODUCTS, Data.products)
}

export const setCurrentTableIndex = ({ commit }, tableIndex) => {
  commit(types.SET_CURRENT_TABLE_INDEX, tableIndex)
}

export const setActiveClient = ({ commit }, id) => {
  commit(types.SET_ACTIVE_CLIENT, id)
}

export const deleteActiveClient = ({ commit }) => {
  commit(types.DELETE_ACTIVE_CLIENT)
}

export const setActiveOrder = ({ commit }, id) => {
  commit(types.SET_ACTIVE_ORDER, id)
}

export const deleteActiveOrder = ({ commit }) => {
  commit(types.DELETE_ACTIVE_ORDER)
}

export const toggleActiveOrderStatus = ({ commit }) => {
  commit(types.TOGGLE_ACTIVE_ORDER_STATUS)
}

export const addClient = ({ commit, state }, name) => {
  const tableIndex = state.currentTableIndex
  commit(types.ADD_CLIENT, { name, tableIndex })
}

export const setScreenSm = ({ commit }, scr) => {
  commit(types.SET_SCREEN_SM, scr)
}

export const addOrders = ({ commit }, orders) => {
  commit(types.ADD_ORDERS, orders)
}

export const checkoutActiveClient = ({ commit, getters }) => {
  commit(types.CHECKOUT_ACTIVE_CLIENT)
  const tableClients = getters.tableClients
  let paid = 0
  tableClients.forEach(z => { if (z.paid) { paid += 1 } })
  if (tableClients.length === paid) {
    commit(types.CLOSE_CURRENT_TABLE)
    commit(types.SET_SCREEN_SM, 'tables')
  } else {
    commit(types.SET_SCREEN_SM, 'summary')
  }
}

export const setFixedScreen = ({ commit }, val) => {
  commit(types.SET_FIXED_SCREEN, val)
}

export const toggleFullScreen = ({ commit }) => {
  commit(types.TOGGLE_FULL_SCREEN)
}

export const closeCurrentTable = ({ commit }) => {
  commit(types.CLOSE_CURRENT_TABLE)
  commit(types.SET_SCREEN_SM, 'tables')
}
