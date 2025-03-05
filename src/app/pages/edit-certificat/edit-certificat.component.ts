import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificatService } from '../../services/certificat.service';
import { UtilisateurService } from '../../services/utilisateur.service';
import { TestService } from '../../services/test.service';
import { Certificat } from '../../models/certificat.model';
import { Utilisateur } from '../../models/utilisateur.model';
import { Test } from '../../models/test.model';

@Component({
  selector: 'app-edit-certificat',
  templateUrl: './edit-certificat.component.html',
  styleUrls: ['./edit-certificat.component.css']
})
export class EditCertificatComponent implements OnInit {
  certificat: Certificat = new Certificat();
  utilisateurs: Utilisateur[] = [];
  tests: Test[] = [];
  certificatId!: number;

  constructor(
    private certificatService: CertificatService,
    private utilisateurService: UtilisateurService,
    private testService: TestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.certificatId = Number(this.route.snapshot.paramMap.get('id'));
    
    // Récupérer le certificat à modifier
    this.certificatService.getById(this.certificatId).subscribe(
      (data) => {
        this.certificat = data;
      },
      (error) => {
        console.error('Erreur lors du chargement du certificat', error);
      }
    );

    // Charger les utilisateurs
    this.utilisateurService.getAll().subscribe(
      (data) => {
        this.utilisateurs = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
      }
    );

    // Charger les tests
    this.testService.getAllTests().subscribe(
      (data) => {
        this.tests = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des tests', error);
      }
    );
  }

  onSubmit(): void {
    this.certificatService.update(this.certificatId, this.certificat).subscribe(
      () => {
        console.log('Certificat mis à jour avec succès');
        this.router.navigate(['/certificats']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du certificat', error);
      }
    );
  }
}
