import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import { whatsappCallbackReportNewService } from '@/services/whatsapp_callback_report.service';

export class ReportWhatsAppCallbackController {
  public whatsAppCallBackReportService = Container.get(whatsappCallbackReportNewService);

  public whatsapp_callback_report = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.body;
      const result = await this.whatsAppCallBackReportService.fetchCallbackReport(user_id);

      res.status(200).json({ data: result, message: 'Report WhatsApp Callback' });
    } catch (error) {
      next(error);
    }
  };
}
