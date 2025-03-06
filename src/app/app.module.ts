import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// Import your custom modules
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { NgxPaginationModule } from 'ngx-pagination';

// Import your components
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TestComponent } from './pages/test/test.component';
import { CertificatsComponent } from './pages/certificats/certificats.component';
import { TestDetailComponent } from './pages/test-detail/test-detail.component';
import { TestEditComponent } from './pages/test-edit/test-edit.component';
import { TestService } from './services/test.service';
import { TestAddComponent } from './pages/test-add/test-add.component';
import { AddCertificatComponent } from './pages/add-certificat/add-certificat.component';
import { CertificatService } from './services/certificat.service';
import { UtilisateurService } from './services/utilisateur.service';
import { EditCertificatComponent } from './pages/edit-certificat/edit-certificat.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    TestComponent,
    CertificatsComponent,
    TestDetailComponent,
    TestEditComponent,
    TestAddComponent,
    AddCertificatComponent,
    EditCertificatComponent
  ],
  imports: [
    BrowserAnimationsModule, // Necessary for animation support
    RouterModule.forRoot(AppRoutes, { useHash: true }), // Routing configuration
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    NgxPaginationModule,
    HttpClientModule, // HTTP requests
    ToastrModule.forRoot() // For Toastr notifications
  ],
  providers: [TestService,CertificatService,UtilisateurService],
  bootstrap: [AppComponent] // Bootstraps the main AppComponent
})
export class AppModule { }
