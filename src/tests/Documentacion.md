# Informe de Testing - [Emilio Garcia Muñoz]
## Actividad [1]

* **Reto:** Comprobar que el componente List muestra el nombre de la pelicula pasado por props, y que si la pelicula tiene una nota de 10, el titulo aparece en rojo

* **Prompt IA:** A la IA le he pasado el contexto de el proyecto y le he dicho: 

Anatomía de un Test: El Patrón AAA
Todos los tests de las actividades seguirán este esquema:

Arrange (Preparar): Renderizamos el componente (usando render y, si es
necesario, MemoryRouter).
Act (Actuar): Si es necesario, simulamos la interacción del usuario (escribir,
clicar) usando user-event.
Assert (Afirmar): Comprobamos que el resultado es el esperado (usando
expect).
teniendo esto en cuenta, haz lo siguiente explicandolo

Actividad 1 — Componente de Lista

Comprueba que el componente List muestra correctamente el nombre pasado por props y que, si la película tiene una nota de 10, el título aparece en color rojo (clase text-red-600).


* **Explicación del Test:** Con el arrange selecciona la pelicula con nota 10 desde el array y la renderiza usando render(), con el assert usa la funcion getByText() con el nombre para ver donde esta el titulo que se muestra y con ese titulo comprueba que esta en el documento y que el elemento tiene el texto en rojo cuando la nota es 10.

> ![Imagen de prueba ejercicio 1](image.png)

## Actividad [2]

* **Reto:** Verificar que List renderiza correctamente el contenido que se le pasa por children, comprobando si la imagen tiene un alternativo correcto basado en el nombre del interprete o la pelicula.

* **Prompt IA:** La IA ya sabe el contexto del proyecto y le he dicho lo siguiente: 

Ahora que sabes como es mi proyecto, haz el siguiente test paso a paso y comentandolo para entenderlo:

Actividad 2: Texto Dinámico y Accesibilidad

Verifica que el componente List renderiza correctamente el contenido que se le pasa a través de children (recuerda que se usa para la clasificación o biografía) y comprueba que la imagen tiene el atributo alt correcto basado en el nombre del intérprete o de la película.


* **Explicación del Test:** Con el arrange selecciona una pelicula real del array, obtiene el nombre la cartelera y la clasificación/resumen y luego los renderiza, con el Assert localiza el texto pasado por children y solo busca el elemento <p> para evitar que coincida con el figcaption usando la funcion getByText() y comprueba que existe y esta visible, luego localiza la imagen con getByAltText() y comprueba que existe y tiene los atributos alt correctos y src apunta a la URL esperada.

Las funciones son las siguientes:

expect(...).toBeInTheDocument(): Comprueba que el elemento existe en el DOM de la prueba.

expect(...).toBeVisible(): Verifica que el elemento es visible para el usuario.

expect(...).toHaveAttribute(): Comprueba que el elemento tiene el atributo y el valor que le pasamos.

> ![Imagen de prueba del ejercicio 2](Actividad2Test.png)