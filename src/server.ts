import { App } from '@/app';
// import { AuthRoute } from '@routes/auth.route';
import { WhatsAppCallbackRoute } from '@routes/whatsapp_callback.route';
import { WhatsAppCallbackReportRoute } from '@routes/whatsapp_callback_report.route';

import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new WhatsAppCallbackRoute(), new WhatsAppCallbackReportRoute()]);

app.listen();
