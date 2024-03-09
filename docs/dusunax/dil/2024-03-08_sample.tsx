/** Class Component
 * A. method & this binding
 * B. life-cycle method
 * */
import { Component, useState } from "react";

export default function ClassComponent() {
  const [name, setName] = useState("bar");

  return (
    <section>
      <aside>
        <label>Class Component</label>
        <MyComponent required={false} name="foo" />
        <MyComponent required={true} name={name} />

        <div className="flex gap-2 items-center border p-3 px-4 rounded-xl shadow-md text-xs">
          <label htmlFor="user">이름</label>
          <input
            id="user"
            type="text"
            className="flex-1 m-0"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </aside>
    </section>
  );
}

// --------------------------------------
// 240308 - class component
interface MyProps {
  required: boolean;
  name: string;
}

interface MyState {
  count: number;
  prevButton: "" | "+" | "-" | "?";
  isWin: boolean;
}

class MyComponent extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      count: 0,
      prevButton: "",
      isWin: false,
    };

    // 1️⃣ this binding in function declaration
    this.handleClick = this.handleClick.bind(this);
  }

  private renderCounter = 0;

  // ---------------------------------------
  /**
   * A. method & this binding
   * - 1️⃣ this binding in function declaration
   * - 2️⃣ arrow function's this is upper scope
   * - 3️⃣ new method each time when render
   */

  private handleClick() {
    if (this.state.isWin) return;

    this.setState((state) => ({
      ...state,
      count: state.count + 1,
      prevButton: "+",
    }));
  }

  // 2️⃣ arrow function: this is upper scope (상위 스코프)
  private handleClick2 = () => {
    if (this.state.isWin) return;

    this.setState((state) => ({
      ...state,
      count: state.count > 0 ? state.count - 1 : 0,
      prevButton: "-",
    }));
  };

  private handleClick3() {
    try {
      if (this.state.isWin) {
        throw new Error("you already won 🤷‍♀️");
      }
      if (this.state.count > 21) {
        throw new Error("🤷‍♀️");
      }

      this.setState((state) => ({
        ...state,
        count: state.count + Math.floor(Math.random() * 10),
        prevButton: "?",
      }));
    } catch (err) {
      console.log(err);
    }
  }

  private win = () => {
    this.setState((state) => ({
      ...state,
      isWin: true,
    }));
  };

  // ---------------------------------------
  /** B. life-cycle method
   *
   * [Mount]
   * constructor()
   * -> static getDerivedStateFromProps()
   * -> render()
   * -> componentDidMount()
   *
   * [Update]
   * static getDerivedStateFromProps()
   * -> shouldComponentUpdate()
   * -> render()
   * -> getSnapshotBeforeUpdate()
   * -> componentDidUpdate()
   *
   * [Unmount]
   * componentWillUnmount()
   * */

  static getDerivedStateFromProps(nextProps: MyProps, prevState: MyState) {
    console.log("getDerivedStateFromProps", nextProps);

    return null;
  }

  componentDidMount() {
    console.log("mount!");
  }

  shouldComponentUpdate(nextProps: MyProps, nextState: MyState) {
    if (nextProps.name !== this.props.name) return true;
    if (nextState.count <= 0) return false;
    return !this.state.isWin || this.state.count !== 21;
  }

  getSnapshotBeforeUpdate(prevProps: MyProps, prevState: MyState) {
    return { ...prevProps, ...prevState };
  }

  componentDidUpdate(prevProps: MyProps, prevState: MyState, snapShot: any) {
    console.log(`snapShot: `, snapShot);
    if (this.state.count === 21 && this.state.isWin === false) {
      alert("🪄 21");
      this.win();
    }
  }

  componentWillUnmount() {
    console.log("clean up!");
  }

  render() {
    const {
      props: { required, name },
      state: { count, prevButton },
    } = this;

    this.renderCounter++;

    return (
      <>
        <h3 className={count > 21 ? "text-red-500" : ""}>
          {required && <span className="text-red-500">*</span>} {name} :{" "}
          <span
            className={prevButton === "?" ? "inline-block animate-bounce" : ""}
          >
            {prevButton === "?" && "?"}
            {count !== 21 && prevButton !== "?" ? count : ""}
            {count === 21 && "21💎 -end!"}
          </span>
        </h3>
        <div className="flex gap-2 justify-center">
          <button
            className="bg-blue-300 border-none select-none"
            onClick={this.handleClick}
          >
            +
          </button>
          <button
            className="bg-red-300 border-none select-none"
            onClick={this.handleClick2}
          >
            -
          </button>
          {/* 3️⃣ new method each time when render */}
          <button
            className="bg-green-300 animate-spin border-none select-none"
            onClick={() => this.handleClick3()}
          >
            ?
          </button>
        </div>

        <p className="text-xs text-right opacity-30">
          render count: {this.renderCounter}
        </p>
      </>
    );
  }
}
