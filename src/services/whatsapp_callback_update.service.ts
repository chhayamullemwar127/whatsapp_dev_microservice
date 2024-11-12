import { Service } from 'typedi';
import { WhatsappCallbackModel } from '@models/whatsapp_callback.model';
import { WhatsappCallbackInterface } from '@/interfaces/whatsapp_callback.interface';

@Service()
export class WhatsappCallbackUpdateService {
  public async updateWhatsappCallbackPayload(payload: any): Promise<WhatsappCallbackInterface | null> {
    const timestamp = payload?.entry[0]?.changes[0]?.value?.statuses[0]?.timestamp;
    const wamid = payload?.entry[0]?.changes[0]?.value?.statuses[0]?.id;
    const obj_status = payload?.entry[0]?.changes[0]?.value?.statuses[0]?.status;

    const existingPayload = await WhatsappCallbackModel.findOne({ wamid });

    if (existingPayload) {
      // Update fields based on obj_status/status
      switch (obj_status) {
        case 'delivered':
          existingPayload.delivered = timestamp;
          existingPayload.delivered_payload = payload;
          break;
        case 'read':
          existingPayload.read = timestamp;
          existingPayload.read_payload = payload;
          break;
        case 'failed':
          existingPayload.failed = timestamp;
          existingPayload.failed_payload = payload;
          break;
      }
      return await existingPayload.save();
    } else {
      const biz_opaque_callback_data = JSON.parse(payload?.entry[0]?.changes[0]?.value?.statuses[0]?.biz_opaque_callback_data);
      const campaignid = biz_opaque_callback_data?.campaignid;
      const flow_id = biz_opaque_callback_data?.flow_id;
      const user_id = biz_opaque_callback_data?.userid;

      const newPayloadData: any = {
        user_id,
        wamid,
        campaignid,
        flow_id,
        wabanumber: payload?.entry[0]?.changes[0]?.value?.metadata?.display_phone_number || '',
        contactnumber: payload?.entry[0]?.changes[0]?.value?.statuses[0]?.recipient_id || '',
      };

      if (obj_status === 'delivered') {
        newPayloadData.delivered = timestamp;
        newPayloadData.delivered_payload = payload;
      } else if (obj_status === 'read') {
        newPayloadData.read = timestamp;
        newPayloadData.read_payload = payload;
      } else if (obj_status === 'failed') {
        newPayloadData.failed = timestamp;
        newPayloadData.failed_payload = payload;
      }

      const newEntry = new WhatsappCallbackModel(newPayloadData);
      return await newEntry.save();
    }
  }
}
