import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom"; // Necesario porque Peliculas usa <Link>
import Peliculas from "../pages/Peliculas";

describe("Actividad 6: Buscador de Películas (Case Insensitive)", () => {

  test("Debe encontrar 'El sexto sentido' al buscar 'sexto' (minúsculas)", async () => {
    
    // -----------------------------------------------------------------------
    // 1. ARRANGE (Preparar)
    // -----------------------------------------------------------------------
    // Inicializamos el simulador de usuario (userEvent).
    const user = userEvent.setup();

    // Renderizamos el componente.
    // IMPORTANTE: Como Peliculas.jsx tiene componentes <Link to="...">, 
    // necesitamos envolverlo en <MemoryRouter>. Si no, el test fallará 
    // diciendo que no puede usar Link fuera de un Router.
    render(
      <MemoryRouter>
        <Peliculas />
      </MemoryRouter>
    );


    // -----------------------------------------------------------------------
    // 2. ACT (Actuar)
    // -----------------------------------------------------------------------
    
    // Paso A: Encontrar el Input.
    // Usamos el placeholder que definiste en Peliculas.jsx para localizarlo.
    // Es una buena práctica porque simula cómo un usuario busca el campo.
    const inputBusqueda = screen.getByPlaceholderText(/buscar películas por nombre/i);

    // Paso B: Escribir el término de búsqueda.
    // Escribimos "sexto" todo en minúsculas para probar que tu filtro (toLowerCase)
    // funciona correctamente aunque el título real tenga mayúsculas.
    await user.type(inputBusqueda, "sexto");


    // -----------------------------------------------------------------------
    // 3. ASSERT (Afirmar)
    // -----------------------------------------------------------------------
    
    // Verificación 1 (Positiva): La película correcta debe aparecer.
    // 'El sexto sentido' contiene la palabra "sexto", así que debe estar visible.
    const peliculaCorrecta = screen.getByText("El sexto sentido");
    expect(peliculaCorrecta).toBeInTheDocument();

    // Verificación 2 (Negativa): Las otras películas deben desaparecer.
    // Comprobamos que "Pulp Fiction" (que no tiene la palabra "sexto") NO está.
    
    // NOTA TÉCNICA: Usamos 'queryByText' en lugar de 'getByText' aquí.
    // - 'getByText': Lanza un ERROR si no encuentra el elemento (rompe el test).
    // - 'queryByText': Devuelve NULL si no lo encuentra (perfecto para comprobar ausencias).
    const peliculaIncorrecta = screen.queryByText("Pulp Fiction");
    expect(peliculaIncorrecta).not.toBeInTheDocument();
  });

});