import React from "react";
import Link from "next/link";

import style from "styles/modules/indexPage.module.scss";
import PillarLayout from "components/layout/PillarLayout";

export default function Home() {
  return (
    <PillarLayout>
      <div className={style.wrapper}>
        <div className="columns is-centered is-vcentered is-gapless is-full-height is-mobile">
          <div className="column is-8">
            <h1 className="has-text-weight-semibold">Book Editor</h1>
            <div className="has-text-right">
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </PillarLayout>
  );
}
