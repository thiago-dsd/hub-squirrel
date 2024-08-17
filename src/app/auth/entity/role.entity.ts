import { AuditCamelCase } from "../../commons/entity/audit.entity";
import { ClientCredentials } from "./client-credentials.entity";
import { Policy } from "./policy.entity";

export interface Role extends AuditCamelCase {
  id: string;

  name: string;

  policies: Policy[];

  clientCredentials: ClientCredentials[];
}
