import { describe, test, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hola from '../Hola'

describe("Componente Hola", () => {
    test('muestra el nombre correctamente', () => {
        render(<Hola nombre="Emilio" />)
        expect(screen.getByText('Hola Emilio')).toBeInTheDocument()
    })
    it('no muestra el nombre correctamente', () => {
        render(<Hola nombre="Emilioo" />)
        expect(screen.getByText('Hola Emilio')).toBeInTheDocument()
    })
});