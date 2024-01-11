export class HelperConfig {
  constructor() {
  }

  static onRandomChar = (countChar: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789#@!*';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < countChar) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  static onRandomNumber = (countChar: number) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < countChar) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  static onGetDateNow = () => {
    const d = new Date();
    const Days = "00".substring((d.getDate()).toString().length) + (d.getDate());
    const Mount = "00".substring((d.getMonth() + 1).toString().length) + (d.getMonth() + 1);
    const Years = d.getFullYear();
    return Years + "-" + Mount + "-" + Days;
  }

  static onGetDateTimeNow = () => {
    const d = new Date();
    const Days = "00".substring((d.getDate()).toString().length) + (d.getDate());
    const Mount = "00".substring((d.getMonth() + 1).toString().length) + (d.getMonth() + 1);
    const Years = d.getFullYear();
    const Hours = "00".substring((d.getHours()).toString().length) + (d.getHours());
    const Minutes = "00".substring((d.getMinutes()).toString().length) + (d.getMinutes());
    const Second = "00".substring((d.getSeconds()).toString().length) + (d.getSeconds());
    return Years + "-" + Mount + "-" + Days + " " + Hours + ":" + Minutes + ":" + Second;
  }
}
