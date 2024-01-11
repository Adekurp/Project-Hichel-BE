import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Paket} from './paket.model';

@model()
export class Transaksi extends Entity {

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
  id_transaksi: string;

  @property({
    type: 'date',
    required: true,
  })
  tanggal: string;

  @property({
    type: 'string',
    required: true,
  })
  nama: string;

  @property({
    type: 'string',
    required: true,
  })
  kategori: string;

  @property({
    type: 'string',
    required: true,
  })
  url_undangan: string;

  @belongsTo(() => Paket)
  paketId: number;

  constructor(data?: Partial<Transaksi>) {
    super(data);
  }
}

export interface TransaksiRelations {
  // describe navigational properties here
}

export type TransaksiWithRelations = Transaksi & TransaksiRelations;
