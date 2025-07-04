



import { useEffect, useState } from "react";
import TodoForms from "./assets/todoforms";
import Profile from "./assets/profile";

interface Tarea {
  tareas: string;
  descripcion: string;
  realizada: boolean;
}

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("tareas");
    if (data) {
      setTareas(JSON.parse(data));
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h1>Gestor de Tareas</h1>
      <TodoForms tareas={tareas} setTareas={setTareas} />
      <hr />
     <Profile tareas={tareas} setTareas={setTareas} />


    </div>
  );
}

export default App;


