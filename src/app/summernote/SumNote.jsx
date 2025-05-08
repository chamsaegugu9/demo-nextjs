"use clinet";

import { useEffect, useRef } from "react";
import $ from "jquery";

import "summernote/dist/summernote-lite.css";
import "summernote/dist/summernote-lite.js";
import "summernote";

const SummernoteEditor = ({ onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && editorRef.current) {
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
          onChange: function (contents) {
            onChange(contents);
          },
          onInit: function () {},
        },
      });
    }
    return () => {
      $editor.summernote("destroy");
    };
  }, [onChange]);

  return <div ref={editorRef}></div>;
};

export default SummernoteEditor;
