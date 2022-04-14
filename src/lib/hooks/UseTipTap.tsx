import TextAlign from "@tiptap/extension-text-align"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

type UseTipTapProps = {
  readOnly?: boolean
  content?: string
}

export const useTipTap = (props?: UseTipTapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      })
    ],
    content: props?.content || "<p>Hello World! 🌎️</p>",
    editable: props?.readOnly || true
  })
  return editor
}