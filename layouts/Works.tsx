import React from "react";

export default function Works(props: { scrollRef: any }) {
  const { scrollRef } = props;
  return (
    <div ref={scrollRef} className="text-white">
      Works
    </div>
  );
}
