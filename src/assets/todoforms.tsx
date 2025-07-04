import React, { useState } from "react";

interface Tarea {
  tareas: string;
  descripcion: string;
  realizada: boolean;
}

interface Props {
  tareas: Tarea[];
  setTareas: React.Dispatch<React.SetStateAction<Tarea[]>>;
}

const TodoForms: React.FC<Props> = ({ tareas, setTareas }) => {
  const [tarea, setTarea] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (t: string, d: string) => {
    if (!t.trim()) return "La tarea no puede estar vacía.";
    if (!d.trim()) return "La descripción no puede estar vacía.";
    return "";
  };

  const handleGuardar = () => {
    const error = validate(tarea, descripcion);
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage("");

      const nuevaTarea: Tarea = { tareas: tarea, descripcion , realizada: false};
      const nuevasTareas = [...tareas, nuevaTarea];

      localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
      setTareas(nuevasTareas);

      console.log("Tarea guardada:", nuevaTarea);

      setTarea("");
      setDescripcion("");
    }
  };
 

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f4f4",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          minWidth: "300px",
        }}
      >
        <label htmlFor="tarea" style={{ fontWeight: "bold", color: "black" }}>
          Tarea:
        </label>
        <input
          type="text"
          id="tarea"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <label
          htmlFor="descripcion"
          style={{ fontWeight: "bold", color: "black" }}
        >
          Descripción:
        </label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        {errorMessage && (
          <p style={{ color: "red", fontSize: "14px", margin: 0 }}>
            {errorMessage}
          </p>
        )}

        <button
          type="button"
          onClick={handleGuardar}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default TodoForms;
