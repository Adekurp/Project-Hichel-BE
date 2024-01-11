import {Entity, model, property} from '@loopback/repository';

@model()
export class UserCredential extends Entity {
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
  id_bot_user: string;

  @property({
    type: 'string',
    required: true,
  })
  number: string;

  @property({
    type: 'string',
    required: true,
  })
  code_verif: string;


  constructor(data?: Partial<UserCredential>) {
    super(data);
  }
}

export interface UserCredentialRelations {
  // describe navigational properties here
}

export type UserCredentialWithRelations = UserCredential & UserCredentialRelations;
