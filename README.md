# CRUD POST APP

Esta aplicación es una prueba de evaluación para el desarrollo frontend utilizando React, TypeScript, Redux Toolkit, RTK Query, y i18next. La aplicación permite a los usuarios gestionar posts (crear, leer, actualizar y eliminar), visualizar comentarios y ver una gráfica con el número de posts y comentarios por usuario.

## PRUEBAS

Consideraciones Especiales.

Autenticación Simulada: La autenticación está simulada utilizando Redux Toolkit y no hay un backend real implementado. Los datos del usuario se obtienen de la API de jsonplaceholder.

Por lo que para iniciar sesión se debe usar algún usuario de los que proporciona jsonplacholder, la contraseña puede ser cualquier caracter o cadena de texto.

Lista de usuarios : [
"username": "Bret",
"username": "Antonette",
"username": "Samantha",
"username": "Karianne",
"username": "Kamren",
"username": "Leopoldo_Corkery",
"username": "Elwyn.Skiles",
"username": "Maxime_Nienow",
"username": "Delphine",
"username": "Moriah.Stanton",
]

Por si hubiera problemas con la instalación del proyecto, se ha desplegado el mismo en esta web.

https://frontendassesment.franciscomunozmontoro.com/

## Instalación

Clona el repositorio:

### `git clone https://github.com/DarkPhalamos/FrontEndAssesmentMunozMontoroFrancisco.git`

### `cd frontendidricaassessment `

Instala las dependencias del proyecto:

### `npm install`

# EJECUCION

Desarrollador

Para iniciar el entorno de desarrollo:

### `npm start`

Esto abrirá la aplicación en http://localhost:3000 u otro puerto si el 3000 se encuentra ocupado.

# PRUEBAS

Este proyecto incluye pruebas end-to-end utilizando Cypress. Para ejecutar las pruebas:

Inicia el servidor de desarrollo:

### `npm start`

En otra terminal, ejecuta las pruebas:

Si es la primera vez que usamos cypress deberemos ejecutar

### `npx cypress install`

Si no, podemos ejecutar.

### `npx cypress run --spec "cypress/e2e/allTests.cy.ts"`

Si queremos usar la interfaz grafica de cypress podemos ejecturar.

### `npx cypress open`

Se nos abrirá la interfaz gráfica de cypress, seleccionamos E2E testing, seleccionamos Chrome como navegador. En la barra de navegación, si nos vamos al apartado "Specs" nos aparecen todos los tests disponibles. Si queremos lanzarlos todos a la vez, lanzamos el spec "allTest.cy.ts"
