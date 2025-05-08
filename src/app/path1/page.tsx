"use client";

import Image from "next/image";
// TypeScript users only add this code
import { useCallback, useState } from "react";
import {
  BaseEditor,
  createEditor,
  Editor,
  Element,
  Node,
  Transforms,
} from "slate";
import {
  Editable,
  ReactEditor,
  Slate,
  useFocused,
  useSelected,
  useSlateStatic,
  withReact,
} from "slate-react";

// type CustomElement = { type: "paragraph"; children: CustomText[] };
// type CustomText = { text: string };

// declare module "slate" {
//   interface CustomTypes {
//     Editor: BaseEditor & ReactEditor;
//     Element: CustomElement;
//     Text: CustomText;
//   }
// }

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const ImageElement = (props: any) => {
  const attr: any = props.element.children[0];
  return (
    <p {...props.attributes}>
      {/* <Image src={attr.text} alt="" width={attr.width} height={attr.height} /> */}
      <img src={attr.text} width={attr.width} height={attr.height} />
    </p>
  );
};

const Leaf = (props: any) => {
  const leaf: any = props.leaf;
  // console.log("Leaf props", props);
  // console.log("Leaf props.children", props.children);
  if (leaf.isImg === true) {
    return (
      <span {...props.attributes}>
        <img
          src={leaf.text}
          width={leaf.width}
          height={leaf.height}
          // contentEditable={false}
        />
        {/* {props.children} */}
      </span>
    );
  }
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

const DefaultElement = (props: any) => {
  // console.log("DefaultElement props: ", props);
  // console.log("DefaultElement props.children: ", props.children);
  return <p {...props.attributes}>{props.children}</p>;
};

const CustomEditor = {
  isBoldMarkActive(editor: any) {
    const marks: any = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isCodeBlockActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor: any) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleCodeBlock(editor: any) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(editor, { type: isActive ? null : "code" } as any, {
      match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
    });
  },
};

const serialize = (value: any) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n: any) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join("\n")
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph.", bold: true }],
  } as any,
  {
    type: "paragraph",
    children: [
      {
        text: "https://cdn.dailyvet.co.kr/wp-content/uploads/2024/05/15231604/20240515ceva_experts2.jpg",
        width: "100",
        height: "100",
        isImg: true,
      },
    ],
  },
];

export default function App() {
  const [editor] = useState(() => withReact(createEditor()));
  console.log(editor.isVoid.toString());

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "image":
        return <ImageElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  return (
    // Add a toolbar with buttons that call the same methods.
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        // console.log(value);
        // const content = JSON.stringify(value);
        // console.log("content", content);
        if (isAstChange) {
          // Save the value to Local Storage.
          // const content = JSON.stringify(value);
          //   console.log(serialize(value));
          // console.log("content", content);
        }
      }}
    >
      <div>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        // editor={editor}
        style={{
          border: "1px solid black",
        }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onDrop={(event) => {
          const dataTransfer = event.dataTransfer;
          for (let type of dataTransfer.types) {
            console.log(type, dataTransfer.getData(type));
          }
        }}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            case "`": {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            }

            case "b": {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
}
