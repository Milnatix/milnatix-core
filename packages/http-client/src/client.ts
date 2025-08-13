import { HttpClientPort } from "./ports/http-client.port";

export class HTTPClientProvider {
  constructor(private readonly httpClient: HttpClientPort) { }

  getHttpClient() {
    return this.httpClient;
  }
}