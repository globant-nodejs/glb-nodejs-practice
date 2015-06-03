# Globant NodeJS practice project

El objetivo es armar una API para poder mostrar los respositorios de un usuario y su información en la aplicacion frontend especificada en [glb-angularjs-practice](https://github.com/lfantone/glb-angularjs-practice)

## Server side (API)

### Implementar los siguientes endpoints:
* obtener los repositorios de un usuario
* obtener la informacion de un repositorio del usuario
* obtener el listado de commits de un repositorio
* obtener la informacion de un commit especifico dentro de un repositorio
* obtener el listado de pull request de un repositorio
* obtener la informacion de una pull request especifica dentro de un repositorio

### Criterios de aceptación:
* todos los endpoints deben devolver un HAL+JSON y deben contener toda la informacion que devuelve github
* todos los endpoints deben tener tests donde se verifiquen los casos de exito y de falla (considerar tambien los casos en que no se pueda establecer una conexion con la api github)
* Los test se deben ejecutar con grunt

### Toolsg
* NodeJs
* Express
* Hal
* grunt como task runner

No hay limitaciones en cuanto a la utilizacion de herramientas, librerias o plugins adicionales.
