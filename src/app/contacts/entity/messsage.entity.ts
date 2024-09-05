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
  
  export interface ProductData {
    timestamp: string;
    type: string;
    text: TextData;
    id: string;
    from: string;
  }
  
  export interface Message {
    sender_data: SenderData | null;
    receiver_data: ProductData | null; // Corrigido para refletir o JSON comentado
    from_id: string;
    to_id: string;
    messaging_product_id: string;
    id: string;
    created_at: string; // Considera usar Date no TypeScript se for manipular datas
    updated_at: string;
    deleted_at: string;
  }
  
  // JSON de exemplo para referência
  // {
  //   "sender_data": null,
  //   "product_data": {
  //       "timestamp": "1724437246",
  //       "type": "text",
  //       "text": {
  //           "preview_url": false,
  //           "body": "thats nice"
  //       },
  //       "id": "wamid.HBgMNTU5MTg0Mjg4Nzc4FQIAEhgWM0VCMERDM0M4QjE3QkRBNUEzRDAwMwA=",
  //       "from": "559184288778"
  //   },
  //   "from_id": "3760e518-c822-4a8a-a83a-a3504168d84a",
  //   "to_id": "00000000-0000-0000-0000-000000000000",
  //   "messaging_product_id": "e5653550-450b-4dc9-8c35-33132e415fa3",
  //   "id": "54c3363e-60dd-42ea-83e1-e4ede32c36c3",
  //   "created_at": "2024-08-23T18:20:55.046746Z",
  //   "updated_at": "2024-08-23T18:20:55.046746Z",
  //   "deleted_at": "0001-01-01T00:00:00Z"
  // }
  