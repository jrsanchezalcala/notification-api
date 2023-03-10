import { MongoDBService } from '@feathersjs/mongodb'

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class NotificationService extends MongoDBService {
  async listen(data, params) {
    this.emit('listen', data, params)
    return {}
  }
}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('notification'))
  }
}
