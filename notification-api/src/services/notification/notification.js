// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import { NotAuthenticated } from '@feathersjs/errors'
import {
  notificationDataValidator,
  notificationQueryValidator,
  notificationResolver,
  notificationExternalResolver,
  notificationDataResolver,
  notificationQueryResolver
} from './notification.schema.js'
import { NotificationService, getOptions } from './notification.class.js'
import { notificationPath, notificationMethods } from './notification.shared.js'

export * from './notification.class.js'
export * from './notification.schema.js'
var CLIENT_API_KEYS, SENDER_API_KEYS
// A configure function that registers the service and its hooks via `app.configure`
export const notification = (app) => {
  //set valid api-keys on memory
  CLIENT_API_KEYS = app.get('CLIENT_API_KEYS')
  SENDER_API_KEYS = app.get('SENDER_API_KEYS')
  // Register our service on the Feathers application
  app.use(notificationPath, new NotificationService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: notificationMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(notificationPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(notificationExternalResolver),
        schemaHooks.resolveResult(notificationResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(notificationQueryValidator),
        schemaHooks.resolveQuery(notificationQueryResolver)
      ],
      find: [checkClientAPIKey],
      get: [checkClientAPIKey],
      create: [
        checkSenderAPIKey,
        schemaHooks.validateData(notificationDataValidator),
        schemaHooks.resolveData(notificationDataResolver)
      ],
      patch: [notAvailable],
      remove: [notAvailable]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })

  function notAvailable() {
    throw new NotAuthenticated('NOT AVAILABLE')
  }

  function checkClientAPIKey(context, next) {
    const authHeader = context.params.headers.authorization
    if (authHeader && (CLIENT_API_KEYS.includes(authHeader) || checkSenderAPIKey(context, next))) {
      return true
    } else {
      throw new NotAuthenticated('Not Allowed')
    }
  }
  function checkSenderAPIKey(context, next) {
    const authHeader = context.params.headers.authorization
    if (authHeader && SENDER_API_KEYS.includes(authHeader)) {
      return true
    } else {
      throw new NotAuthenticated('Not Allowed')
    }
  }
}
