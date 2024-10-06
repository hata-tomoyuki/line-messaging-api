import { NextRequest, NextResponse } from "next/server";

const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    const message = {
      to: "U2e06e9c1777f795eacdf55813d0fa6fe",
      messages: [
        {
          type: "text",
          text: `新しいフォームの送信があります。\n名前: ${name}\nメールアドレス: ${email}`,
        },
      ],
    };

    const response = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(message),
    });

    const responseData = await response.json();
    console.log("Response from LINE API:", responseData);

    if (!response.ok) {
      throw new Error(
        `LINE API error: ${responseData.message || responseData}`
      );
    }

    return NextResponse.json(
      { message: "メッセージを送信しました" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in lineMessage:", error.message);
      return NextResponse.json(
        { message: "サーバーエラー", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error in lineMessage:", error);
      return NextResponse.json(
        { message: "サーバーエラー", error: "Unknown error" },
        { status: 500 }
      );
    }
  }
}
