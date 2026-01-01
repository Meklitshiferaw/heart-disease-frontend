import { useState } from "react";

function App() {
  const [model, setModel] = useState("logistic");
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      model === "logistic"
        ? "https://heart-disease-api-jvjw.onrender.com/predict/logistic"
        : "https://heart-disease-api-jvjw.onrender.com/predict/tree";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        age: Number(formData.age),
        sex: Number(formData.sex),
        cp: Number(formData.cp),
        trestbps: Number(formData.trestbps),
        chol: Number(formData.chol),
        fbs: Number(formData.fbs),
        restecg: Number(formData.restecg),
        thalach: Number(formData.thalach),
        exang: Number(formData.exang),
        oldpeak: Number(formData.oldpeak),
        slope: Number(formData.slope),
        ca: Number(formData.ca),
        thal: Number(formData.thal),
      }),
    });

    const data = await response.json();
    setResult(
      data.prediction === 1
        ? "⚠️ Heart Disease Detected"
        : "✅ No Heart Disease"
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f9fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "30px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#dc3545" }}>
          Heart Disease Predictor
        </h2>

        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <label htmlFor="model" style={{ marginRight: "10px", fontWeight: "bold" }}>
            Select Model:
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            <option value="logistic">Logistic Regression</option>
            <option value="tree">Decision Tree</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} style={{ marginBottom: "12px" }}>
              <input
                type="number"
                step="any"
                name={key}
                placeholder={key.replace(/_/g, " ").toUpperCase()}
                value={formData[key]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#dc3545",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Predict
          </button>
        </form>

        {result && (
          <h3
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: result.includes("Detected") ? "#dc3545" : "#28a745",
            }}
          >
            {result}
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
