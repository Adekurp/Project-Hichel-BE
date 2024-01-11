import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {HaicelDataSource} from '../datasources';
import {Testimoni, TestimoniRelations, Transaksi} from '../models';
import {TransaksiRepository} from './transaksi.repository';

export class TestimoniRepository extends DefaultCrudRepository<
  Testimoni,
  typeof Testimoni.prototype.id,
  TestimoniRelations
> {

  public readonly transaksi: BelongsToAccessor<Transaksi, typeof Testimoni.prototype.id>;

  constructor(
    @inject('datasources.HAICEL') dataSource: HaicelDataSource, @repository.getter('TransaksiRepository') protected transaksiRepositoryGetter: Getter<TransaksiRepository>,
  ) {
    super(Testimoni, dataSource);
    this.transaksi = this.createBelongsToAccessorFor('transaksi', transaksiRepositoryGetter,);
    this.registerInclusionResolver('transaksi', this.transaksi.inclusionResolver);
  }
}
