import { resolve } from 'path';

import { config as dotenvConfig } from 'dotenv';


class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor () {
    dotenvConfig({ path: resolve(process.cwd(), '.env') });

    this.envConfig = process.env;
  }

  get (key: string): string {
    return this.envConfig[key];
  }

  getAll (): Record<string, string> {
    return this.envConfig;
  }
}

export default new ConfigService();
