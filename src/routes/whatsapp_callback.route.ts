import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { WhatsAppCallbackController } from '@controllers/whatsapp_callback.controller';

export class WhatsAppCallbackRoute implements Routes {
  public path = '/whatsapp_callback';
  public router = Router();
  public whatsAppCallback = new WhatsAppCallbackController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/user/:user_id/wabanumber/:waba_number`, this.whatsAppCallback.whatsapp_callback);
  }
}
