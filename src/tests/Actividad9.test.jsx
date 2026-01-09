import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Detail from "../components/Detail";

describe("Actividad 9: Parámetros de Ruta en Detail.jsx", () => {

  test("Debe mostrar 'El silencio de los corderos' al acceder a la ruta con ID 4", () => {
    
    // 1. ARRANGE & 2. ACT
    render(
      <MemoryRouter initialEntries={["/detalle/pelicula/4"]}>
        <Routes>
          <Route path="/detalle/pelicula/:idPeli" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    // 3. ASSERT
    
    // Verificación 1: Título Principal
    const tituloPelicula = screen.getByRole("heading", { 
      name: /el silencio de los corderos/i,
      level: 1 
    });
    expect(tituloPelicula).toBeInTheDocument();

    // Verificación 2: El Resumen (CORREGIDO PARA SER ÚNICO)
    // Buscamos "La agente del FBI", que solo aparece en el resumen principal
    // y no en la biografía de los actores.
    const resumenUnico = screen.getByText(/La agente del FBI/i); 
    expect(resumenUnico).toBeInTheDocument();
    
    // Verificación 3: Negativa
    const textoErroneo = screen.queryByText(/Forrest Gump/i);
    expect(textoErroneo).not.toBeInTheDocument();
  });

});