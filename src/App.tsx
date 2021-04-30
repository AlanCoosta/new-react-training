import { useCallback } from "react";

const App = () => {
  const onAlert = useCallback(() => {
    alert("Welcome to the React Training");
  }, [alert]);

  return (
    <div>
      <button onClick={onAlert}>Alert</button>
    </div>
  );
};

export default App;
