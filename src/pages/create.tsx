import TextAlign from '@tiptap/extension-text-align';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { withApollo } from 'apollo/withApollo';
import { TextEditor } from "components/TextEditor/Editor";
import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { Button } from 'components/ui/Button';
import { Field, Form, Formik } from "formik";
import { useCreateChapterMutation } from 'graphql/generated/mutations';
import router from 'next/router';
import styled from "styled-components";
import theme from "styles/theme";
import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().max(400, "Too long, please make it shorter!").required(),
});

const initialValues = {
  title: "",
  description: "",
}

const Create = () => {
  const [createChapter] = useCreateChapterMutation()

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      })
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  const handleSubmit = async ({ title, description }: typeof initialValues) => {
    const text = editor?.getHTML().toString()
    if (text) {
      try {
        await createChapter({ variables: { chapterData: { title, description, text } } })
        router.push("/")
      } catch (err) {
        console.log(err)
      }

    }
  }
  return (
    <Box className="container is-max-desktop" padding="0 8px">
      <Formik
        initialValues={initialValues}
        validationSchema={CreateSchema}
        onSubmit={(values) => { handleSubmit(values) }}
      >
        {({ errors, values, handleChange }) => (
          <Form>
            <Box mb="1em">
              <Label htmlFor="title">Title: </Label>
              <StyledField name="title" type="text" />
              {errors && <span>{errors.title}</span>}
            </Box>

            <Box mb="1em">
              <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                <Label htmlFor="description">Description: </Label>
                <Text size="small" color={theme.colors.contrast_low}>{values.description.length}/400</Text>

              </Box>
              <StyledField name="description" as="textarea" onChange={handleChange} />
              {errors && <span>{errors.description}</span>}
            </Box>

            <TextEditor editor={editor} />
            <Box mt="1em" textAlign="right">
              <Button type="submit" >Create</Button>
            </Box>
          </Form>

        )}
      </Formik>
    </Box>
  )
}

const Label = styled.label`
  font-size: 16px;
  line-height: 24px;
  font-family: ${(props) => props.theme.font.body};
  font-style: normal;
  font-weight: normal;
`

const StyledField = styled(Field)`
  width: 100%;
  background-color: transparent;
  border: ${props => `1px solid ${props.theme.colors.comp_outline}`};
  border-radius: 4px;
  padding: 1em;
  color: ${props => `${props.theme.colors.contrast_high}`};
  resize: vertical
`

export default withApollo(Create)