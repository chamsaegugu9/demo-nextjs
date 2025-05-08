"use client";

import { useEffect, useRef } from "react";
import "summernote/dist/summernote-lite.css";
import $ from "jquery";
import "summernote/dist/summernote-lite.js";

interface SummernoteEditorProps {
  onChange: (content: string) => void;
}

const SummernoteEditor: React.FC<SummernoteEditorProps> = ({ onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const $editor = $(editorRef.current as any) as any;

      $editor.summernote({
        height: 300,
        tabsize: 2,
        // disableDragAndDrop: true,
        callbacks: {
          onChange: function (contents: string) {
            onChange(contents);
          },
          onInit: function () {
            Init();
          },
        },
      });

      function Init() {
        console.log("Hello");
      }
    }
  }, [onChange]);

  return <div ref={editorRef}></div>;
};

export default SummernoteEditor;
