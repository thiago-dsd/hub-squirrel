import { AuditCamelCase } from "../../commons/entity/audit.entity";

export interface ClientCredentials extends AuditCamelCase {
  id: string;
  name: string;
  secret: string;
  accessTokenValidity: number;
  refreshTokenValidity?: number;
}
