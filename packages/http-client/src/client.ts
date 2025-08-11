import { HttpClientPort } from "./ports/HttpClient.port";

export class HTTPClientProvider {
  constructor(private readonly httpClient: HttpClientPort) {}

  getHttpClient() {
    return this.httpClient;
  }
}