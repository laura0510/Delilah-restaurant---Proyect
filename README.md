# DELILAH RESTÓ
## Proyecto final DWFS - Acámica
El objetivo del proyecto es crear una API realizada con node.js para administrar pedidos de restaurante.
Esto incluye la creación de servidor, autenticación de usuarios y conexión con base de datos MYSQL.


### clonar el repositorio 
```bash
 git clone https://github.com/laura0510/Delilah-restaurant---Proyect

```

### Instalación del proyecto 

## instalación node modules

Realizar los siguientes pasos para inicializar la instalación de node en el proyecto

```bash
npm install
```

## configuración
1. Crear base de datos desde MYSQL
2. Ejecutar el servidor del puerto 3000
3. Crear tablas y sus relaciones, usando las **queries** existentes en el archivo Scripts/create database.sql
4. Crear "models" y "routes de usuario, producto y pedido.
5. verificar archivo en postman

## Instalación de base de datos
 Correr los siguientes scripts (usuarios, pedidos, productos) para crear la BD

 CREATE TABLE(
    id INT NOT NULL AUTO_INCREMENT,
)

## Correr la API 
```bash
node index.js
```
## Dependecias usadas
    "eslint-config-prettier": "^6.11.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "mysql2": "^2.1.0",
    "nodemon": "^2.0.3",
    "parser": "^0.1.4",
    "sequelize": "^5.21.7",



