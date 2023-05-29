# Next.js OpenJira App
Para correr localmente, se necesita la base de datos

docker-compose up -d

* El -d, significa __detached__

* MongoDb URL local: 
```
mongodb://localhost:27017/entriesdb
```


## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## Instalar dependencias y levantar proyecto
```
npm install
npm run dev
```

## Llenar la base de datos con info de prueba

Request:
```
http://localhost:3000/api/seed
```