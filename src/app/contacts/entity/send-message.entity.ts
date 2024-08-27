export interface TextData {
    body: string;
    preview_url: boolean;
  }
  
  export interface SenderData {
    messaging_product: string; // "whatsapp"
    text: TextData;
    to: string;  // O número de telefone do destinatário no formato internacional, por exemplo, "5591984288778"
    type: string;  // Tipo de mensagem, geralmente "text"
  }
  
  export interface SendMessage {
    sender_data: SenderData;
    to_id: string;  // O ID do destinatário na sua base de dados
  }
  