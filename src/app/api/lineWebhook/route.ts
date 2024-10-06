import { NextRequest, NextResponse } from "next/server";

const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // LINE APIにメッセージを送信
    const response = await fetch("https://yourdomain.com/api/lineMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error in lineMessage:", errorData);
      throw new Error(`LINE API error: ${errorData.message || errorData}`);
    }

    return NextResponse.json({ message: "メッセージを送信しました" }, { status: 200 });
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
