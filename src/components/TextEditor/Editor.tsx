import { Editor, EditorContent } from '@tiptap/react'
import { Box } from 'components/ui/Box'
import styled from 'styled-components'
import theme from 'styles/theme'
import { Menu } from './Menu'

type TextEditorProps = {
  editor: Editor | null
}

export const TextEditor = ({ editor }: TextEditorProps) => {
  return (
    <>
      <Menu editor={editor} />
      <EditorBox backgroundColor={theme.colors.bg_comp_2} padding="1em" >
        <EditorContent editor={editor} />
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