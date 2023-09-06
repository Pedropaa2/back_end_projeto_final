import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import "dotenv/config";

const settings = (): DataSourceOptions => {
   const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
   const migrationPath: string = path.join(
      __dirname,
      "./migrations/**.{ts,js}"
   );

   // src/data-source.ts
   // variáveis entitiesPath e migrationsPath
   const nodeEnv: string | undefined = process.env.NODE_ENV;

   if (nodeEnv === "production") {
      const databaseUrl = process.env.DATABASE_URL;
      if (!databaseUrl) {
         throw new Error("DATABASE_URL environment variable is not defined.");
      }
      return {
         type: "postgres",
         url: databaseUrl,
         entities: [entitiesPath],
         migrations: [migrationPath],
      };
   }
   // retorno da função

   const dbUrl: string | undefined = process.env.DATABASE_URL;

   if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

   return {
      type: "postgres",
      url: dbUrl,
      synchronize: false,
      logging: true,
      entities: [entitiesPath],
      migrations: [migrationPath],
   };
};

const AppDataSource = new DataSource(settings());

export { AppDataSource };
