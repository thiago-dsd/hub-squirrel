export interface TextData {
    preview_url: boolean;
    body: string;
}

export interface SenderData {
    recipient_type: string;
    messaging_product: string;
    to: string;
    type: string;
    text: TextData;
}

export interface Model {
    sender_data: SenderData;
    message_id: string;
    campaign_id: string;
    id: string;
    created_at: string;
    updated_at: string;
}
