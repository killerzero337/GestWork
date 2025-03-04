import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'parte-obra',
    loadComponent: () => import('./pages/parte-obra/parte-obra.page').then( m => m.ParteObraPage)
  },
  {
    path: 'obra',
    loadComponent: () => import('./pages/obra/obra.page').then( m => m.ObraPage)
  },
  {
    path: 'empleado',
    loadComponent: () => import('./pages/empleado/empleado.page').then( m => m.EmpleadoPage)
  },
];
