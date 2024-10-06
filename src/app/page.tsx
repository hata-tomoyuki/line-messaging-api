import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1>ようこそ！</h1>
      <p>このアプリでは、LINEメッセージAPIを使ってデータを送信できます。</p>

      <nav>
        <ul>
          <li>
            <Link href="/create">
              <span className={styles.navLink}>データ入力フォームへ</span>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <span className={styles.navLink}>このアプリについて</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
