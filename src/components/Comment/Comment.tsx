import { gql } from "@apollo/client";
import { RiDeleteBin5Fill } from "@react-icons/all-files/ri/RiDeleteBin5Fill";
import { MdModeEdit } from "@react-icons/all-files/md/MdModeEdit";
import { ActionButton } from "components/StoryCard/ActionsBar";
import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { CommentFragment } from "graphql/generated/graphqlTypes";
import Link from "next/link";
import theme from "styles/theme";
import { StyledField } from "components/ui/StyledField";
import { Formik } from "formik";
import { Button } from "components/ui/Button";

type CommentProps = {
  data: CommentFragment;
  owner?: string;
  handleDelete?: (id: string) => void;
  isEditing?: boolean;
  toggleEditing?: () => void;
  handleEdit?: (id: string, text: string) => void;
};

export const Comment = ({
  data,
  owner,
  handleDelete,
  handleEdit,
  isEditing,
  toggleEditing,
}: CommentProps) => {
  const isOwner = data.author.id === owner;
  return (
    <>
      <Box
        backgroundColor={theme.colors.comp_outline}
        padding="1em"
        borderRadius="2px"
      >
        {isEditing ? (
          <Formik
            initialValues={{ text: data.text }}
            onSubmit={(values) =>
              handleEdit && handleEdit(data.id, values.text)
            }
          >
            {({ errors, submitForm }) => {
              return (
                <div className="columns is-vcentered">
                  <div className="column is-11">
                    <StyledField name="text" />
                  </div>
                  <div className="column">
                    <Button padding="8px" onClick={submitForm}>
                      Done
                    </Button>
                  </div>
                  <div>{errors.text}</div>
                </div>
              );
            }}
          </Formik>
        ) : (
          data.text
        )}
      </Box>

      <Box display="flex" justifyContent="space-between">
        <div>
          <Text size="small" color={theme.colors.contrast_med}>
            {data.author.name}
          </Text>
          <Link href={`/user/${data.author.username}`}>
            <div>
              <Text size="small" color={theme.colors.contrast_low}>
                @{data.author.username}
              </Text>
            </div>
          </Link>
        </div>
        {isOwner && (
          <div>
            <ActionButton onClick={toggleEditing}>
              <MdModeEdit color={theme.colors.contrast_med} />
            </ActionButton>
            <ActionButton onClick={() => handleDelete && handleDelete(data.id)}>
              <RiDeleteBin5Fill color={theme.colors.contrast_med} />
            </ActionButton>
          </div>
        )}
      </Box>
    </>
  );
};
