"use client";
import { useEffect, useRef, useState } from "react";

import $ from "jquery";

const SummernoteEditor = ({ onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (typeof window !== undefined && editorRef.current) {
      const $editor = $(editorRef.current);
      $editor.summernote({
        height: 300,
        tabsize: 2,
        disableDragAndDrop: true,
        lang: "ko-KR",
        popover: {
          image: [],
          link: [],
          air: [],
        },
        callbacks: {
          onChange: (contents) => {
            onChange(contents);
          },
          onInit: () => {},
        },
      });
    }
  }, [isReady, onChange]);

  return <div ref={editorRef}></div>;
};

export default SummernoteEditor;
