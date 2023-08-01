export default () => ({
  app: {
    name: process.env.APP_NAME,
    key: process.env.APP_KEY,
    url: process.env.APP_URL,
    client_app_url: process.env.CLIENT_APP_URL,
    port: parseInt(process.env.PORT, 10) || 3000,
    root_path: process.env.ROOT_PATH,
  },

  fileSystems: {
    public: {},
    s3: {
      driver: 's3',
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION,
      bucket: process.env.AWS_BUCKET,
      url: process.env.AWS_URL,
      endpoint: process.env.AWS_ENDPOINT,
    },
  },

  database: {
    url: process.env.DATABASE_URL,
  },

  redis: {
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    port: process.env.REDIS_PORT,
  },

  security: {
    salt: 10,
  },

  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    user: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM_NAME,
  },

  auth: {},

  /**
   * Storage directory
   */
  storageUrl: {
    rootUrl: '.',
    avatar: 'public/storage/avatar',
  },
});
