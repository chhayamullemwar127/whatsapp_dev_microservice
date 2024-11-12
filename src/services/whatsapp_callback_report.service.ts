import { Service } from 'typedi';
import { WhatsappCallbackInterface } from '@/interfaces/whatsapp_callback.interface';
import { WhatsappCallbackModel } from '@/models/whatsapp_callback.model';

@Service()
export class whatsappCallbackReportNewService {
  public async fetchCallbackReport(user_id: string): Promise<WhatsappCallbackInterface | null> {
    try {
      const pipeline = [
        {
          $match: { user_id: user_id },
        },
        {
          $project: {
            sent_payload: 0,
            delivered_payload: 0,
            read_payload: 0,
          },
        },
      ];
      const existingPayload: any = await WhatsappCallbackModel.aggregate(pipeline).exec();
      return existingPayload;
    } catch (error) {
      throw new Error(`Error fetching data for user_id ${user_id}: ${error}`);
    }
  }
}
