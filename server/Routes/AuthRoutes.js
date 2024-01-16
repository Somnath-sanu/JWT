import {Router} from "express"
import { login, register } from "../Controllers/AuthControllers.js";
import { checkUser } from "../Middlewares/AuthMiddleware.js";

const router = Router();

// const app = express();

// app.post("/register" , register)


router.route("/").post(checkUser); //! for  secret page
router.route("/register").post(register);
router.route("/login").post(login);

export default router