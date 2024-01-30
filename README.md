# Blogr Next.js Prisma

Blogr Next.js Prisma es una plataforma simple de blogs construida con Next.js y Prisma, que permite a los usuarios crear, ver, editar y eliminar entradas de blog.

## Características

- **Autenticación:** La autenticación de usuarios se implementa utilizando NextAuth.js, lo que permite a los usuarios registrarse, iniciar sesión y gestionar sus entradas de blog.
- **Crear entradas de blog:** Los usuarios autenticados pueden crear nuevas entradas de blog proporcionando un título y contenido.
- **Ver blogs:** Todos los usuarios, autenticados o no, pueden ver una lista de entradas de blog.
- **Editar y eliminar:** Los usuarios autenticados pueden editar y eliminar sus propias entradas de blog.
- **Modo sin conexión:** La aplicación proporciona soporte básico sin conexión, permitiendo a los usuarios ver entradas de blog descargadas previamente incluso sin conexión a Internet.

## Tecnologías utilizadas

- **Next.js:** Un marco de React para construir aplicaciones web.
- **Prisma:** Un kit de herramientas de base de datos moderno para Node.js y TypeScript.
- **NextAuth.js:** Una biblioteca de autenticación para aplicaciones Next.js.

## Configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/rayuken/blogr-nextjs-prisma.git
   ```

2. Instala las dependencias:

   ```bash
   cd blogr-nextjs-prisma
   npm install
   ```

3. Configura tu base de datos:

   - Actualiza los detalles de conexión de la base de datos en el archivo `.env`.
   - Ejecuta las migraciones de Prisma:
    (Nota estamos utilizando vercel - postgres para la base de datos pero puede ser independinete)
     ```bash
     npx prisma migrate dev
     ```
    comandos con vercel (ya haber realizado la instalacion y vercel link y descarga de .env)
    ```bash
     npx prisma db push
     ```
      ```bash
     npx prisma generate
     ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`.
