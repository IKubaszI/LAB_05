import Index from './index';
import IndexController from "./controllers/index.controller";
import DataController from "./controllers/data.controller";
import UserController from "./controllers/user.controller";

const app: Index = new Index([
    new UserController(),
    new DataController(),
    new IndexController()
]);

app.listen();
