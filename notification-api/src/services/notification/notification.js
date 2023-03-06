// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  notificationDataValidator,
  notificationPatchValidator,
  notificationQueryValidator,
  notificationResolver,
  notificationExternalResolver,
  notificationDataResolver,
  notificationPatchResolver,
  notificationQueryResolver
} from './notification.schema.js'
import { NotificationService, getOptions } from './notification.class.js'
import { notificationPath, notificationMethods } from './notification.shared.js'

export * from './notification.class.js'
export * from './notification.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const notification = (app) => {
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
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(notificationDataValidator),
        schemaHooks.resolveData(notificationDataResolver)
      ],
      patch: [
        schemaHooks.validateData(notificationPatchValidator),
        schemaHooks.resolveData(notificationPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
