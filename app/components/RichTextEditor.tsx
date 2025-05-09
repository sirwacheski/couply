import React from "react";
import { RichEditor } from "react-native-pell-rich-editor";

export type RichTextEditorProps = {
  value: string;
  enabled?: boolean;
  autoFocus?: boolean;
  autoCorrect?: boolean;
  cssStyle?: string;
  onChange: (value: string) => void;
}

export function useRichTextEditorRef() {
  return React.useRef<RichEditor | null>(null);
}

export const RichTextEditor = React.forwardRef(({ 
  value, 
  onChange,
  autoFocus,
  autoCorrect,
  cssStyle = "",
  enabled = true, 
}: RichTextEditorProps, ref: React.Ref<RichEditor>) => {
  // References
  const richEditorRef = React.useRef<RichEditor | null>(null);

  // Handlers
  function handleLoadEnd() {
    if(autoFocus) {
      richEditorRef.current?.focusContentEditor();
    }
  }

  // Side Effects
  React.useImperativeHandle(ref, () => richEditorRef.current!)

  return (
    <RichEditor
    ref={richEditorRef}
    disabled={!enabled}
    autoCorrect={autoCorrect}
    initialContentHTML={value}
    autoCapitalize={"sentences"}
    onLoadEnd={() => handleLoadEnd()}
    onChange={(text) => onChange(text)}
    showsVerticalScrollIndicator={false}
    editorStyle={{
      color: "white",
      caretColor: "white",
      backgroundColor: "transparent",
      contentCSSText: `padding: 0px; ${cssStyle}`,
    }}
    style={{
      flex: 1,
      width: "100%",
    }}
    />
  );
});