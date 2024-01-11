import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HaicelDataSource} from '../datasources';
import {Paket, PaketRelations} from '../models';

export class PaketRepository extends DefaultCrudRepository<
  Paket,
  typeof Paket.prototype.id,
  PaketRelations
> {
  constructor(
    @inject('datasources.HAICEL') dataSource: HaicelDataSource,
  ) {
    super(Paket, dataSource);
  }
}
