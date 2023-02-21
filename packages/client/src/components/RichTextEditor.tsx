import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditor } from 'tinymce';
import { tinyMceApiKey } from '@/utils/constants';

interface IRichTextEditorProps {
  onChange?: (a: string, editor: TinyMCEEditor) => void;
  value?: string;
}

export const RichTextEditor = ({ onChange, value }: IRichTextEditorProps) => {
  const editorRef = useRef<TinyMCEEditor>();

  return (
    <Editor
      apiKey={tinyMceApiKey}
      onEditorChange={onChange}
      onInit={(evt, editor) => {
        editorRef.current = editor;
      }}
      value={value}
      init={{
        language: 'ru',
        height: 300,
        max_height: 300,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
          'emoticons',
          'autoresize',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help | emoticons',
        statusbar: false,
        content_style: 'body { font-size:14px }',
      }}
    />
  );
};
