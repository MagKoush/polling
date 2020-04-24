export const MONGO_URL =
  process.env.IS_LOCAL_DB === "true"
    ? process.env.LOCAL_MONGO_DB_URL
    : `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@polling-emknj.mongodb.net/test?retryWrites=true&w=majority`;
export const PORT = 6969;
