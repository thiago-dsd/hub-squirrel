// Interface para a estrutura do texto dentro de sender_data
export interface TextData {
  preview_url: boolean;
  body: string;
}

// Interface para a estrutura sender_data
export interface SenderData {
  recipient_type: string;  // e.g., 'individual'
  messaging_product: string; // e.g., 'whatsapp'
  to: string;             // e.g., '554891919869'
  type: string;           // e.g., 'text'
  text: TextData;         // Texto da mensagem
}

// Interface para a estrutura product_details
export interface ProductDetails {
  phone_number: string;  // e.g., '554891919869'
  wa_id: string;         // e.g., '554891919869'
}

// Interface para a estrutura contact
export interface Contact {
  name: string;          // e.g., 'Thiago Dias'
  id: string;            // e.g., '9e865d02-d449-4121-8bc5-299d89c19230'
  created_at: string;   // Data de criação
  updated_at: string;   // Data de atualização
}

// Interface para a estrutura to
export interface To {
  product_details: ProductDetails; // Detalhes do produto
  contact_id: string;              // e.g., '9e865d02-d449-4121-8bc5-299d89c19230'
  messaging_product_id: string;    // e.g., 'e5653550-450b-4dc9-8c35-33132e415fa3'
  contact: Contact;                // Informações do contato
  id: string;                      // e.g., '0174c9ec-c97a-4031-b6b6-766b5c887b4a'
  created_at: string;             // Data de criação
  updated_at: string;             // Data de atualização
}

// Interface para a estrutura completa da Conversation
export interface Conversation {
  sender_data: SenderData;  // Dados do remetente
  product_data: any;         // Dados do produto, pode ser null
  from_id: string;          // e.g., '00000000-0000-0000-0000-000000000000'
  to_id: string;            // e.g., '0174c9ec-c97a-4031-b6b6-766b5c887b4a'
  messaging_product_id: string;  // e.g., 'e5653550-450b-4dc9-8c35-33132e415fa3'
  to: To;                  // Dados do destinatário
  id: string;              // e.g., '9b042996-2e49-4c8d-97e3-8413b1a3c9f7'
  created_at: string;     // Data de criação
  updated_at: string;     // Data de atualização
  deleted_at: string;     // Data de exclusão
}
