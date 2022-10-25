import React, { useRef, useEffect } from "react";

const Canvas = (props) => {
  const canvasRef = useRef(props.ref);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.id = "CanvasLayer";
  }, []);

  return (
    <canvas
      ref={canvasRef}
      {...props}
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        border: "1px solid red",
        zIndex: "8"
      }}
    />
  );
};

export default Canvas;
