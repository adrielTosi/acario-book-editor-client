import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Box } from 'components/ui/Box'
import theme from 'styles/theme'
import { Menu } from './Menu'

export const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <>
      <Menu editor={editor} />
      <Box backgroundColor={theme.colors.bg_comp_2} padding="1em" >
        <EditorContent editor={editor} />
      </Box>
    </>
  )
}