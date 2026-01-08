import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import List from '../components/List'
import peliculas from '../data/peliculas'

describe('Actividad 1 — Componente de Lista', () => {
	test('muestra el nombre pasado por props y aplica class text-red-600 cuando nota es 10', () => {
		// Arrange: elegir una película real con nota 10
		const pelicula10 = peliculas.find(p => p.nota === 10)
		expect(pelicula10).toBeTruthy()

		const { nombre, cartelera, nota, resumen } = pelicula10
		const esNota10 = nota === 10

		// Renderizar con la API real del componente List
		render(<List nombre={nombre} foto={cartelera} esNota10={esNota10}>{resumen}</List>)

        
		// Assert
		const title = screen.getByText(nombre)
		expect(title).toBeInTheDocument()
		expect(esNota10).toBe(true)
		expect(title).toHaveClass('text-red-600')
	})
})