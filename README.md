# Chat React 

![Version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=gh&type=6&v=2.0.0&x2=0)

Chat React es un proyecto de código abierto basado en el concepto de Web Components, desarrollado con React y Redux. 

El proyecto fue creado basándose en el patrón de diseño Master-Detail y enfocándose en la usabilidad, extensibilidad y reusabilidad de la aplicación.

El nivel de detalle, la utilización de patrones como Gestalt y Proximidad, los conceptos Responsive Web Design y el énfasis en la usabilidad buscan bridnar una experiencia de usuario amigable y eficaz, minimizando la curva de aprendizaje del sitio.

## Jerarquía de Componentes
```
.
├── Home
│   ├── ChatList
│   │   ├── HeaderUser
│   │   └── UsersList
│   │
│   └── ChatMessages
│       ├── HeaderUser
│       ├── MessageBody
│       └── MessageReply
│   
└── Login
```
### Catálogo de Elementos

#### Home
Componente central de la aplicación. Maneja el ciclo de vida de los componentes de Lista de Usuarios y Lista de Mensajes.

#### ChatList
Componente que se visualiza en el parante izquierdo de la aplicación web. Contiene la Lista de Usuarios y el cabezal con información del usuario logueado.

#### HeaderUser
Componente que visualiza información básica del usuario logueado.

#### UsersList
Componente que muestra la lista de usuarios registrados en el sistema. Este componente existe en la parte "web", en la parte "móvil" y su lógica se ubica en un tercer componente compartido entre ambos.

#### ChatMessages
Componente que visualiza una conversación entre 2 usuarios del sistema.

#### HeaderUser
Componente que muestra información básica del usuario con el cual nos encontramos conversando. Tiene una parte presentacional "web", una "móvil" y la lógica está en un tercer componente compartido entre ambos.

#### MessageBody
Componente que muestra los mensajes enviados y recibidos en la conversación en la que estamos. Tiene una parte presentacional "web", una "móvil" y la lógica está en un tercer componente compartido entre ambos.

#### MessageReply
Componente para enviar los mensajes. Contiene un cuadro de texto, opciones de cámara, emoticones y un botón para enviar. Tiene una parte presentacional "web", una "móvil" y la lógica está en un tercer componente compartido entre ambos.

#### Login
Componente encargado del manejo de usuarios nuevos y usuarios existentes. Tiene una parte presentacional "web", una "móvil" y la lógica está en un tercer componente compartido entre ambos.

## Store Redux

```
└── messages
    ├── idUserFrom
    └── idUserTo
```

## Componentes de terceros utilizados


* [MicroLink](https://docs.microlink.io/sdk/getting-started/react/)
* [ReactStrop](https://reactstrap.github.io/)
* [emoji-picker-react](https://github.com/ealush/emoji-picker-react)
* [GraphQL](https://graphql.org/learn/)
* [react-apollo](https://github.com/apollographql/react-apollo)
* [Redux](https://redux.js.org/introduction)
* [GL React](https://github.com/gre/gl-react)
* [React-Bootstrap](https://react-bootstrap.github.io/)

## Instalación Aplicación Web

```
$ npm install
```

```
$ npm start
```

## Instalación Aplicación Móvil

```
$ npm install
```

```
$ npm run start-expo
```

## Fallas reportadas
La aplicación móvil no se llegó a implementar en su totalidad, faltando la funcionalidad de estadísticas, y con algunas fallas como:

En el caso de las imágenes, si las mismas tiene una gran resolución, la base de datos no la admite y arroja un error.

En el caso de los emoticones, la compatibilidad de la librería de emoticones no funcionó y no pudo ser solucionado a tiempo.



## Autores

* [Gastón Donadío](https://bitbucket.org/tonga654)
* [Emiliano Rodríguez](https://bitbucket.org/Emirona07).

## Licencia

[MIT](https://tldrlegal.com/license/mit-license)