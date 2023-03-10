/* global io, feathers, moment */
// Establish a Socket.io connection
const socket = io()
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers()
const notificationMethods = ['find', 'get', 'create', 'listen']
const channel = 'system'
const socketClient = feathers.socketio(socket)
client.configure(socketClient)

function addNotification(data) {
  const notification = document.createElement('li')
  notification.innerText = JSON.stringify(data, null, '\t')
  document.querySelector('#systemEventList').appendChild(notification)
}
client.use('notification', socketClient.service('notification'), { methods: notificationMethods })
client.service('notification').listen(channel)
client.service('notification').on('created', addNotification)
