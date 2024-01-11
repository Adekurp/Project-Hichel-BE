import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Transaksi} from '../models';
import {TransaksiRepository} from '../repositories';

export class TransaksiController {
  constructor(
    @repository(TransaksiRepository)
    public transaksiRepository: TransaksiRepository,
  ) { }

  @post('/transaksis')
  @response(200, {
    description: 'Transaksi model instance',
    content: {'application/json': {schema: getModelSchemaRef(Transaksi)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaksi, {
            title: 'NewTransaksi',
            exclude: ['id', 'id_transaksi'],
          }),
        },
      },
    })
    transaksi: Omit<Transaksi, 'id'>,
  ): Promise<Transaksi> {

    const lastTransaction = await this.transaksiRepository.findOne({
      order: ['id_transaksi DESC'],
    });

    const lastNumber = lastTransaction ? parseInt(lastTransaction.id_transaksi.substr(1)) : 0;
    const newNumber = lastNumber + 1;

    const formattedNumber = newNumber.toString().padStart(4, '0');
    transaksi.id_transaksi = 'T' + formattedNumber;

    const createdTransaksi = await this.transaksiRepository.create(transaksi);

    return createdTransaksi;

  }

  @get('/transaksis/count')
  @response(200, {
    description: 'Transaksi model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Transaksi) where?: Where<Transaksi>,
  ): Promise<Count> {
    return this.transaksiRepository.count(where);
  }

  @get('/transaksis')
  @response(200, {
    description: 'Array of Transaksi model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Transaksi, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Transaksi) filter?: Filter<Transaksi>,
  ): Promise<Transaksi[]> {
    return this.transaksiRepository.find(filter);
  }

  @patch('/transaksis')
  @response(200, {
    description: 'Transaksi PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaksi, {partial: true}),
        },
      },
    })
    transaksi: Transaksi,
    @param.where(Transaksi) where?: Where<Transaksi>,
  ): Promise<Count> {
    return this.transaksiRepository.updateAll(transaksi, where);
  }

  @get('/transaksis/{id}')
  @response(200, {
    description: 'Transaksi model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Transaksi, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Transaksi, {exclude: 'where'}) filter?: FilterExcludingWhere<Transaksi>
  ): Promise<Transaksi> {
    return this.transaksiRepository.findById(id, filter);
  }

  @patch('/transaksis/{id}')
  @response(204, {
    description: 'Transaksi PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaksi, {partial: true}),
        },
      },
    })
    transaksi: Transaksi,
  ): Promise<void> {
    await this.transaksiRepository.updateById(id, transaksi);
  }

  @put('/transaksis/{id}')
  @response(204, {
    description: 'Transaksi PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() transaksi: Transaksi,
  ): Promise<void> {
    await this.transaksiRepository.replaceById(id, transaksi);
  }

  @del('/transaksis/{id}')
  @response(204, {
    description: 'Transaksi DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.transaksiRepository.deleteById(id);
  }
}
