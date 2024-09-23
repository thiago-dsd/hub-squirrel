import { ReceivedInteractive } from "./interactive.model";
import { LocationData } from "./location-data.model";
import { UseMedia } from "./media-data.model";
import { MessageType } from "./message-type.model";
import { ReactionData } from "./reaction-data.model";
import { TextData } from "./text-data.model";
import { UseTemplate } from "./use-template.model";

export interface ReceiverData {
    type: MessageType;
    text?: TextData;

    image?: UseMedia;
    video?: UseMedia;
    audio?: UseMedia;
    document?: UseMedia;
    sticker?: UseMedia;

    reaction?: ReactionData;

    interactive?: ReceivedInteractive;
    template?: UseTemplate;
    location?: LocationData;

    [key: string]: any;
}
