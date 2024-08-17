import { AuditCamelCase } from "../../commons/entity/audit.entity";

export interface Policy extends AuditCamelCase {
  id: string;
  name: string;
}
