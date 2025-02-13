/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ListResponse = {
  message?: Array<{
    name?: string;
    creation?: string;
    modified?: string;
    modified_by?: string;
    owner?: string;
    docstatus?: number;
    idx?: number;
    sender?: string;
    origin_area?: Record<string, any> | null;
    origin_city?: string;
    sender_phone?: Record<string, any> | null;
    sender_name?: string | null;
    origin_country?: string;
    sender_address?: Record<string, any> | null;
    origin_address_line2?: Record<string, any> | null;
    origin_state?: string;
    consignee?: string;
    destination_area?: Record<string, any> | null;
    destination_city?: string;
    consignee_phone?: Record<string, any> | null;
    consignee_name?: Record<string, any> | null;
    destination_address_line_1?: Record<string, any> | null;
    destination_country?: string;
    consignee_address?: Record<string, any> | null;
    destination_address_line_2?: Record<string, any> | null;
    destination_state?: string;
    origin_zone?: string;
    destination_zone?: string;
    service?: Record<string, any> | null;
    total_weight?: number;
    status?: string;
    movable_units?: Record<string, any> | null;
    amended_from?: Record<string, any> | null;
    company?: string;
    cod?: number;
    total_cod?: number;
    barcode?: string;
    branch?: Record<string, any> | null;
    currency?: string;
    pieces?: number;
    not_available?: number;
    percentage?: number;
    total_fees?: number;
    awb_terms_template?: Record<string, any> | null;
    awb_terms_and_conditions?: Record<string, any> | null;
    sales_invoice_created?: number;
    _user_tags?: Record<string, any> | null;
    _comments?: Record<string, any> | null;
    _assign?: Record<string, any> | null;
    _liked_by?: Record<string, any> | null;
    geolocation_evkp?: Record<string, any> | null;
    shipping_service?: string;
    delivery_time?: Record<string, any> | null;
    from_client_side?: number;
    destination_branch?: Record<string, any> | null;
    origin_branch?: Record<string, any> | null;
    delivery_due_date?: Record<string, any> | null;
    company_currency?: string;
    exchange_rate?: number;
    overdue?: number;
    posting_date?: string;
    posting_time?: string;
    is_returned?: number;
    custodian?: Record<string, any> | null;
    assignee?: Record<string, any> | null;
    closed?: number;
    custodian_commission?: number;
    awb_date?: string;
    type?: Record<string, any> | null;
    origin_address_line_1?: Record<string, any> | null;
    service_type?: Record<string, any> | null;
    adjusted_cod?: number;
  }>;
};

