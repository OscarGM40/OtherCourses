import { memo, useCallback, useMemo, useState } from "react";
import "./App.css";

function Swatch({ params, onClick }) {
  console.log(`Swatch rendered with ${params.color} color`);
  return (
    <div
      style={{
        margin: 2,
        width: 75,
        height: 75,
        backgroundColor: params.color,
      }}
      onClick={onClick}
    ></div>
  );
}

/* const MemoedSwatch = memo(Swatch, (prevProps, nextProps) => {
  console.log("MemoedSwatch rendered");
  console.log(prevProps.params.color === nextProps.params.color);
  return prevProps.params.color === nextProps.params.color;
}); */
const MemoedSwatch = memo(Swatch);

function App() {
  const [appRenderIndex, setAppRenderIndex] = useState(0);
  const [color, setColor] = useState("red");

  console.log(`App rendered ${appRenderIndex} times`);

  const params = useMemo(() => ({ color }), [color]);
  const onClick = useCallback(() => () => {}, []);

  return (
    <div className="App">
      <div className="">
        <button onClick={() => setAppRenderIndex(appRenderIndex + 1)}>Re-render App</button>
        <button onClick={() => setColor(color === "red" ? "blue" : "red")}>ChangeColor</button>
      </div>
      <div className="">
        <MemoedSwatch params={params} onClick={onClick} />
        {/* <MemoedSwatch params={color === "red" ? "blue" : "red"} /> */}
      </div>
    </div>
  );
}

export default App;
