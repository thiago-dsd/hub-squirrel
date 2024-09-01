import { AuditCamelCase } from "../../commons/entity/audit.entity";

export interface MessagingProduct extends AuditCamelCase {
    id?: string;
    name?: string;
    created_at?: string;
    updated_at?: string;
}
