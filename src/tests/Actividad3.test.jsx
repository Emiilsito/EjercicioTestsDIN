// src/tests/FormularioPeliculaControlado.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import FormularioPeliculaControlado from "../components/FormularioPeliculaControlado";

describe("Actividad 3: Validación de formulario", () => {
  
  test("Debe mostrar el mensaje de error si se intenta enviar con el nombre vacío", async () => {
    
    // 1. Arrange (Preparar)
    // Inicializamos el simulador de usuario y renderizamos el componente.
    const user = userEvent.setup();
    render(<FormularioPeliculaControlado />);

    // 2. Act (Actuar)
    // El usuario localiza el botón y hace clic en él sin haber escrito nada.
    const botonEnviar = screen.getByRole("button", { name: /añadir película/i });
    
    // Usamos await porque las interacciones de user-event son asíncronas
    await user.click(botonEnviar);

    // 3. Assert (Afirmar)
    // Comprobamos que el texto de error esperado aparece en el documento.
    const mensajeError = screen.getByText("El nombre es obligatorio.");
    expect(mensajeError).toBeInTheDocument();
  });

});