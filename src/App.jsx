import { useState } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);

  // Generate Random Array
  const generateArray = () => {
    if (sorting) return;
    const newArray = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100) + 5
    );
    setArray(newArray);
  };

  // Bubble Sort
  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise((r) => setTimeout(r, 200));
        }
      }
    }
    setSorting(false);
  };

  // Selection Sort
  const selectionSort = async () => {
    setSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) minIndex = j;
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        await new Promise((r) => setTimeout(r, 200));
      }
    }
    setSorting(false);
  };

  // Insertion Sort
  const insertionSort = async () => {
    setSorting(true);
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await new Promise((r) => setTimeout(r, 200));
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await new Promise((r) => setTimeout(r, 200));
    }
    setSorting(false);
  };

  return (
    <div className="App">
      <h1>Algorithm Visualizer</h1>
      <div className="controls">
        <button onClick={generateArray} disabled={sorting}>
          Generate Array
        </button>
        <button onClick={bubbleSort} disabled={sorting}>
          Bubble Sort
        </button>
        <button onClick={selectionSort} disabled={sorting}>
          Selection Sort
        </button>
        <button onClick={insertionSort} disabled={sorting}>
          Insertion Sort
        </button>
      </div>
      <div id="array">
        {array.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{ height: `${value * 3}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
