import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Testimoni,
  Transaksi,
} from '../models';
import {TestimoniRepository} from '../repositories';

export class TestimoniTransaksiController {
  constructor(
    @repository(TestimoniRepository)
    public testimoniRepository: TestimoniRepository,
  ) { }

  @get('/testimonis/{id}/transaksi', {
    responses: {
      '200': {
        description: 'Transaksi belonging to Testimoni',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Transaksi),
          },
        },
      },
    },
  })
  async getTransaksi(
    @param.path.number('id') id: typeof Testimoni.prototype.id,
  ): Promise<Transaksi> {
    return this.testimoniRepository.transaksi(id);
  }
}
