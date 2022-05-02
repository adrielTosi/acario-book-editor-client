import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { CommentFragment } from "graphql/generated/graphqlTypes";
import Link from "next/link";
import theme from "styles/theme";

export const Comment = (props: CommentFragment) => {
  return (
    <>
      <Box
        backgroundColor={theme.colors.comp_outline}
        padding="1em"
        borderRadius="2px"
      >
        {props.text}
      </Box>

      <Box>
        <Text size="small" color={theme.colors.contrast_med}>
          {props.author.name}
        </Text>
        <Link href={`/user/${props.author.username}`}>
          <div>
            <Text size="small" color={theme.colors.contrast_low}>
              @{props.author.username}
            </Text>
          </div>
        </Link>
      </Box>
    </>
  );
};
