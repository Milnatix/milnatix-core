// route.ts
import { NextRequest, NextResponse } from "next/server";
import { SessionService } from "@/adapters/cookies/session-service.adapter";
import { JoseCryptAdapter } from "@/adapters/jose/crypt.adapter";
import { JWTTokenAdapter } from "@/adapters/jwt/token.adapter";
import { HttpAuthRepositoryAdapter } from "@/adapters/http/auth-repository.adapter";

const sessionService = new SessionService(
  new JoseCryptAdapter(),
  new JWTTokenAdapter(),
  new HttpAuthRepositoryAdapter()
);

export async function GET(req: NextRequest) {
  try {
    const session = await sessionService.getSession();
    return NextResponse.json(session);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await sessionService.setSession(body);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
