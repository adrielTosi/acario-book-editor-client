import { Editor, EditorContent } from '@tiptap/react'
import { Box } from 'components/ui/Box'
import styled from 'styled-components'
import theme from 'styles/theme'
import { Menu } from './Menu'

type TextEditorProps = {
  editor: Editor | null
  readOnly?: boolean
}

export const TextEditor = ({ editor, readOnly }: TextEditorProps) => {
  return (
    <>
      {!readOnly && <Menu editor={editor} />}
      <EditorBox backgroundColor={theme.colors.bg_comp_1_light} padding="1em" >
        <EditorContent editor={editor} readOnly={readOnly} />
      </EditorBox>
    </>
  )
}

const EditorBox = styled(Box)`
  & ul, ol {
    padding-left: 1.5em;
  }
  & .ProseMirror p {
    text-indent: 2em;
    margin-bottom: 1em;
  }
`