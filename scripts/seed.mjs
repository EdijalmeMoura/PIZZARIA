import { seedIfEmpty, ensureDefaultUsers } from "../server/db.js";

seedIfEmpty();
ensureDefaultUsers();
console.log("Catálogo e contas de demonstração recriados.");
process.exit(0);
