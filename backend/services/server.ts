import express, { Express } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getOneProduct,
} from "../controllers/products";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategorybyId,
  updateCategory,
} from "../controllers/category";
import chalk from "chalk";
import dotenv from "dotenv";
import { check } from "express-validator";
const app: Express = express();
dotenv.config();

const log = console.log;

const port = process.env.PORT;
app.use(express.json());
app.get("/products", getAllProducts);
app.get("/products/:id", getOneProduct);
app.delete("/products/:id", deleteProduct);
app.get("/categories", getAllCategories);
app.get("/categories/:id", getCategorybyId);
app.post("/categories", createCategory);
app.delete("/categories/:id", deleteCategory);

app.put("/categories/:id", updateCategory);
app.post(
  "/products",
  [
    check("productDescription")
      .isLength({ min: 20 })
      .withMessage("description must be at least 20 chars long"),
    check("sku")
      .isLength({ min: 20 })
      .withMessage("sku must be atleast 20 chars long"),
    check("price").custom((value: number) => {
      if (value > 0) {
        throw new Error("price cannot be negative");
      }
    }),
  ],

  createProduct,
);

app.put("/products/:id", editProduct);
app.listen(port, () => console.log(`server is listening on ${port}`));
log(chalk.bold.blue("    ,--,"));
log(
  chalk.bold.blue(
    "   ,--.'|                       ____              ,--,               ,----..    ,--,                ___      ,---,",
  ),
);
log(
  chalk.bold.blue(
    "      ,--.'|                       ____              ,--,               ,----..    ,--,                ___      ,---,",
  ),
);
log(
  chalk.bold.blue(
    "   ,--,  | :                     ,'  , `.  ,---,   ,--.'|              /   /   \\ ,--.'|              ,--.'|_  ,--.' |      ,--,",
  ),
);
log(
  chalk.bold.blue(
    " ,--,  | :                     ,'  , `.  ,---,   ,--.'|              /   /   \\ ,--.'|              ,--.'|_  ,--.' |      ,--,",
  ),
);
log(
  chalk.bold.blue(
    ",---.'|  : '         ,--,     ,-+-,.' _ |,---.'|   |  | :             |   :     :|  | :     ,---.    |  | :,' |  |  :    ,--.'|         ,---,",
  ),
);
log(
  chalk.bold.blue(
    "|   | : _' |       ,'_ /|  ,-+-. ;   , |||   | :   :  : '             .   |  ;. /:  : '    '   ,'\\   :  : ' : :  :  :    |  |,      ,-+-. /  |  ,----._,.",
  ),
);
log(
  chalk.bold.blue(
    ":   : |.'  |  .--. |  | : ,--.'|'   |  ||:   : :   |  ' |      ,---.  .   ; /--` |  ' |   /   /   |.;__,'  /  :  |  |,--.`--'_     ,--.'|'   | /   /  ' /",
  ),
);
log(
  chalk.bold.blue(
    "|   ' '  ; :,'_ /| :  . ||   |  ,', |  |,:     |,-.'  | |     /     \\ ;   | ;    '  | |  .   ; ,. :|  |   |   |  :  '   |,' ,'|   |   |  ,\"' ||   :     |",
  ),
);
log(
  chalk.bold.blue(
    "'   |  .'. ||  ' | |  . .|   | /  | |--' |   : '  ||  | :    /    /  ||   : |    |  | :  '   | |: ::__,'| :   |  |   /' :'  | |   |   | /  | ||   | .\\  .",
  ),
);
log(
  chalk.bold.blue(
    "|   | :  | '|  | ' |  | ||   : |  | ,    |   |  / :'  : |__ .    ' / |.   | '___ '  : |__'   | .; :  '  : |__ '  :  | | ||  | :   |   | |  | ||   | ;\\  |",
  ),
);
log(
  chalk.bold.blue(
    "'   : |  : ;:  | : ;  ; ||   : |  |/     '   : |: ||  | '.'|'   ;   /|'   ; : .'||  | '.'|   :    |  |  | '.'||  |  ' | :'  : |__ |   | |--'   `---`-'|",
  ),
);
log(chalk.bold.blue("|   | '  ,/ '  :  `--'   \\   | |`-'    "));
