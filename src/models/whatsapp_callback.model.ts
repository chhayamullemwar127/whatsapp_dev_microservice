import { model, Schema, Document } from 'mongoose';
import { WhatsappCallbackInterface } from '@interfaces/whatsapp_callback.interface';

const WhatsappCallbackSchema: Schema = new Schema({
  wamid: { type: String, required: true },
  user_id: { type: String, required: true },
  campaignid: { type: String, required: true },
  flow_id: { type: String, required: true },
  wabanumber: { type: String, required: true },
  contactnumber: { type: String, required: true },
  sent: { type: String },
  sent_payload: { type: JSON },
  delivered: { type: String },
  delivered_payload: { type: JSON },
  read: { type: String },
  read_payload: { type: JSON },
  failed: { type: String },
  failed_payload: { type: JSON },
});

export const WhatsappCallbackModel = model<WhatsappCallbackInterface & Document>('whatsapp_callback', WhatsappCallbackSchema);
