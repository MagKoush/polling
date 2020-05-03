// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as MongoUserSchema from '../../src/mongo/models/User';

// workaround for passport request user object
// more info: https://github.com/microsoft/TypeScript-Node-Starter/issues/221
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends MongoUserSchema.User {}
  }
}
