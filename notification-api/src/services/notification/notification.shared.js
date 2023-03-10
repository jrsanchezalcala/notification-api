export const notificationPath = 'notification'

export const notificationMethods = ['find', 'get', 'create', 'listen']

export const notificationClient = (client) => {
  const connection = client.get('connection')

  client.use(notificationPath, connection.service(notificationPath), {
    methods: notificationMethods
  })
}
