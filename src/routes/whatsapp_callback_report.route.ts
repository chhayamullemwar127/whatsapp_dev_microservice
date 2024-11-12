import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ReportWhatsAppCallbackController } from '@/controllers/whatsapp_callback_report.controller';

export class WhatsAppCallbackReportRoute implements Routes {
  public path = '/whatsapp_callback_report';
  public router = Router();
  public whatsAppCallbackReport = new ReportWhatsAppCallbackController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/whatsapp_callback_report`, this.whatsAppCallbackReport.whatsapp_callback_report);
  }
}
