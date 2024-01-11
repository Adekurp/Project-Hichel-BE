// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {ResponseObject, post, requestBody} from '@loopback/rest';
import {UserCredentialRepository, UserRepository} from '../repositories';

const Verif: ResponseObject = {
  description: 'verif code',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['CODE'],
        properties: {
          CODE: {
            type: 'string',
          }
        },
      },
    },
  },
};

const LOGOUT: ResponseObject = {
  description: 'create',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['NUMBER'],
        properties: {
          NUMBER: {
            type: 'string',
          }
        },
      },
    },
  },
};

const Register: ResponseObject = {
  description: 'create',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['NUMBER', 'NAME'],
        properties: {
          NUMBER: {
            type: 'string',
          },
          NAME: {
            type: 'string'
          }
        },
      },
    },
  },
};

export class AuthController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(UserCredentialRepository) protected userCredentialRepository: UserCredentialRepository
  ) { }

  @post('register', {
    responses: {
      '200': {
        description: 'register user',
      },
    },
  })
  async register(
    @requestBody(Register)
    register: {
      NAME: string;
      NUMBER: string;
    },
  ): Promise<Object> {
    try {
      const create = await this.userRepository.create({
        name: register.NAME,
        number: register.NUMBER
      })
      return {success: true, data: create}
    } catch (err) {
      return {success: false, err};
    }
  }

  @post('/send-verification', {
    responses: {
      '200': {
        description: 'send verif',
      },
    },
  })
  async verif(
    @requestBody(Verif)
    verif: {
      CODE: string;
    },
  ): Promise<Object> {
    try {

      const crendential = await this.userCredentialRepository.findOne({
        where: {
          code_verif: verif.CODE,
        }
      });

      if (crendential) {
        const user = await this.userRepository.findOne({
          where: {
            number: crendential.number
          }
        });

        if (user) {
          user.is_login = true
          const update = await this.userRepository.update(user);
          return {success: true, user: update};
        } else {
          return {success: false, message: "User not found!"};
        }
      } else {
        return {success: false, message: "Code not valid!"};
      }

    } catch (err) {
      return {success: false, err};
    }
  }

  @post('/logout', {
    responses: {
      '200': {
        description: 'logout',
      },
    },
  })
  async logout(
    @requestBody(LOGOUT)
    create: {
      NUMBER: string;
    },
  ): Promise<Object> {
    try {

      const user = await this.userRepository.findOne({
        where: {
          number: create.NUMBER,
        }
      });

      if (user) {
        const crendential = await this.userCredentialRepository.findOne({
          where: {
            number: create.NUMBER,
          }
        });
        user.is_login = false;
        if (crendential) {
          crendential.code_verif = "";
          await this.userCredentialRepository.update(crendential);
        }
        const update = await this.userRepository.update(user);
        return {success: true, user: update};
      } else {
        return {success: false, message: "User not found!"};
      }

    } catch (err) {
      return {success: false, err};
    }
  }

}


