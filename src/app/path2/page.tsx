// import { css } from "@emotion/css";
// import imageExtensions from "image-extensions";
// import isHotkey from "is-hotkey";
// import isUrl from "is-url";
// import React, { MouseEvent, useMemo } from "react";
// import { Descendant, Transforms, createEditor } from "slate";
// import { withHistory } from "slate-history";
// import {
//   Editable,
//   ReactEditor,
//   RenderElementProps,
//   Slate,
//   useFocused,
//   useSelected,
//   useSlateStatic,
//   withReact,
// } from "slate-react";

// import { Button, Icon, Toolbar } from "./components";
// import {
//   CustomEditor,
//   ImageElement,
//   ParagraphElement,
//   RenderElementPropsFor,
// } from "./custom-types.d";

// const ImagesExample = () => {
//   const editor = useMemo(
//     () => withImages(withHistory(withReact(createEditor()))) as CustomEditor,
//     []
//   );

//   return (
//     <Slate editor={editor} initialValue={initialValue}>
//       <Toolbar>
//         <InsertImageButton />
//       </Toolbar>
//       <Editable
//         onKeyDown={(event) => {
//           if (isHotkey("mod+a", event)) {
//             event.preventDefault();
//             Transforms.select(editor, []);
//           }
//         }}
//         renderElement={(props: RenderElementProps) => <Element {...props} />}
//         placeholder="Enter some text..."
//       />
//     </Slate>
//   );
// };

// const withImages = (editor: CustomEditor) => {
//   const { insertData, isVoid } = editor;

//   editor.isVoid = (element) => {
//     return element.type === "image" ? true : isVoid(element);
//   };

//   editor.insertData = (data) => {
//     const text = data.getData("text/plain");
//     const { files } = data;

//     if (files && files.length > 0) {
//       Array.from(files).forEach((file) => {
//         const reader = new FileReader();
//         const [mime] = file.type.split("/");

//         if (mime === "image") {
//           reader.addEventListener("load", () => {
//             const url = reader.result;
//             insertImage(editor, url as string);
//           });

//           reader.readAsDataURL(file);
//         }
//       });
//     } else if (isImageUrl(text)) {
//       insertImage(editor, text);
//     } else {
//       insertData(data);
//     }
//   };

//   return editor;
// };

// const insertImage = (editor: CustomEditor, url: string) => {
//   const text = { text: "" };
//   const image: ImageElement = { type: "image", url, children: [text] };
//   Transforms.insertNodes(editor, image);
//   const paragraph: ParagraphElement = {
//     type: "paragraph",
//     children: [{ text: "" }],
//   };
//   Transforms.insertNodes(editor, paragraph);
// };

// const Element = (props: RenderElementProps) => {
//   const { attributes, children, element } = props;

//   switch (element.type) {
//     case "image":
//       return <Image {...props} />;
//     default:
//       return <p {...attributes}>{children}</p>;
//   }
// };

// const Image = ({
//   attributes,
//   children,
//   element,
// }: RenderElementPropsFor<ImageElement>) => {
//   const editor = useSlateStatic();
//   const path = ReactEditor.findPath(editor, element);
//   const selected = useSelected();
//   const focused = useFocused();
//   return (
//     <div {...attributes}>
//       {children}
//       <div
//         contentEditable={false}
//         className={css`
//           position: relative;
//         `}
//       >
//         <img
//           src={element.url}
//           className={css`
//             display: block;
//             max-width: 100%;
//             max-height: 20em;
//             box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
//           `}
//         />
//         <Button
//           active
//           onClick={() => Transforms.removeNodes(editor, { at: path })}
//           className={css`
//             display: ${selected && focused ? "inline" : "none"};
//             position: absolute;
//             top: 0.5em;
//             left: 0.5em;
//             background-color: white;
//           `}
//         >
//           <Icon>delete</Icon>
//         </Button>
//       </div>
//     </div>
//   );
// };

// const InsertImageButton = () => {
//   const editor = useSlateStatic();
//   return (
//     <Button
//       onMouseDown={(event: MouseEvent) => {
//         event.preventDefault();
//         const url = window.prompt("Enter the URL of the image:");
//         if (url && !isImageUrl(url)) {
//           alert("URL is not an image");
//           return;
//         }
//         url && insertImage(editor, url);
//       }}
//     >
//       <Icon>image</Icon>
//     </Button>
//   );
// };

// const isImageUrl = (url: string): boolean => {
//   if (!url) return false;
//   if (!isUrl(url)) return false;
//   const ext = new URL(url).pathname.split(".").pop();
//   return imageExtensions.includes(ext!);
// };

// const initialValue: Descendant[] = [
//   {
//     type: "paragraph",
//     children: [
//       {
//         text: "In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos.",
//       },
//     ],
//   },
//   {
//     type: "image",
//     url: "https://source.unsplash.com/kFrdX5IeQzI",
//     children: [{ text: "" }],
//   },
//   {
//     type: "paragraph",
//     children: [
//       {
//         text: "This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your clipboard and paste it anywhere in the editor!",
//       },
//     ],
//   },
//   {
//     type: "paragraph",
//     children: [
//       {
//         text: "You can delete images with the cross in the top left. Try deleting this sheep:",
//       },
//     ],
//   },
//   {
//     type: "image",
//     url: "https://source.unsplash.com/zOwZKwZOZq8",
//     children: [{ text: "" }],
//   },
// ];

// export default ImagesExample;
