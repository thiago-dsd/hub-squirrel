import { AuditCamelCase } from "../../commons/entity/audit.entity";

export interface Token extends AuditCamelCase {
    token?: string;
    refreshToken?: string;
}
