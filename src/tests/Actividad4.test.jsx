import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // 1. Importamos la librería
import { describe, test, expect } from "vitest";
import FormularioInterprete from "../components/FormularioInterprete";

describe("Actividad 4: Validación de longitud de biografía", () => {
  
  // 2. La función del test debe ser ASYNC porque user-event es asíncrono
  test("Debe mostrar error si la biografía tiene menos de 50 caracteres", async () => {
    
    // -----------------------------------------------------------------------
    // 1. ARRANGE (Preparar)
    // -----------------------------------------------------------------------
    // Inicializamos el simulador de usuario antes de renderizar.
    const user = userEvent.setup();
    render(<FormularioInterprete />);


    // -----------------------------------------------------------------------
    // 2. ACT (Actuar)
    // -----------------------------------------------------------------------
    
    // Paso A: Buscamos el campo "Biografía".
    const inputBiografia = screen.getByLabelText(/biografía/i);

    // Paso B: El usuario escribe texto corto. 
    // Usamos 'await user.type' que simula teclear carácter a carácter.
    await user.type(inputBiografia, "Texto demasiado corto.");

    // Paso C: El usuario hace clic en el botón de enviar.
    const botonEnviar = screen.getByRole("button", { name: /añadir intérprete/i });
    
    // Usamos 'await user.click' para simular el clic real del ratón.
    await user.click(botonEnviar);


    // -----------------------------------------------------------------------
    // 3. ASSERT (Afirmar)
    // -----------------------------------------------------------------------
    
    // Comprobamos que aparece el mensaje de error específico.
    // Usamos una expresión regular parcial para no tener que copiar todo el texto exacto si cambia un poco.
    const mensajeError = screen.getByText(/La biografía debe tener al menos 50 caracteres/i);
    
    expect(mensajeError).toBeInTheDocument();
    
  });

});