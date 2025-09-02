import { useState } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(200);
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");
  const [colors, setColors] = useState([]); // store colors for bars

  // Utility: sleep for animation
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Generate Array
  const generateArray = () => {
    if (sorting) return;
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 100) + 5
    );
    setArray(newArray);
    setColors(Array(arraySize).fill("steelblue"));
  };

  // Bubble Sort
  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    let col = [...colors];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        col[j] = "red";
        col[j + 1] = "red";
        setColors([...col]);
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }

        col[j] = "steelblue";
        col[j + 1] = "steelblue";
      }
      col[arr.length - i - 1] = "green"; // mark sorted
    }
    setColors([...col]);
    setSorting(false);
  };

  // Selection Sort
  const selectionSort = async () => {
    setSorting(true);
    let arr = [...array];
    let col = [...colors];
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        col[minIndex] = "red";
        col[j] = "yellow";
        setColors([...col]);
        await sleep(speed);

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
        col[j] = "steelblue";
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setArray([...arr]);
      col[i] = "green"; // sorted
    }
    setColors([...col]);
    setSorting(false);
  };

  // Insertion Sort
  const insertionSort = async () => {
    setSorting(true);
    let arr = [...array];
    let col = [...colors];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        col[j] = "red";
        col[j + 1] = "red";
        setColors([...col]);
        await sleep(speed);

        arr[j + 1] = arr[j];
        setArray([...arr]);
        col[j] = "steelblue";
        j--;
      }
      arr[j + 1] = key;
      setArray([...arr]);
      col[i] = "green"; // mark inserted correctly
    }
    setColors([...col]);
    setSorting(false);
  };

  // Run selected algorithm
  const runSort = () => {
    if (selectedAlgo === "Bubble Sort") bubbleSort();
    if (selectedAlgo === "Selection Sort") selectionSort();
    if (selectedAlgo === "Insertion Sort") insertionSort();
  };

  return (
    <div className="App">
      <h1>Algorithm Visualizer</h1>

      <div className="controls">
        <button onClick={generateArray} disabled={sorting}>
          Generate Array
        </button>

        <label>
          Array Size:
          <input
            type="range"
            min="5"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={sorting}
          />
        </label>

        <label>
          Speed:
          <input
            type="range"
            min="50"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={sorting}
          />
        </label>

        <select
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
          disabled={sorting}
        >
          <option>Bubble Sort</option>
          <option>Selection Sort</option>
          <option>Insertion Sort</option>
        </select>

        <button onClick={runSort} disabled={sorting}>
          Run {selectedAlgo}
        </button>
      </div>

      <div id="array">
        {array.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{ height: `${value * 3}px`, background: colors[index] }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
