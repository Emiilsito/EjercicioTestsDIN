import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Peliculas from "../pages/Peliculas";

describe("Actividad 7: Mensaje de 'No resultados'", () => {

  test("Debe mostrar un mensaje indicando que no hay coincidencias para 'Iron Man'", async () => {
    
    // 1. ARRANGE
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Peliculas />
      </MemoryRouter>
    );

    // 2. ACT
    const inputBusqueda = screen.getByPlaceholderText(/buscar películas por nombre/i);
    const terminoBusqueda = "Iron Man";
    await user.type(inputBusqueda, terminoBusqueda);

    // 3. ASSERT
    
    // A. Verificamos el mensaje de error (Usando Regex como vimos antes)
    const mensajeError = screen.getByText(/No se encontraron películas con el término.*Iron Man/i);
    expect(mensajeError).toBeInTheDocument();

    // En lugar de buscar "headings" genéricos (que confundían con el título de la página),
    // comprobamos explícitamente que una película que SÍ existía (El sexto sentido)
    // ahora ha desaparecido debido al filtro.
    const peliculaFiltrada = screen.queryByText(/El sexto sentido/i);
    
    // Esperamos que NO esté en el documento
    expect(peliculaFiltrada).not.toBeInTheDocument();
  });

});