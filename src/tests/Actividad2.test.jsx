import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import List from '../components/List'
import peliculas from '../data/peliculas'

// Actividad 2: Texto Dinámico y Accesibilidad
// Verificamos que List renderiza correctamente el contenido pasado como children
// y que la imagen incluye el atributo alt basado en el nombre.

describe('Actividad 2 — Texto Dinámico y Accesibilidad', () => {
	test('renderiza children (clasificación/resumen) y la imagen tiene alt correcto', () => {
		// Arrange: seleccionar una película real del dataset
		const pelicula = peliculas[0] // 'El sexto sentido'
		const { nombre, cartelera, clasificacion, resumen } = pelicula

		// Elegimos usar la clasificación como contenido pasado en children
		const contenidoChildren = clasificacion || resumen || 'Contenido de prueba'

		// Renderizamos el componente con la API real: nombre, foto y children
		render(<List nombre={nombre} foto={cartelera}>{contenidoChildren}</List>)

		// Assert:
		// 1) El texto pasado en children se muestra en el documento
		// (Restringimos la búsqueda al párrafo visible para evitar coincidencias múltiples
		//  que vienen de la etiqueta figcaption con clase sr-only.)
		const parrafo = screen.getByText(contenidoChildren, { selector: 'p' })
		expect(parrafo).toBeInTheDocument()
		expect(parrafo).toBeVisible()

		// 2) La imagen tiene el atributo alt correcto (accesibilidad)
		// getByAltText localiza la imagen por su texto alternativo
		const imagen = screen.getByAltText(`Foto de ${nombre}`)
		expect(imagen).toBeInTheDocument()
		expect(imagen).toHaveAttribute('alt', `Foto de ${nombre}`)

		// 3) (Opcional) comprobar que la imagen apunta a la URL esperada
		// esto verifica que la prop foto se ha aplicado al src
		expect(imagen).toHaveAttribute('src', cartelera)
	})
})