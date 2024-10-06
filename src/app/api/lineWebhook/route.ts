import { NextRequest, NextResponse } from "next/server";
import { POST as sendLineMessage } from "../lineMessage/route";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // LINE Messaging API への送信などの処理を書く
    console.log("Received data:", data);

    // LINE API へのメッセージ送信
    const lineResponse = await sendLineMessage(req); // 受け取ったデータをLINE APIへ送信

    // LINE APIからのレスポンスを確認してレスポンスを返す
    return lineResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in lineWebhook:", error.message); // エラーメッセージを記録
      return NextResponse.json(
        { error: "Something went wrong", details: error.message }, // 詳細を含める
        { status: 500 }
      );
    } else {
      console.error("Unknown error in lineWebhook:", error);
      return NextResponse.json(
        { error: "Something went wrong", details: "Unknown error" }, // 不明なエラーを処理
        { status: 500 }
      );
    }
  }
}
