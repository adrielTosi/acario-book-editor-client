import React from "react";
import Link from "next/link";
import { StoryCard } from "components/StoryCard";

export default function Home() {
  return (
    <div className="container">
      <div className="columns is-vcentered is-multiline is-full-height">
        <div className="column is-3">
          <StoryCard />
        </div>
        <div className="column is-3">
          <StoryCard />
        </div>
        <div className="column is-3">
          <StoryCard />
        </div>
        <div className="column is-3">
          <StoryCard />
        </div>

      </div>
    </div>
  );
}
