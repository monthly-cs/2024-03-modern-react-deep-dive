// 객체의 얕은 비교와 메모이제이션
// https://codesandbox.io/p/sandbox/mordern-react-deep-dive-t9vlwm?file=%2Fsrc%2Fcomponents%2FMemoization.tsx%3A13%2C5
import {
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";

export default function Memoization() {
  const [counter, setCounter] = useState(0);
  const value = useMath(10);
  const memoValue = memoUseMath(10);

  return (
    <section>
      <aside>
        <label>Class Component</label>
        <CounterComponent
          value={memoValue}
          title={"memo"}
          counter={counter}
          setCounter={setCounter}
        />
        <CounterComponent
          value={value}
          title={"no memo"}
          counter={counter}
          setCounter={setCounter}
        />
      </aside>
    </section>
  );
}

interface MyProps {
  value: { double: number; triple: number };
  title: string;
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
}

function CounterComponent({ value, title, counter, setCounter }: MyProps) {
  const sideEffect = useRef(0);

  useEffect(() => {
    sideEffect.current += 1;
    console.log(`double: ${value.double}, triple: ${value.triple}`);
  }, [value]);

  return (
    <div className="pt-4 pb-2 mb-2 rounded-lg shadow-md border">
      <div className="flex justify-center items-center gap-4">
        <h1>{title}!</h1>
        <button onClick={() => setCounter((prev) => ++prev)}>+</button>
      </div>

      <p className="text-xs opacity-30">
        rerender count: {counter} | useEffect: {sideEffect.current}
      </p>
    </div>
  );
}

function useMath(number: number) {
  const [double, setDouble] = useState(0);
  const [triple, setTriple] = useState(0);

  useEffect(() => {
    setDouble(number * 2);
    setTriple(number * 3);
  });

  return { double, triple };
}

function memoUseMath(number: number) {
  const [double, setDouble] = useState(0);
  const [triple, setTriple] = useState(0);

  useEffect(() => {
    setDouble(number * 2);
    setTriple(number * 3);
  });

  return useMemo(() => ({ double, triple }), [double, triple]);
}
