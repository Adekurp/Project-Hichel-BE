import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Paket} from '../models';
import {PaketRepository} from '../repositories';

export class PaketControllerController {
  constructor(
    @repository(PaketRepository)
    public paketRepository : PaketRepository,
  ) {}

  @post('/pakets')
  @response(200, {
    description: 'Paket model instance',
    content: {'application/json': {schema: getModelSchemaRef(Paket)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paket, {
            title: 'NewPaket',
            exclude: ['id'],
          }),
        },
      },
    })
    paket: Omit<Paket, 'id'>,
  ): Promise<Paket> {
    return this.paketRepository.create(paket);
  }

  @get('/pakets/count')
  @response(200, {
    description: 'Paket model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Paket) where?: Where<Paket>,
  ): Promise<Count> {
    return this.paketRepository.count(where);
  }

  @get('/pakets')
  @response(200, {
    description: 'Array of Paket model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Paket, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Paket) filter?: Filter<Paket>,
  ): Promise<Paket[]> {
    return this.paketRepository.find(filter);
  }

  @patch('/pakets')
  @response(200, {
    description: 'Paket PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paket, {partial: true}),
        },
      },
    })
    paket: Paket,
    @param.where(Paket) where?: Where<Paket>,
  ): Promise<Count> {
    return this.paketRepository.updateAll(paket, where);
  }

  @get('/pakets/{id}')
  @response(200, {
    description: 'Paket model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Paket, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Paket, {exclude: 'where'}) filter?: FilterExcludingWhere<Paket>
  ): Promise<Paket> {
    return this.paketRepository.findById(id, filter);
  }

  @patch('/pakets/{id}')
  @response(204, {
    description: 'Paket PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paket, {partial: true}),
        },
      },
    })
    paket: Paket,
  ): Promise<void> {
    await this.paketRepository.updateById(id, paket);
  }

  @put('/pakets/{id}')
  @response(204, {
    description: 'Paket PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() paket: Paket,
  ): Promise<void> {
    await this.paketRepository.replaceById(id, paket);
  }

  @del('/pakets/{id}')
  @response(204, {
    description: 'Paket DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.paketRepository.deleteById(id);
  }
}
