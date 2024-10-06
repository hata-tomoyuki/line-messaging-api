import { NextRequest, NextResponse } from "next/server";
import { POST as sendLineMessage } from "../lineMessage/route";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // 必要なデータを抽出してsendLineMessageに渡す
    const lineResponse = await sendLineMessage(data);

    return lineResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in lineWebhook:", error.message);
      return NextResponse.json(
        { error: "Something went wrong", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error in lineWebhook:", error);
      return NextResponse.json(
        { error: "Something went wrong", details: "Unknown error" },
        { status: 500 }
      );
    }
  }
}
