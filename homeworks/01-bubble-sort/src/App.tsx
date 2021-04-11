import React from "react";
import "./App.css";
import { ArrayCell, generateWidthArray } from "./arrayGeneration";

function sort(
  data: ArrayCell[]
): { sortedData: ArrayCell[]; isSolved: boolean; currentId: number | null } {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - 1 - i; j++) {
      if (data[j].value > data[j + 1].value) {
        const temp = data[j];
        data[j] = data[j + 1];

        data[j + 1] = temp;
        return {
          sortedData: data.slice(),
          isSolved: false,
          currentId: data[j].id,
        };
      }
    }
  }
  return { sortedData: data, isSolved: true, currentId: null };
}

interface AppState {
  data: ArrayCell[];
  intervalId: NodeJS.Timeout | null;
  isSolved: boolean;
  isRunning: boolean;
  currentId: number | null;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: generateWidthArray(4, 200),
      intervalId: null,
      isSolved: false,
      isRunning: false,
      currentId: null,
    };
  }

  pauseSort = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    this.setState({ isRunning: false });
  };

  startSort = () => {
    const intervalId = setInterval(() => {
      const { sortedData, isSolved, currentId } = sort(this.state.data);
      this.setState({ data: sortedData, isSolved, currentId });

      if (isSolved) {
        clearInterval(intervalId);
        this.setState({ isRunning: false });
      }
    }, 100);

    this.setState({ intervalId, isRunning: true });
  };

  generateNewArray = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    this.setState({
      data: generateWidthArray(4, 200),
      intervalId: null,
      isSolved: false,
      isRunning: false,
      currentId: null,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Bubble sort 🙃</h1>
        <div className="elementContainer">
          {this.state.data.map((el) => {
            return (
              <div
                key={el.id}
                className={`element${
                  el.id === this.state.currentId ? " currentElement" : ""
                }`}
                style={{ height: el.value }}
              ></div>
            );
          })}
        </div>
        <div>
          <button onClick={this.generateNewArray}>New set</button>
          {this.state.isRunning ? (
            <button onClick={this.pauseSort}>Pause</button>
          ) : (
            <button onClick={this.startSort} disabled={this.state.isSolved}>
              Start
            </button>
          )}
          <p>{this.state.isSolved ? "Solved" : "Not solved"}</p>
        </div>
      </div>
    );
  }
}

export default App;
