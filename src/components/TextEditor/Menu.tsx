import { FaBold } from "@react-icons/all-files/fa/FaBold"
import { FaItalic } from "@react-icons/all-files/fa/FaItalic"
import { FaHeading } from "@react-icons/all-files/fa/FaHeading"
import { FaAlignLeft } from "@react-icons/all-files/fa/FaAlignLeft"
import { FaAlignCenter } from "@react-icons/all-files/fa/FaAlignCenter"
import { FaAlignRight } from "@react-icons/all-files/fa/FaAlignRight"
import { FaListOl } from "@react-icons/all-files/fa/FaListOl"
import { FaListUl } from "@react-icons/all-files/fa/FaListUl"
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
    <Box backgroundColor={theme.colors.contrast_low} padding="0.5em 1em" borderRadius="0.125em" display="flex" flexWrap="wrap" position="sticky" top="0" zIndex={99}>
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
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
        Icon={FaHeading}
      />

      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
        Icon={FaAlignLeft}
      />
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
        Icon={FaAlignCenter}
      />
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        active={editor.isActive({ textAlign: 'right' })}
        Icon={FaAlignRight}
      />

      <MenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        Icon={FaListOl}
      />

      <MenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('unorderedList')}
        Icon={FaListUl}
      />


    </Box>
  )
}