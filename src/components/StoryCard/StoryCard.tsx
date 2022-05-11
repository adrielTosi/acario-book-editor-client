import { ChapterFragment } from "graphql/generated/graphqlTypes";
import { HorizontalCard } from "./HorizontalCard";
import { VerticalFormat } from "./VerticalCard";

export type StoryCardProps = ChapterFragment & {
  format: "vertical" | "horizontal";
};

export const StoryCard = (props: StoryCardProps) => {
  if (props.format === "vertical") {
    return <VerticalFormat {...props} />;
  } else {
    return <HorizontalCard {...props} />;
  }
};
