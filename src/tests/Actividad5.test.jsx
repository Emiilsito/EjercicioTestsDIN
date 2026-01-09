import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import FormularioPeliculaControlado from "../components/FormularioPeliculaControlado";

describe("Actividad 5: Reset de Formulario", () => {

  test("El campo nombre debe vaciarse tras un envío exitoso", async () => {
    
    // -----------------------------------------------------------------------
    // 1. ARRANGE (Preparar)
    // -----------------------------------------------------------------------
    const user = userEvent.setup();
    render(<FormularioPeliculaControlado />);

    // -----------------------------------------------------------------------
    // 2. ACT (Actuar)
    // -----------------------------------------------------------------------
    
    // Rellenamos TODOS los campos obligatorios. 
    // Si dejamos uno vacío, la validación falla y el reset NO ocurre.
    
    // Nombre
    const inputNombre = screen.getByLabelText(/nombre/i);
    await user.type(inputNombre, "Avatar");

    // Director
    const inputDirector = screen.getByLabelText(/director/i);
    await user.type(inputDirector, "James Cameron");

    // Clasificación
    const inputClasificacion = screen.getByLabelText(/clasificación/i);
    await user.type(inputClasificacion, "Ciencia Ficción");

    // Nota (Validación: entre 1 y 10)
    const inputNota = screen.getByLabelText(/nota/i);
    await user.type(inputNota, "8");

    // Cartelera (Validación: debe empezar por http)
    const inputCartelera = screen.getByLabelText(/cartelera/i);
    await user.type(inputCartelera, "http://imagen.com/avatar.jpg");

    // Ahora que todo está correcto, pulsamos Enviar
    const botonEnviar = screen.getByRole("button", { name: /añadir película/i });
    await user.click(botonEnviar);

    // -----------------------------------------------------------------------
    // 3. ASSERT (Afirmar)
    // -----------------------------------------------------------------------
    
    // Tu código hace setMovieData(initialMovieData) si todo va bien.
    // Comprobamos que el input de nombre ha vuelto a estar vacío.
    expect(inputNombre).toHaveValue("");
  });

});