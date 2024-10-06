"use client";
import { useState } from "react";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement; // 型キャスト
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    // フォームのデータを送信する
    const response = await fetch("/api/lineWebhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("レスポンス確認", response);

    if (response.ok) {
      alert("LINEにメッセージを送信しました!");
    } else {
      alert("メッセージの送信に失敗しました。");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        名前:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        メールアドレス:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">送信</button>
    </form>
  );
}
