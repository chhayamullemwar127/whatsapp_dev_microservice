export interface WhatsappCallbackInterface {
  wamid: string;

  user_id: string;

  campaignid: string;

  flow_id: string;

  wabanumber: string;

  contactnumber: string;

  createdAt: Date;

  sent?: Date;

  sent_payload?: JSON;

  delivered?: Date;

  delivered_payload?: JSON;

  read?: Date;

  read_payload?: JSON;

  failed?: Date;

  failed_payload?: JSON;

  obj_status: string;

  [key: string]: any; // to handle dynamic fields in the payload
}
