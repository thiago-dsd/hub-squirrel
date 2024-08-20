export interface Id {
    id: string;
}

export interface AuditDateAndVersion {
    created_at: Date;

    updated_at: Date;

    version: number;
}

export interface Audit extends AuditDateAndVersion {
    id: string;
}

export interface AuditCamelCase {
    createdAt: Date;

    updatedAt: Date;

    version: number;
}
