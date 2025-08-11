import axios, { AxiosInstance } from 'axios';
import { HttpClientPort, HttpRequest, HttpResponse } from '../ports/HttpClient.port';

export class AxiosHttpClient implements HttpClientPort {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
  }

  private normalizeAxiosHeaders(
  headers: Record<string, string | string[] | number | null | undefined>
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key in headers) {
    const value = headers[key];

    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      result[key] = value.join(', ');
    } else {
      result[key] = String(value);
    }
  }

  return result;
}


  public async request<T>(req: HttpRequest): Promise<HttpResponse<T>> {
    const response = await this.axiosInstance.request<T>({
      method: req.method,
      url: req.url,
      headers: req.headers,
      data: req.body,
      params: req.params,
    });

    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  }
}
