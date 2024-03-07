declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: Number;
  }
}

type Orders = {
  status: boolean;
};
