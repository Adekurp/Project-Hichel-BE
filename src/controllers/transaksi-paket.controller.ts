import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Paket,
  Transaksi,
} from '../models';
import {TransaksiRepository} from '../repositories';

export class TransaksiPaketController {
  constructor(
    @repository(TransaksiRepository)
    public transaksiRepository: TransaksiRepository,
  ) { }

  @get('/transaksis/{id}/paket', {
    responses: {
      '200': {
        description: 'Paket belonging to Transaksi',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Paket),
          },
        },
      },
    },
  })
  async getPaket(
    @param.path.string('id') id: typeof Transaksi.prototype.id_transaksi,
  ): Promise<Paket> {
    return this.transaksiRepository.paket(id);
  }
}
