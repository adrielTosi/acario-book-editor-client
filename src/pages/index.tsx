import Link from "next/link";
import style from "src/styles/modules/indexPage.module.scss";

export default function Home() {
  return (
    <div className={style.wrapper}>
      <div className="columns is-centered is-vcentered is-gapless is-full-height is-mobile">
        <div className="column is-8">
          <h1 className="has-text-weight-semibold">Book Editor</h1>
          <div className="has-text-right">
            <Link href="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
