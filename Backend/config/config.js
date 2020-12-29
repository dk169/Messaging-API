import dotenv from 'dotenv'

dotenv.config()

export default   {
    db: {
      production: process.env.MONGO_URI,
      development: process.env.MONGO_URI,
      test: process.env.MONGO_URI,
    },
    dbParams: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
};