import axios, { AxiosInstance, isAxiosError } from 'axios';
import { HttpClientPort, HttpRequest, HttpResponse } from '../ports/http-client.port';
import { ErrorResponse } from '../types/error-response.type';
import { ApiException } from '../errors/api-exception';

export class AxiosHttpClient implements HttpClientPort {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL, withCredentials: true });
  }

  public async request<T>(req: HttpRequest): Promise<HttpResponse<T>> {
    try {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as ErrorResponse;
        throw new ApiException(
          error.response?.status ?? 500,
          errorData?.message
        );
      }

      throw error;
    }
  }
}

