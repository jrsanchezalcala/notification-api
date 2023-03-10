import '@feathersjs/transport-commons'
import { logger } from './logger.js'

export const channels = (app) => {
  logger.warn(
    'Publishing all events to all authenticated users. See `channels.js` and https://dove.feathersjs.com/api/channels.html for more information.'
  )

  app.on('connection', (connection) => {
    app.channel('all').join(connection)
  })

  app.service('notification').publish('created', (data, context) => {
    if (data.type === 'all') {
      return app.channel('all')
    }
    if (data.type) {
      return app.channel(
        app.channels.filter((name) => {
          return name === `notification_${data.type}`
        })[0]
      )
    }
  })

  app.service('notification').on('listen', (data, params) => {
    let { connection } = params
    if (data && typeof data === 'string') {
      app.channel(`notification_${data}`).join(connection)
    }
  })
}
