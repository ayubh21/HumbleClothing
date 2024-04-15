declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    SESSION_TOKEN: string;
    DOMAIN: string;
  }
}

type Orders = {
  status: boolean;
};
