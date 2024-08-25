
export interface TextData {
    preview_url: boolean;
    body: string;
  }
  

  export interface SenderData {
    recipient_type: string;
    messaging_product: string;
    to: string;
    type: string;
    text?: TextData;
  }
  

  export interface Message {
    sender_data: SenderData;
    product_data: any; 
    from_id: string;
    to_id: string;
    messaging_product_id: string;
    id: string;
    created_at: string; 
    updated_at: string;
    deleted_at: string;
  }
  