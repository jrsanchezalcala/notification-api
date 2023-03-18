import { notification } from './notification/notification.js'

export const services = (app) => {
  app.configure(notification)

  // All services will be registered here
}
