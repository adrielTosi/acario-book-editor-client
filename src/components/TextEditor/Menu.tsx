import { FaBold } from "@react-icons/all-files/fa/FaBold"
import { FaItalic } from "@react-icons/all-files/fa/FaItalic"
import { Editor } from "@tiptap/react"

import { Box } from "components/ui/Box"
import theme from "styles/theme"
import { MenuButton } from "./MenuButton"


interface MenuProps {
  editor: Editor | null
}
export const Menu = ({ editor }: MenuProps) => {
  if (!editor) {
    return null
  }
  return (
    <Box backgroundColor={theme.colors.contrast_low} padding="1em" borderRadius="0.125em" display="flex">
      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        Icon={FaBold}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        Icon={FaItalic}
      />
    </Box>
  )
}