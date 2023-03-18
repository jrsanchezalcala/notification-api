/* global io, feathers, moment */
// Establish a Socket.io connection
const socket = io()
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers()

client.configure(feathers.socketio(socket))

function addNotification(data) {
  debugger
  const notification = document.createElement('li')
  notification.innerText = JSON.stringify(data, null, '\t')
  document.querySelector('#systemEventList').appendChild(notification)
}

client.service('notification').on('created', addNotification)
