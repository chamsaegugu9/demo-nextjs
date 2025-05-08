"use client";

import { useEffect, useState } from "react";

import SumEditor from "./SumNote2";

export default function Home() {
  const [content, setContent] = useState<string>("");
  const [on, setOn] = useState(true);
  useEffect(() => {
    console.log("hwt");
    setOn(false);
  }, []);
  if (on) {
    return <div></div>;
  }

  return (
    <div>
      <p>Hello</p>
      <SumEditor onChange={setContent} />

      <h3>Editor Output:</h3>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
