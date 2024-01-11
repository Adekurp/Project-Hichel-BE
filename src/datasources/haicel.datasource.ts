import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
require('dotenv').config();

const config = {
  name: 'HAICEL',
  connector: 'mysql',
  url: '',
  host: process.env.HAICEL_HOST,
  port: process.env.HAICEL_PORT,
  user: process.env.HAICEL_USER,
  password: process.env.HAICEL_PASSWORD,
  database: process.env.HAICEL_DATABASE
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class HaicelDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'HAICEL';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.HAICEL', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
