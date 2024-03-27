declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
  }
}

type Orders = {
  status: boolean;
};
