import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import GuardiansController from '@/controllers/guardians.controller';
import { CreateGuardianDto } from '@/dtos/guardians.dto';

class GuardiansRoute implements Routes {
  public path = '/guardians';
  public router = Router();
  public guardiansController = new GuardiansController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}`, this.guardiansController.getUsers);
    this.router.post(`${this.path}/:safeAddress/:chainId/signTransaction`, this.guardiansController.getGuardianSignature);
    this.router.get(`${this.path}/:safeAddress/:chainId`, this.guardiansController.getGuardianBySafeAddress);
    this.router.post(`${this.path}`, validationMiddleware(CreateGuardianDto, 'body'), this.guardiansController.createGuardian);
    // this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.guardiansController.updateUser);
    // this.router.delete(`${this.path}/:id`, this.guardiansController.deleteUser);
  }
}

export default GuardiansRoute;
