import { Application, Router } from "express";

/* * Log Routes
 * Este modulo foi ajustado por IA apenas para ajudar no desenvolvimento
 * e na documentação do projeto.
 * Ele registra e loga as rotas do Express, permitindo visualizar
 * todas as rotas registradas, seus métodos HTTP e caminhos completos
 * diretamente no terminal.
 */

// Array para armazenar as rotas registradas
let registeredRoutes: Array<{
  method: string;
  path: string;
  fullPath: string;
}> = [];

// Cores para o terminal
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  dim: "\x1b[2m",
};

// Cores para cada método HTTP
const methodColors = {
  GET: colors.green,
  POST: colors.yellow,
  PUT: colors.blue,
  PATCH: colors.magenta,
  DELETE: colors.red,
  HEAD: colors.cyan,
  OPTIONS: colors.dim,
};

// Função para registrar uma rota
export const registerRoute = (
  method: string,
  path: string,
  basePath: string = ""
) => {
  const fullPath = basePath ? `${basePath}${path}` : path;
  registeredRoutes.push({ method: method.toUpperCase(), path, fullPath });
};

// Função para limpar as rotas registradas
export const clearRoutes = () => {
  registeredRoutes = [];
};

// Função para interceptar o registro de rotas em um router
export const wrapRouter = (router: Router, basePath: string = "") => {
  const originalMethods = [
    "get",
    "post",
    "put",
    "patch",
    "delete",
    "head",
    "options",
  ];

  originalMethods.forEach((method) => {
    const originalMethod = (router as any)[method].bind(router);
    (router as any)[method] = (path: string, ...handlers: any[]) => {
      registerRoute(method, path, basePath);
      return originalMethod(path, ...handlers);
    };
  });

  return router;
};

// Função para obter emoji baseado no método HTTP
const getMethodEmoji = (method: string): string => {
  const emojiMap: { [key: string]: string } = {
    GET: "📥",
    POST: "📤",
    PUT: "🔄",
    PATCH: "✏️",
    DELETE: "🗑️",
    HEAD: "👁️",
    OPTIONS: "⚙️",
  };
  return emojiMap[method] || "🔗";
};

// Função para logar as rotas
export const logRoutes = (app: Application) => {
  console.log(
    `\n${colors.bold}${colors.green}🚀 [Express] Routes mapped:${colors.reset}`
  );
  console.log(`${colors.dim}${"─".repeat(50)}${colors.reset}`);

  if (registeredRoutes.length === 0) {
    console.log(
      `${colors.bold}${colors.green}[Express]${colors.reset} ${colors.dim}❌ No routes found${colors.reset}`
    );
    return;
  }

  registeredRoutes.forEach((route) => {
    const methodColor =
      methodColors[route.method as keyof typeof methodColors] || colors.dim;
    const method = `${methodColor}${route.method.padEnd(6)}${colors.reset}`;
    const emoji = getMethodEmoji(route.method);
    console.log(
      `${colors.bold}${colors.green}[Express]${colors.reset} ${emoji} ${method} ${colors.cyan}${route.fullPath}${colors.reset}`
    );
  });

  console.log(`${colors.dim}${"─".repeat(50)}${colors.reset}`);
  console.log(
    `${colors.bold}${colors.green}✅ [Express]${colors.reset} ${colors.dim}Successfully mapped ${colors.bold}${registeredRoutes.length}${colors.reset}${colors.dim} routes${colors.reset}\n`
  );
};
