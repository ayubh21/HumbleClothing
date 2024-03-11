import express, { Express, Response, Request } from "express";
const app: Express = express();
// setting up express server

app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});

const port = process.env.PORT || 3000;

app.listen(console.log(`server is listening on ${port}`));
