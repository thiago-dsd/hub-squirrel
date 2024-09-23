import { TemplateComponentType } from "../../template/model/template-component-type.model";
import { ButtonSubtype } from "./button-subtype.model";
import { UseMedia } from "./media-data.model";

export interface UseTemplateComponent {
    type: TemplateComponentType;
    parameters: ComponentParameters[];
    sub_type?: ButtonSubtype;
}

export interface ComponentParameters {
    type: ParameterType;
    text?: string;

    image?: UseMedia;
    video?: UseMedia;
    audio?: UseMedia;
    document?: UseMedia;
    sticker?: UseMedia;
    date_time?: {
        fallback_value: string;
    };
    currency?: {
        fallback_value: string;
        code: string;
        amount_1000: number;
    };
    button?: {
        payload?: string;
        text?: string;
    };
}

export enum ParameterType {
    text = "text",
    currency = "currency",
    date_time = "date_time",
    image = "image",
    video = "video",
    sticker = "sticker",
    document = "document",
    button = "button",
    payload = "payload",
}
