const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  development: {
    connection: {
      database: "be_nc_news"
      // username: "",
      // password: "",
    }
  },
  test: {
    connection: {
      database: "be_nc_news_test"
      // username: "",
      // password: "",
    }
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
