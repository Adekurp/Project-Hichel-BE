import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Transaksi} from './transaksi.model';

@model()
export class Testimoni extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  desc: string;

  @property({
    type: 'number',
    required: true,
  })
  rate: number;

  @belongsTo(() => Transaksi)
  transaksiId: number;

  constructor(data?: Partial<Testimoni>) {
    super(data);
  }
}

export interface TestimoniRelations {
  // describe navigational properties here
}

export type TestimoniWithRelations = Testimoni & TestimoniRelations;
