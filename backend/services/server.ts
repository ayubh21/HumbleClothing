import express, { Express } from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import productRoute from "../routes/products";
import categoryRoute from "../routes/category";
const app: Express = express();
dotenv.config();

const port = process.env.PORT;
app.use(express.json());
const log = console.log;

log(chalk.gray("██╗  ██╗██╗   ██╗███╗   ███╗██████╗ ██╗     ███████╗"));
log(chalk.gray("██║  ██║██║   ██║████╗ ████║██╔══██╗██║     ██╔════╝"));
log(chalk.gray("███████║██║   ██║██╔████╔██║██████╔╝██║     █████╗  "));
log(chalk.gray("██╔══██║██║   ██║██║╚██╔╝██║██╔══██╗██║     ██╔══╝  "));
log(chalk.gray("██║  ██║╚██████╔╝██║ ╚═╝ ██║██████╔╝███████╗███████╗"));
log(chalk.gray("╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚══════╝╚══════╝"));
log(chalk.gray("                                                     "));

app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.listen(port, () => console.log(`server is listening on ${port}`));
