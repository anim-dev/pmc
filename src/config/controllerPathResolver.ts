import path from 'path';
import { readdir, access } from 'fs/promises';
import { pathToFileURL } from 'url';
import { Application } from 'express';
import { ControllerModule } from '../types/interface';
// import { catchBlockErrorLog } from '../utils/errorHelpers/catchBlockError';

const BASEPATH = path.resolve(__dirname, '..');
export const API_PATH = path.join(BASEPATH, 'api');

// Recursively scans for controller files
async function scanControllerFiles(dirPath: string, controllers: string[] = []): Promise<string[]> {
  try {
    const items = await readdir(dirPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);

      if (item.isDirectory()) {
        await scanControllerFiles(fullPath, controllers);
      } else if (item.isFile()) {
        const ext = path.extname(item.name);
        const baseName = path.basename(item.name, ext);

        if (
          (ext === '.ts' || ext === '.js') &&
          (baseName.includes('controller') || baseName.includes('Controller'))
        ) {
          controllers.push(fullPath);
        }
      }
    }

    return controllers;
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
    // await catchBlockErrorLog(error , 'scanControllerFiles')
    return controllers;
  }
}

// Calculates the route prefix based on controller file path
// function calculateRoutePrefix(controllerPath: string, basePath: string): string {
//   const relativePath = path.relative(basePath, path.dirname(controllerPath));
//   const pathParts = relativePath.split(path.sep).filter(
//     part => part && part !== 'controller' && part !== 'controllers'
//   );
//   return pathParts.length > 0 ? `/${pathParts.join('/')}` : '';
// }

// Calculates the route prefix based on controller file path
function calculateRoutePrefix(controllerPath: string, basePath: string): string {
  const relativePath = path.relative(basePath, path.dirname(controllerPath));
  const pathParts = relativePath.split(path.sep).filter(part => part);
  
  // Find the index of 'controller' directory
  const controllerIndex = pathParts.findIndex(part => 
    part === 'controller' || part === 'controllers'
  );
  
  // If 'controller' is found, take only parts before it
  const finalParts = controllerIndex !== -1 
    ? pathParts.slice(0, controllerIndex)  // Take parts before 'controller'
    : pathParts.filter(part => part !== 'controller' && part !== 'controllers');
  
  return finalParts.length > 0 ? `/${finalParts.join('/')}` : '';
}

// Loads and mounts a controller into the Express app
async function loadController(app: Application, controllerPath: string, basePath: string): Promise<void> {
  try {
    const fileUrl = pathToFileURL(controllerPath).href;
    const module: ControllerModule = await import(fileUrl);
    const routePrefix = calculateRoutePrefix(controllerPath, basePath);

    let router = module.default || module.router;

    if (!router) {
      for (const key of Object.keys(module)) {
        const candidate = module[key];
        if (typeof candidate === 'function' || (candidate && typeof candidate.use === 'function')) {
          router = candidate;
          break;
        }
      }
    }
    if (router) {
      app.use('/api' + routePrefix, router);
    } else {
      console.warn(`⚠️  No router found in controller: ${controllerPath}`);
    }
  } catch (error) {
    // await catchBlockErrorLog(error , 'loadController');
    console.error(`❌ Failed to load controller ${controllerPath}:`, error);
  }
}

// Entry point for resolving and loading all controllers
export const controllerPathResolver = async (app: Application): Promise<void> => {
  try {
    await access(API_PATH); // Ensure API directory exists
    const controllerFiles = await scanControllerFiles(API_PATH);

    if (controllerFiles.length === 0) {
      console.warn('⚠️  No controller files found in API directory');
      return;
    }

    await Promise.all(
      controllerFiles.map(controllerPath =>
        loadController(app, controllerPath, API_PATH)
      )
    );
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    // await catchBlockErrorLog(err , 'loadController')
    if (err.code === 'ENOENT') {
      console.error(`❌ API directory not found: ${API_PATH}`);
    } else {
      console.error('❌ Error during controller resolution:', error);
    }
  }
};
