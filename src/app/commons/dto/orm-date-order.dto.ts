export enum OrderEnum {
    ASC = 'ASC',
    DESC = 'DESC',
}

export class ORMDateOrder {
    created_at?: OrderEnum;
    updated_at?: OrderEnum;
}

export class ORMDateOrderSpecified {
    created_at_order?: OrderEnum;
    updated_at_order?: OrderEnum;
}

export class ORMDateOrderCamelCaseSpecified {
    createdAt_order?: OrderEnum;
    updatedAt_order?: OrderEnum;
}