import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
// Importamos Routes y Route además del MemoryRouter para definir el mapa de navegación
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Peliculas from "../pages/Peliculas";

describe("Actividad 8: Navegación al Detalle", () => {

  test("Al hacer clic en una película, debe navegar a la ruta de detalle", async () => {
    
    // -----------------------------------------------------------------------
    // 1. ARRANGE (Preparar)
    // -----------------------------------------------------------------------
    const user = userEvent.setup();

    // Aquí está la magia. Configuramos un sistema de rutas completo dentro del test.
    render(
      // initialEntries={["/"]} le dice al router: "Empieza en la página de inicio"
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          {/* RUTA 1: El listado de películas (Donde empieza el test) */}
          <Route path="/" element={<Peliculas />} />

          {/* RUTA 2: El destino.
              Fíjate en el 'path': debe coincidir con el formato que usas en tu Link:
              to={`/detalle/pelicula/${pelicula.id}`} -> path="/detalle/pelicula/:id"
              
              En lugar de cargar el componente 'Detail' real (que es complejo),
              ponemos un simple <h1> para verificar fácilmente que llegamos aquí. */}
          <Route 
            path="/detalle/pelicula/:id" 
            element={<h1 data-testid="titulo-detalle">Página de Detalle</h1>} 
          />
        </Routes>
      </MemoryRouter>
    );

    // -----------------------------------------------------------------------
    // 2. ACT (Actuar)
    // -----------------------------------------------------------------------
    
    // Paso A: Buscamos una película para clicar.
    // Buscamos "Pulp Fiction". Al ser un enlace (<a href...>), el rol es 'link'.
    // Usamos { name: ... } para ser específicos y no clicar cualquier cosa.
    // Nota: El 'name' del link suele ser todo el texto que contiene.
    // Como tu componente List renderiza el nombre dentro, buscar por el nombre funciona.
    const enlacePelicula = screen.getByRole("link", { name: /pulp fiction/i });

    // Paso B: Hacemos clic.
    await user.click(enlacePelicula);


    // -----------------------------------------------------------------------
    // 3. ASSERT (Afirmar)
    // -----------------------------------------------------------------------
    
    // Verificamos que hemos cambiado de "pantalla".
    
    // 1. Buscamos el elemento que pusimos en la Ruta 2 (el título falso).
    const tituloDetalle = screen.getByTestId("titulo-detalle");
    expect(tituloDetalle).toBeInTheDocument();
    
    // 2. Verificamos el texto para estar 100% seguros.
    expect(tituloDetalle).toHaveTextContent("Página de Detalle");

    // 3. Confirmamos que el listado de películas YA NO está en pantalla.
    // El título "Listado de películas" debería haber desaparecido.
    const tituloListado = screen.queryByText("Listado de películas");
    expect(tituloListado).not.toBeInTheDocument();
  });

});