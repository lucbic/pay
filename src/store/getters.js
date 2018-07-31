export const getTables = state => state.tables

export const getTable = state => index => state.tables[index]

export const getClients = state => ids => {
  let clients = []

  ids.forEach(clientId => {
    clients.push(state.clients.find(x => x.id === clientId))
  })

  return clients
}
