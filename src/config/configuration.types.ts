export interface DBConfig {
  uri: string;
}

export interface JwtConfig {
  accessSecret: string;
  accessExpiration: number;
  refreshSecret: string;
  refreshExpiration: number;
}
