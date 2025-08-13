import { ErrorResponse } from "../types/error-response.type";
import { HttpStatusCode } from "../types/status-code.type";

export interface HttpRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
}

export interface HttpResponse<T = any> {
  status: HttpStatusCode;
  data: T;
  headers: Record<string, any>;
}

export interface HttpClientPort {
  request<T = any>(req: HttpRequest): Promise<HttpResponse<T>>;
}

