export interface TextData {
    body: string;
    preview_url: boolean;
}

export interface SenderData {
    messaging_product: string;
    to: string;
    type: string;
    text: TextData;
}

export interface SendModel {
    campaign_id: string;
    sender_data: SenderData;
}
