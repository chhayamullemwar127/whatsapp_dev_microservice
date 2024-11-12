export interface WhatsappCallbackReportInterface {
  wamid: string;

  user_id: string;

  campaignid: string;

  flow_id: string;

  wabanumber: string;

  contactnumber: string;

  createdAt: Date;

  sent?: Date;

  delivered?: Date;

  read?: Date;

  failed?: Date;

  failed_payload?: JSON;

  [key: string]: any; // to handle dynamic fields in the payload
}
