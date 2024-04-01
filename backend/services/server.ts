import express, { Express, Response, Request } from "express";
import { createProduct, getAllProducts } from "../controllers/products";
import dotenv from "dotenv";

const app: Express = express();
dotenv.config();
// setting up express server
//
// app.get("/", (req: Request, res: Response) => {
//   res.send("server is running");
// });

const port = process.env.PORT;
app.use(express.json());
app.get("/products", getAllProducts);
app.post("/products", createProduct);

app.listen(port, () => console.log(`server is listening on ${port}`));
