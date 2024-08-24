/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Filters } from '../models/Filters';
import type { ListResponse } from '../models/ListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
  /**
   * Login
   * @param requestBody
   * @returns any Successful response
   * @throws ApiError
   */
  public static postApiMethodLogin(
    requestBody?: {
      usr?: string;
      pwd?: string;
    },
  ): CancelablePromise<{
    message?: string;
    home_page?: string;
    full_name?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/method/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Shipment List
   * @param requestBody
   * @returns ListResponse Successful response
   * @throws ApiError
   */
  public static postApiMethodFrappeClientGetList(
    requestBody?: {
      doctype: string;
      fields?: Array<string>;
      filters?: Filters | null;
    },
  ): CancelablePromise<ListResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/method/frappe.client.get_list',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
