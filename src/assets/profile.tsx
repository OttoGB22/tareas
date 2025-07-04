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

const Profile: React.FC<Props> = ({ tareas, setTareas }) => {
  const [filtro, setFiltro] = useState<"todas" | "realizadas" | "pendientes">("todas");

  // ✅ Cambia el estado de realizada
  const toggleRealizada = (index: number) => {
    const nuevas = [...tareas];
    nuevas[index].realizada = !nuevas[index].realizada;
    setTareas(nuevas);
    localStorage.setItem("tareas", JSON.stringify(nuevas));
  };

  const eliminarTarea = (index: number) => {
    const nuevas = tareas.filter((_, i) => i !== index);
    setTareas(nuevas);
    localStorage.setItem("tareas", JSON.stringify(nuevas));
  };

  const editarTarea = (index: number) => {
    const t = tareas[index];
    const nuevoNombre = prompt("Editar tarea:", t.tareas);
    const nuevaDescripcion = prompt("Editar descripción:", t.descripcion);
    if (nuevoNombre && nuevaDescripcion) {
      const nuevas = [...tareas];
      nuevas[index] = { ...nuevas[index], tareas: nuevoNombre, descripcion: nuevaDescripcion };
      setTareas(nuevas);
      localStorage.setItem("tareas", JSON.stringify(nuevas));
    }
  };

  // 🎯 Filtrar tareas según el estado
  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === "todas") return true;
    if (filtro === "realizadas") return t.realizada;
    if (filtro === "pendientes") return !t.realizada;
    return true;
  });

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Lista de Tareas</h2>

      {/* 🔘 Filtro */}
      <select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value as any)}
        style={{
          padding: "6px",
          marginBottom: "15px",
          borderRadius: "6px",
          fontSize: "14px",
        }}
      >
        <option value="todas">Todas</option>
        <option value="realizadas">Realizadas</option>
        <option value="pendientes">Pendientes</option>
      </select>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {tareasFiltradas.map((tarea, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: tarea.realizada ? "#d4edda" : "#f8d7da",
            }}
          >
            <input
              type="checkbox"
              checked={tarea.realizada}
              onChange={() => toggleRealizada(index)}
              style={{ marginRight: "10px" }}
            />
            <strong>{tarea.tareas}</strong>: {tarea.descripcion}

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => editarTarea(index)}
                style={{
                  backgroundColor: "#FFC107",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Editar
              </button>
              <button
                onClick={() => eliminarTarea(index)}
                style={{
                  backgroundColor: "#F44336",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;

