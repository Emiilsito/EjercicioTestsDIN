import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import FormularioPeliculaNoControlado from "../components/FormularioPeliculaNoControlado";

describe("Actividad 10: Captura de Datos con Refs (No Controlado)", () => {

  test("Los errores de validación NO deben aparecer al escribir, SOLO al enviar", async () => {
    
    // -----------------------------------------------------------------------
    // 1. ARRANGE (Preparar)
    // -----------------------------------------------------------------------
    const user = userEvent.setup();
    render(<FormularioPeliculaNoControlado />);

    // -----------------------------------------------------------------------
    // 2. ACT - Parte 1 (Interacción sin Enviar)
    // -----------------------------------------------------------------------
    
    // Vamos a interactuar con el formulario, pero SIN enviar todavía.
    // Dejamos el campo "Nombre" vacío intencionadamente (que es obligatorio).
    // Escribimos en "Director" para demostrar que escribir no dispara validaciones.
    
    const inputDirector = screen.getByLabelText(/director/i);
    await user.type(inputDirector, "Steven Spielberg");

    // -----------------------------------------------------------------------
    // 3. ASSERT - Parte 1 (Verificar que NO hay error aún)
    // -----------------------------------------------------------------------
    
    // Aquí está la clave del formulario NO CONTROLADO.
    // Aunque el campo "Nombre" está vacío y es obligatorio, como usamos Refs,
    // la validación no se ha ejecutado todavía.
    
    const mensajeErrorNombre = screen.queryByText("El nombre es obligatorio.");
    
    // Esperamos que el mensaje NO esté en el documento.
    // Usamos 'queryByText' porque si usáramos 'getByText' y no existe, el test fallaría aquí.
    expect(mensajeErrorNombre).not.toBeInTheDocument();


    // -----------------------------------------------------------------------
    // 4. ACT - Parte 2 (Enviar el formulario)
    // -----------------------------------------------------------------------
    
    // Ahora sí, hacemos clic en el botón de enviar.
    // Esto ejecutará la función 'handleMovieSubmit', leerá los Refs y validará.
    const botonEnviar = screen.getByRole("button", { name: /añadir película/i });
    await user.click(botonEnviar);


    // -----------------------------------------------------------------------
    // 5. ASSERT - Parte 2 (Verificar que AHORA SÍ hay error)
    // -----------------------------------------------------------------------
    
    // Ahora que hemos pulsado enviar, la validación manual se ha disparado,
    // ha detectado que el ref del nombre estaba vacío y ha actualizado el estado de errores.
    
    // Ahora usamos 'getByText' porque esperamos que sí o sí esté el error.
    expect(screen.getByText("El nombre es obligatorio.")).toBeInTheDocument();
  });

});