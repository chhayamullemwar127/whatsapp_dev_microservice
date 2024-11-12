import { model, Schema, Document } from 'mongoose';
import { WhatsappCallbackReportInterface } from '@interfaces/whatsapp_callback_report.interface';

const WhatsappCallbacReportSchema: Schema = new Schema({
  wamid: { type: String, required: true },
  user_id: { type: String, required: true },
  campaignid: { type: String, required: true },
  flow_id: { type: String, required: true },
  wabanumber: { type: String, required: true },
  contactnumber: { type: String, required: true },
  sent: { type: String },
  delivered: { type: String },
  read: { type: String },
  failed: { type: String },
  failed_payload: { type: JSON },
});

export const WhatsappCallbackReportModel = model<WhatsappCallbackReportInterface & Document>('sent_callback_reports', WhatsappCallbacReportSchema);
