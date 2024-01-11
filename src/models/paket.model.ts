import {Entity, model, property} from '@loopback/repository';

@model()
export class Paket extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  harga: number;

  @property({
    type: 'string',
  })
  desc?: string;


  constructor(data?: Partial<Paket>) {
    super(data);
  }
}

export interface PaketRelations {
  // describe navigational properties here
}

export type PaketWithRelations = Paket & PaketRelations;
