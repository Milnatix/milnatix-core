import { AxiosHttpClient } from "./adapters/axios-http-client.adapter";

const apiClient = new AxiosHttpClient('http://localhost:3000/api');

export { apiClient };

export * from './types/status-code.type'
export * from './errors/api-exception'