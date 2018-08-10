// import tables from 'static/tables.json'
import axios from 'axios'
import * as types from './mutation-types'

export const fetchTablesData = ({ commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/tables',
      responseType: 'json'
    })
      .then((response) => {
        commit(types.SET_TABLES_AND_ORDERS, response.data)
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const fetchClientsData = ({ commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/clients',
      responseType: 'json'
    })
      .then((response) => {
        commit(types.SET_CLIENTS, response.data)
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const fetchProductsData = ({ commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/products',
      responseType: 'json'
    })
      .then((response) => {
        commit(types.SET_PRODUCTS, response.data)
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
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

export const checkoutActiveClient = ({ commit }) => {
  commit(types.CHECKOUT_ACTIVE_CLIENT)
}
