import { withApollo } from "apollo/withApollo";
import { TextEditor } from "components/TextEditor/Editor";
import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { StyledField } from "components/ui/StyledField";
import { StyledLabel } from "components/ui/StyledLabel";
import { Form, Formik } from "formik";
import { useCreateChapterMutation } from "graphql/generated/mutations";
import { useTipTap } from "lib/hooks/UseTipTap";
import router from "next/router";
import { toast } from "react-toastify";
import theme from "styles/theme";
import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string()
    .max(400, "Too long, please make it shorter!")
    .required(),
});

const initialValues = {
  title: "",
  description: "",
};

const Create = () => {
  const [createChapter] = useCreateChapterMutation();

  const editor = useTipTap();

  const handleSubmit = async ({ title, description }: typeof initialValues) => {
    const text = editor?.getHTML().toString();
    if (text) {
      try {
        const chap = await createChapter({
          variables: { chapterData: { title, description, text } },
        });
        router.push("/dashboard");
        toast(`Create new Story: "${chap.data?.createChapter.title}"`, {
          toastId: "story-created",
        });
      } catch (err) {
        toast((err as any).message, { toastId: "error-on-create-story" });

        console.log(err);
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
              />
              {errors && <span>{errors.description}</span>}
            </Box>

            <TextEditor editor={editor} />
            <Box mt="1em" textAlign="right">
              <Button type="submit">Create</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default withApollo(Create);
