import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsycn = promisify(scrypt);

export class Password {

  static async toHash(password: string){
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsycn(password, salt, 64)) as Buffer;

    return `${ buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string){
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsycn(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }

}