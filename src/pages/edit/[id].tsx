import { withApollo } from "apollo/withApollo";
import { TextEditor } from "components/TextEditor/Editor";
import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { StyledField } from "components/ui/StyledField";
import { StyledLabel } from "components/ui/StyledLabel";
import { Form, Formik } from "formik";
import { GetChapterQuery } from "graphql/generated/graphqlTypes";
import { useUpdateChapterMutation } from "graphql/generated/mutations";
import { ssrGetChapter, useCurrentUser } from "graphql/generated/page";
import { usePrivateRoute } from "lib/auth";
import { useTipTap } from "lib/hooks/UseTipTap";
import { GetServerSideProps, NextPage } from "next";
import router from "next/router";
import theme from "styles/theme";
import { ServerSideProps } from "types/ServerSideProps";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { IS_CLIENT_SIDE } from "lib/contants";
type EditProps = ServerSideProps<GetChapterQuery>;

const CreateSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string()
    .max(400, "Too long, please make it shorter!")
    .required(),
});

const Edit: NextPage<EditProps> = ({ error, data }) => {
  usePrivateRoute();
  if (error) {
    toast(error, { toastId: "error-on-edit-story" });
    if (IS_CLIENT_SIDE) {
      router.push("/");
    }
    return null;
  } else {
    const { data: user } = useCurrentUser();
    const editor = useTipTap({ content: data.getChapter.text });
    const isOwner = user?.currentUser.id === data.getChapter.authorId;

    console.log(user?.currentUser.id, data.getChapter.authorId);

    if (!isOwner && user && IS_CLIENT_SIDE) {
      toast("You tried editing a story from someone else.", {
        toastId: "error-on-edit-story-not-owner",
      });
      router.push("/dashboard");
    }

    const [updateChapter] = useUpdateChapterMutation();

    const initialValues = {
      title: data.getChapter.title,
      description: data.getChapter.description,
    };

    const handleSubmit = async ({
      title,
      description,
    }: typeof initialValues) => {
      const text = editor?.getHTML().toString();
      if (text) {
        try {
          await updateChapter({
            variables: {
              chapterData: {
                title,
                description,
                text,
                chapterId: data.getChapter.id,
              },
            },
          });
          router.push(`/story/${data.getChapter.id}`);
        } catch (err) {
          toast((err as any).message, {
            toastId: "error-on-edit-story-not-owner",
          });
        }
      }
    };

    return (
      <Box className="container is-max-desktop" padding="0 8px">
        <Formik
          initialValues={initialValues}
          validationSchema={CreateSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, values, handleChange }) => (
            <Form>
              <Box mb="1em">
                <StyledLabel htmlFor="title">Title: </StyledLabel>
                <StyledField name="title" type="text" />
                {errors && <span>{errors.title}</span>}
              </Box>

              <Box mb="1em">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <StyledLabel htmlFor="description">Description: </StyledLabel>
                  <Text size="small" color={theme.colors.contrast_low}>
                    {values.description.length}/400
                  </Text>
                </Box>
                <StyledField
                  name="description"
                  as="textarea"
                  onChange={handleChange}
                  value={values.description}
                />
                {errors && <span>{errors.description}</span>}
              </Box>

              <TextEditor editor={editor} />
              <Box mt="1em" textAlign="right">
                <Button type="submit">Update</Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    );
  }
};

export default withApollo(Edit);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;

  try {
    const res = await ssrGetChapter.getServerPage(
      {
        variables: { chapterId: params ? (params.id as string) : "" },
        notifyOnNetworkStatusChange: true,
      },
      context
    );
    return res;
  } catch (error: any) {
    return { props: { error: error.message } };
  }
};
