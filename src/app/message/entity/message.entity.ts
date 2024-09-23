import { Audit } from "../../common/model/audit.model";
import { MessagingProductContact } from "../../messaging-product/entity/messaging-product-contact.entity";
import { MessagingProduct } from "../../messaging-product/entity/messaging-product.entity";
import { ReceiverData } from "../model/receiver-data.model";
import { SenderData } from "../model/sender-data.model";

export interface MessageFields extends Audit {
    sender_data?: SenderData;
    receiver_data?: ReceiverData;
    from_id: string;
    to_id: string;
    messaging_product_id: string;
}

export interface Message extends MessageFields {
    from: MessagingProductContact;
    to: MessagingProductContact;
    messaging_product: MessagingProduct;
}
