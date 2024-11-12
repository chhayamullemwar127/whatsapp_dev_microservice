import { Service } from 'typedi';
import { WhatsappCallbackModel } from '@models/whatsapp_callback.model';
import { WhatsappCallbackInterface } from '@/interfaces/whatsapp_callback.interface';

@Service()
export class AddWhatsappCallbackService {
  public async addWhatsappCallbackPayload(payload: any): Promise<WhatsappCallbackInterface | null> {
    const timestamp = payload?.entry[0]?.changes[0]?.value?.statuses[0]?.timestamp;
    const wamid = payload?.entry[0]?.changes[0]?.value?.statuses[0]?.id;
    const biz_opaque_callback_data = JSON.parse(payload?.entry[0]?.changes[0]?.value?.statuses[0]?.biz_opaque_callback_data);
    const campaignid = biz_opaque_callback_data?.campaignid;
    const flow_id = biz_opaque_callback_data?.flow_id;
    const user_id = biz_opaque_callback_data?.userid;

    const newEntry = new WhatsappCallbackModel({
      user_id,
      wamid,
      campaignid,
      flow_id,
      wabanumber: payload?.entry[0]?.changes[0]?.value?.metadata?.display_phone_number || '',
      contactnumber: payload?.entry[0]?.changes[0]?.value?.statuses[0]?.recipient_id || '',
      sent: timestamp,
      sent_payload: payload,
    });

    return await newEntry.save();
  }
}
