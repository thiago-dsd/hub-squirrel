import { OrderEnum } from "../enum/order.enum";
import { PaginatedQuery } from "./paginated-query.dto";


export class ORMPagination {
    skip?: number; // offset
    take?: number; // limit
}

export class ORMPaginationPipe extends ORMPagination {
    constructor({ limit, page }: PaginatedQuery) {
        super();
        this.skip = page && limit ? (page - 1) * limit : undefined;
        this.take = limit ? limit : undefined;
    }
}

export class ORMDateOrder {
    created_at?: OrderEnum = OrderEnum.DESC;
    updated_at?: OrderEnum;
}

export class ORMDateOrderCamelCase {
    createdAt?: OrderEnum = OrderEnum.DESC;
    updatedAt?: OrderEnum;
}