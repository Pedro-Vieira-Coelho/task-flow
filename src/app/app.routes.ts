import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inbox',
    pathMatch: 'full',
  },
  {
    path: 'inbox',
    loadComponent: () =>
      import('./pages/inbox/inbox.page').then((m) => m.InboxPage),
  },
  {
    path: 'inbox',
    loadComponent: () => import('./pages/inbox/inbox.page').then(m => m.InboxPage)
  },
  {
    path: 'criar-tarefa',
    loadComponent: () =>
      import('./pages/criar-tarefa/criar-tarefa.page').then(m => m.CriarTarefaPage),
  },
  {
    path: 'concluidas',
    loadComponent: () =>
      import('./pages/concluidas/concluidas.page').then(m => m.ConcluidasPage),
  },
  {
    path: 'editar-tarefa/:id',
    loadComponent: () => import('./pages/editar-tarefa/editar-tarefa.page').then(m => m.EditarTarefaPage)
  },
];
