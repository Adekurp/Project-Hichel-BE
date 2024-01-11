import TelegramBot from 'node-telegram-bot-api';
import {ApplicationConfig, HaicelProjectApplication} from './application';
import {HaicelDataSource} from './datasources';
import {HelperConfig} from './helper/helper.config';
import {UserCredentialRepository, UserRepository} from './repositories';
export * from './application';
require('dotenv').config();
const token = process.env.BOT_TELEGRAM_TOKEN ?? '';
const bot = new TelegramBot(token, {polling: true});
var HAI_DB = new HaicelDataSource()

export async function main(options: ApplicationConfig = {}) {
  const app = new HaicelProjectApplication(options);
  await app.boot();
  await app.start();
  botTelegram();
  console.log('VERSION 1.0.0 : Server is running at http://127.0.0.1:' + process.env.PORT + "/" + process.env.API_URL_PATH);
  return app;
}


const botTelegram = () => {

  let credentialRepostory = new UserCredentialRepository(HAI_DB);
  let userRepository = new UserRepository(HAI_DB);

  bot.onText(/\/login/, async (msg) => {
    const chatId = msg.chat.id;

    let credential = await credentialRepostory.findOne({
      where: {
        id_bot_user: chatId.toString()
      }
    });

    if (credential) {
      let user = await userRepository.findOne({
        where: {
          number: credential?.number
        }
      });

      if (user?.is_login) {
        bot.sendMessage(chatId, "Your account already login!");
      } else {
        const generate_code = HelperConfig.onRandomNumber(5);
        credential.code_verif = generate_code;
        await credentialRepostory.update(credential);
        bot.sendMessage(chatId, `YOUR CODE\n${generate_code}`);
      }

    } else {
      bot.sendMessage(chatId, "Your account not registered, please send your contact!");
    }
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    let credential = await credentialRepostory.findOne({
      where: {
        id_bot_user: chatId.toString()
      }
    });

    if (!credential) {

      if (msg.contact) {

        let credential2 = await credentialRepostory.findOne({
          where: {
            number: msg.contact.phone_number
          }
        });

        if (credential2) {

          credential2.id_bot_user = chatId.toString();
          await credentialRepostory.update(credential2);
          bot.sendMessage(chatId, 'Welocome back! your account already registered');
          bot.sendMessage(chatId, "/login - get code verification login");
        } else {

          let user = await userRepository.findOne({
            where: {
              number: msg.contact.phone_number
            }
          })

          if (user) {
            const generate_code = HelperConfig.onRandomNumber(5)
            credentialRepostory.create({
              id_bot_user: chatId.toString(),
              number: msg.contact.phone_number,
              code_verif: generate_code
            })
            bot.sendMessage(chatId, `YOUR CODE\n${generate_code}`);
          } else {
            bot.sendMessage(chatId, "Number not Registered!\nPlease send valid number!");
          }

        }

      } else {
        bot.sendMessage(chatId, "Welcome, Please share your contact to continue verification!");
      }
    } else {
      bot.sendMessage(chatId, "/login - get code verification login");
    }

  });
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      basePath: process.env.API_URL_PATH,
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
