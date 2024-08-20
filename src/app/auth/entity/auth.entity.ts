import { AuditCamelCase } from "../../commons/entity/audit.entity";

export interface User extends AuditCamelCase {
    id: string;
    name: string;
    password?: string;
    salt?: string;
    daily_goal: number;
    email?: string;
    photoPath?: string;
    nickname?: string;
    birthday?: Date;
    institutionName?: string;
    profession?: string;
    address?: string;
    city?: string;
    cep?: string;
    complement?: string;
    houseNumber?: string;
    phone?: string;
    state?: string;
    country?: string;
    neighborhood?: string;
    street?: string;
    point?: string;
    urlFacebook?: string;
    urlInstagram?: string;
    uid?: string;
    inviteKey: string;
    invitedByUserId?: string;
    invitedBy?: User;
    first_access: boolean;
    facebookId?: string;
    googleSub?: string;
    cpf?: string;
    deleted: boolean;
    deletedAt: Date;

}
