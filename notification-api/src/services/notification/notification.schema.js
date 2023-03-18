// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const notificationSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    type: Type.String(),
    topic: Type.String(),
    createdAt: Type.Number(),
    sendAt: Type.Number(),
    data: Type.Any()
  },
  { $id: 'Notification', additionalProperties: false }
)
export const notificationValidator = getValidator(notificationSchema, dataValidator)
export const notificationResolver = resolve({})

export const notificationExternalResolver = resolve({})

// Schema for creating new entries
export const notificationDataSchema = Type.Pick(notificationSchema, ['data', 'type', 'topic'], {
  $id: 'NotificationData'
})
export const notificationDataValidator = getValidator(notificationDataSchema, dataValidator)
export const notificationDataResolver = resolve({})

// Schema for updating existing entries
export const notificationPatchSchema = Type.Partial(notificationSchema, {
  $id: 'NotificationPatch'
})
export const notificationPatchValidator = getValidator(notificationPatchSchema, dataValidator)
export const notificationPatchResolver = resolve({})

// Schema for allowed query properties
export const notificationQueryProperties = Type.Pick(notificationSchema, [
  '_id',
  'topic',
  'type',
  'createdAt',
  'sendAt'
])
export const notificationQuerySchema = Type.Intersect(
  [
    querySyntax(notificationQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const notificationQueryValidator = getValidator(notificationQuerySchema, queryValidator)
export const notificationQueryResolver = resolve({})
