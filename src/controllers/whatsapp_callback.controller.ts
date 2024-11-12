import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import { AddWhatsappCallbackService } from '@/services/whatsapp_callback_add.service';
import { WhatsappCallbackUpdateService } from '@/services/whatsapp_callback_update.service';

export class WhatsAppCallbackController {
  public addWhatsappCallbackService = Container.get(AddWhatsappCallbackService);
  public updateWhatsappCallbackService = Container.get(WhatsappCallbackUpdateService);

  public whatsapp_callback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const waba_number = req.params.waba_number;
      const body_payload = req.body;
      if (!body_payload || Object.keys(body_payload).length === 0) throw new HttpException(409, `Body payload is required`);
      const display_phone_number = body_payload?.entry[0]?.changes[0]?.value?.metadata?.display_phone_number || '';

      if (display_phone_number === waba_number) {
        const obj_status = body_payload?.entry[0]?.changes[0]?.value?.statuses[0]?.status;

        if (obj_status === 'sent') {
          const addData = await this.addWhatsappCallbackService.addWhatsappCallbackPayload(body_payload);
          res.status(200).json({ data: addData, message: 'whatsapp_callback' });
        } else if (obj_status === 'delivered' || obj_status === 'read' || obj_status === 'failed') {
          const addData = await this.updateWhatsappCallbackService.updateWhatsappCallbackPayload(body_payload);
          res.status(200).json({ data: addData, message: 'whatsapp_callback' });
        }
      } else {
        res.status(200).json({ data: [], message: 'whatsapp_callback' });
      }
    } catch (error) {
      next(error);
    }
  };
}
