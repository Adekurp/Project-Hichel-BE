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
import {Testimoni} from '../models';
import {TestimoniRepository} from '../repositories';

export class TestimoniController {
  constructor(
    @repository(TestimoniRepository)
    public testimoniRepository : TestimoniRepository,
  ) {}

  @post('/testimonis')
  @response(200, {
    description: 'Testimoni model instance',
    content: {'application/json': {schema: getModelSchemaRef(Testimoni)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testimoni, {
            title: 'NewTestimoni',
            exclude: ['id'],
          }),
        },
      },
    })
    testimoni: Omit<Testimoni, 'id'>,
  ): Promise<Testimoni> {
    return this.testimoniRepository.create(testimoni);
  }

  @get('/testimonis/count')
  @response(200, {
    description: 'Testimoni model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Testimoni) where?: Where<Testimoni>,
  ): Promise<Count> {
    return this.testimoniRepository.count(where);
  }

  @get('/testimonis')
  @response(200, {
    description: 'Array of Testimoni model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Testimoni, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Testimoni) filter?: Filter<Testimoni>,
  ): Promise<Testimoni[]> {
    return this.testimoniRepository.find(filter);
  }

  @patch('/testimonis')
  @response(200, {
    description: 'Testimoni PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testimoni, {partial: true}),
        },
      },
    })
    testimoni: Testimoni,
    @param.where(Testimoni) where?: Where<Testimoni>,
  ): Promise<Count> {
    return this.testimoniRepository.updateAll(testimoni, where);
  }

  @get('/testimonis/{id}')
  @response(200, {
    description: 'Testimoni model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Testimoni, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Testimoni, {exclude: 'where'}) filter?: FilterExcludingWhere<Testimoni>
  ): Promise<Testimoni> {
    return this.testimoniRepository.findById(id, filter);
  }

  @patch('/testimonis/{id}')
  @response(204, {
    description: 'Testimoni PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testimoni, {partial: true}),
        },
      },
    })
    testimoni: Testimoni,
  ): Promise<void> {
    await this.testimoniRepository.updateById(id, testimoni);
  }

  @put('/testimonis/{id}')
  @response(204, {
    description: 'Testimoni PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() testimoni: Testimoni,
  ): Promise<void> {
    await this.testimoniRepository.replaceById(id, testimoni);
  }

  @del('/testimonis/{id}')
  @response(204, {
    description: 'Testimoni DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.testimoniRepository.deleteById(id);
  }
}
