export interface Text {
    preview_url: boolean;
    body: string;
  }
  
  export interface ProductData {
    timestamp: string;
    type: string;
    text: Text;
    id: string;
    from: string;
  }

  export interface ProductDetails {
    phone_number: string;
    wa_id: string;
  }

  export interface Contact {
    name: string;
    id: string;
    created_at: string;
    updated_at: string;
  }


export interface From {
  product_details: ProductDetails;
  contact_id: string;
  messaging_product_id: string;
  contact: Contact;
  id: string;
  created_at: string;
  updated_at: string;
}


export interface Conversation {
  sender_data: any;  // Pode ser ajustado se os dados do remetente estiverem disponíveis
  product_data: ProductData | null;
  from_id: string;
  to_id: string;
  messaging_product_id: string;
  from: From;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}


