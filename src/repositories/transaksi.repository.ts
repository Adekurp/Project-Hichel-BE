import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {HaicelDataSource} from '../datasources';
import {Paket, Transaksi, TransaksiRelations} from '../models';
import {PaketRepository} from './paket.repository';

export class TransaksiRepository extends DefaultCrudRepository<
  Transaksi,
  typeof Transaksi.prototype.id_transaksi,
  TransaksiRelations
> {

  public readonly paket: BelongsToAccessor<Paket, typeof Transaksi.prototype.id_transaksi>;

  constructor(
    @inject('datasources.HAICEL') dataSource: HaicelDataSource, @repository.getter('PaketRepository') protected paketRepositoryGetter: Getter<PaketRepository>,
  ) {
    super(Transaksi, dataSource);
    this.paket = this.createBelongsToAccessorFor('paket', paketRepositoryGetter,);
    this.registerInclusionResolver('paket', this.paket.inclusionResolver);
  }

  async findPaketByIdTransaksi(id_transaksi: string): Promise<Paket> {
    const transaksi = await this.findOne({
      where: {
        id_transaksi: id_transaksi
      }
    });
    if (!transaksi) {
      throw new HttpErrors.NotFound(`Transaksi with id_transaksi ${id_transaksi} not found`);
    }

    const paketId = transaksi.paketId;
    return (await this.paketRepositoryGetter()).findById(paketId);
  }

}
