"use clinet";

import { useEffect, useRef } from "react";
import $ from "jquery";

import "summernote/dist/summernote-lite.css";
import "summernote/dist/summernote-lite.js";

const SummernoteEditor = ({ onChange }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && editorRef.current) {
      const $editor = $(editorRef.current);

      $editor.summernote({
        height: 300,
        disableDragAndDrop: true,
        popover: {
          image: [],
          link: [],
          air: [],
        },
        toolbar: [
          ["insert", ["picture"]],
          ["custom", ["myCustomButton"]],
        ],
        buttons: {
          myCustomButton: function (context) {
            var ui = $.summernote.ui;
            var button = ui.button({
              contents: '<i class="note-icon-pencil"></i> My Button', // 버튼에 표시될 텍스트
              tooltip: "My Custom Button",
              container: $(".note-editor.note-frame"),
              click: function () {
                alert("커스텀 버튼 클릭됨!");
              },
            });
            return button.render();
          },
        },
        callbacks: {
          onChange: function (contents) {
            onChange(contents);
          },
          onInit: function () {},
          // onImageUpload: function (files) {
          //   const reader = new FileReader();
          //   URL.createObjectURL(files[0]);
          //   console.log(files[0]);

          //   $editor.summernote("insertImage", URL.createObjectURL(files[0]));
          // },
        },
      });
    }
    return () => {
      if (typeof window !== "undefined" && editorRef.current) {
        const $editor = $(editorRef.current);
        $editor.summernote("destroy");
      }
    };
  }, [onChange]);

  return <div ref={editorRef}></div>;
};

export default SummernoteEditor;
