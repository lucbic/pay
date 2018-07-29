import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'fetchTablesData',
      'fetchClientsData',
      'fetchProductsData'
    ])
  },
  created () {
    this.fetchTablesData()
      .then(() => {
        console.log('Tables data successfully fetched')
      })
      .catch(error => {
        console.log('Error while fetching tables data. Make sure you ar running the json-server')
        console.error(error)
      })
    this.fetchClientsData()
      .then(() => {
        console.log('Clients data successfully fetched')
      })
      .catch(error => {
        console.log('Error while fetching clients data. Make sure you ar running the json-server')
        console.error(error)
      })
    this.fetchProductsData()
      .then(() => {
        console.log('Products data successfully fetched')
      })
      .catch(error => {
        console.log('Error while fetching products data. Make sure you ar running the json-server')
        console.error(error)
      })
  }
}
