
import './App.css'

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff"
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Hello, React!</h1>
        <button
          onClick={() => alert("Button clicked!")}
          style={{ marginTop: "16px", padding: "8px 16px", fontSize: "16px" }}
        >
          Click Me
        </button>
      </div>
    </div>
  );
}

export default App
