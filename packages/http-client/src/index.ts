import { AxiosHttpClient } from "./adapters/AxiosHttpClient.adapter";

const apiClient = new AxiosHttpClient('http://localhost:3000/api');

export { apiClient };