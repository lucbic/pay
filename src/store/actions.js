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
        commit(types.SET_TABLES, response.data)
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
