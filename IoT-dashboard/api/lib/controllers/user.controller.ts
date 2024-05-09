import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import {auth} from '../middlewares/auth.middleware';
import {admin} from '../middlewares/admin.middleware';
import UserService from "../modules/services/user.service";
import PasswordService from "../modules/services/password.service";
import TokenService from "../modules/services/token.service";

class UserController implements Controller {
    public path = '/api/user';
    public router = Router();
    private userService = new UserService();
    private passwordService = new PasswordService();
    private tokenService = new TokenService();

    constructor() {
        this.initializeRoutes();
        this.checkUserToken();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createNewOrUpdate);
        this.router.post(`${this.path}/auth`, this.authenticate);
        this.router.delete(`${this.path}/logout/:userId`, auth,  this.removeHashSession);

        this.router.post(`${this.path}/reset`, this.resetUserPassword);


    }

    private authenticate = async (request: Request, response: Response, next: NextFunction) => {
        const {login, password} = request.body;

        try {
            const user = await this.userService.getByEmailOrName(login);
            if (!user) {
                response.status(401).json({error: 'Unauthorized'});
            }
            await this.passwordService.authorize(user.id, await this.passwordService.hashPassword(password));
            const token = await this.tokenService.create(user);
            response.status(200).json(this.tokenService.getToken(token));
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };


    private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
        const userData = request.body;
        console.log(request.body);
        try {
            const user = await this.userService.createNewOrUpdate(userData);
            if (userData.password) {
                const hashedPassword = await this.passwordService.hashPassword(userData.password)
                await this.passwordService.createOrUpdate({
                    userId: user._id,
                    password: hashedPassword
                });
            }
            response.status(200).json(user);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Bad request', value: error.message});
        }

    };

    private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
        const {userId} = request.params

        try {
            const result = await this.tokenService.remove(userId);
            response.status(200).send(result);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };

    private resetUserPassword = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { email } = request.body;
            const user = await this.userService.getByEmailOrName(email);

            if(!user) {
                response.status(404).json({error: 'User not found'});
            }

            const newUserPassword = this.getRandomPassword();
            const hashPassword = await this.passwordService.hashPassword(newUserPassword);
            await this.passwordService.createOrUpdate({userId: user._id, password: hashPassword});


            response.status(200).json(newUserPassword);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(500).json({error: 'Server Error!', value: error.message});
        }
    };

    private getRandomPassword(): string {
        return Math.random().toString(36).slice(-8);
    }

    private checkUserToken() {
        setInterval(async () => {
            await this.tokenService.removeExpiredToken();
        }, 60 * 60 * 1000);
    }

}

export default UserController;
