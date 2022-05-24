import { ChapterFragment } from "graphql/generated/graphqlTypes";
import { HorizontalCard } from "./HorizontalCard";
import { VerticalFormat } from "./VerticalCard";

export type ActionBarShow = {
  readLater?: boolean;
  edit?: boolean;
  publish?: boolean;
  delete?: boolean;
};

export type StoryCardProps = ChapterFragment & {
  format: "vertical" | "horizontal";
  /**
   * Choose which options to appear inside the three dots menu
   */
  showActions: ActionBarShow;
};

export const StoryCard = (props: StoryCardProps) => {
  if (props.format === "vertical") {
    return <VerticalFormat {...props} />;
  } else {
    return <HorizontalCard {...props} />;
  }
};
