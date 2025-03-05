import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TestComponent } from './pages/test/test.component';
import { TestDetailComponent } from './pages/test-detail/test-detail.component';
import { TestEditComponent } from './pages/test-edit/test-edit.component';
import { TestAddComponent } from './pages/test-add/test-add.component';
import { CertificatsComponent } from './pages/certificats/certificats.component';
import { AddCertificatComponent } from './pages/add-certificat/add-certificat.component';
import { EditCertificatComponent } from './pages/edit-certificat/edit-certificat.component';  // Importation du composant
export const AppRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/admin-layout/admin-layout.module').then(
            (x) => x.AdminLayoutModule
          ),
      },
      { path: 'tests', component: TestComponent },
      { path: 'tests/:id', component: TestDetailComponent }, // Page pour voir un test
      { path: 'edit-test/:id', component: TestEditComponent }, // Page pour modifier un test
      { path: 'add-test', component: TestAddComponent },  // Route pour l'ajout de test
      { path: 'certificats', component: CertificatsComponent },
      { path: 'add-certificat', component: AddCertificatComponent },
      { path: 'edit-certificat/:id', component: EditCertificatComponent },  // Route pour la modification du certificat
      { path: '', redirectTo: '/certificats', pathMatch: 'full' }
    ],
  },

  { path: '**', redirectTo: 'dashboard' }, // Catch-all pour éviter les erreurs
];
