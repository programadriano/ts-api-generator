import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import DataBase from './config/db';
import * as cors from "cors";
import uploads from "./config/upload";

<% if(chooseJWT == "yes") { %>
 import Auth from './config/auth';
 <%}%>

//Route
import UserRoute from './routes/userRoute';
class App {
  public app: express.Application;
  private morgan: morgan.Morgan;
  private bodyParser;
  private database: DataBase;

  constructor() {
    this.app = express();
    this.enableCors();
    this.middleware();
    this.database = new DataBase();
    this.dataBaseConnection();
    this.routes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: '*',
      preflightContinue: false
    };

    this.app.use(cors(options));
  }

  dataBaseConnection() {
    this.database.createConnection();
  }

  closedataBaseConnection(message, callback) {
    this.database.closeConnection(message, () => callback());
  }

  middleware() {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {

    this.app.route("/").get((req, res) => {
      res.send({ 'result': 'version 0.0.2' })
    });

    <% if(chooseJWT == "yes") { %>
    this.app.use(Auth.validate);
     <% } %>
    this.app.route("/api/v1/users").get(UserRoute.getAll);


  }
}

export default new App();
