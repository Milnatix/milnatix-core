import { SessionPortOut } from "@/ports/out/session-client.port";
import { AuthSignInResponseDTO } from "@milnatix-core/dtos";
import { cookies } from "next/headers";

export class UniversalSessionAdapter implements SessionPortOut {
  private apiPath = "/api/session";

  private isServer(): boolean {
    return typeof window === "undefined";
  }

  public async getSession(): Promise<AuthSignInResponseDTO> {
    if (this.isServer()) {
      const cookieStore = await cookies();
      const cookie = cookieStore.get("session")?.value;
      if (!cookie) throw new Error("Sessão não encontrada no server");

      return JSON.parse(atob(cookie)); // ou sua função de decrypt
    } else {
      const res = await fetch(this.apiPath, { credentials: "include" });
      if (!res.ok) throw new Error("Não foi possível obter a sessão");
      return res.json();
    }
  }

  public async setSession(session: AuthSignInResponseDTO) {
    if (this.isServer()) {
      const cookieStore = await cookies();
      const encoded = btoa(JSON.stringify(session)); // ou encrypt
      cookieStore.set({
        name: "session",
        value: encoded,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    } else {
      // Client Side
      await fetch(this.apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(session),
      });
    }
  }
}
