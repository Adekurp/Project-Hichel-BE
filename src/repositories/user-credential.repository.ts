import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HaicelDataSource} from '../datasources';
import {UserCredential, UserCredentialRelations} from '../models';

export class UserCredentialRepository extends DefaultCrudRepository<
  UserCredential,
  typeof UserCredential.prototype.id,
  UserCredentialRelations
> {
  constructor(
    @inject('datasources.HAICEL') dataSource: HaicelDataSource,
  ) {
    super(UserCredential, dataSource);
  }
}
