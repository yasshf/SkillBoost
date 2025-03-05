import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificatService } from '../../services/certificat.service';
import { UtilisateurService } from '../../services/utilisateur.service';
import { TestService } from '../../services/test.service';
import { Certificat } from '../../models/certificat.model';
import { Test } from '../../models/test.model';
import { Utilisateur } from '../../models/utilisateur.model';

@Component({
  selector: 'app-add-certificat',
  templateUrl: './add-certificat.component.html',
  styleUrls: ['./add-certificat.component.css']
})
export class AddCertificatComponent implements OnInit {
  addCertificatForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  tests: Test[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private certificatService: CertificatService,
    private utilisateurService: UtilisateurService,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addCertificatForm = this.formBuilder.group({
      nom: ['', Validators.required],
      dateObtention: ['', Validators.required],
      scoreObtenu: ['', [Validators.required, Validators.min(0)]],
      scoreMin: ['', [Validators.required, Validators.min(0)]],
      utilisateurId: ['', Validators.required],
      testId: ['', Validators.required]
    });

    this.utilisateurService.getAll().subscribe(
      data => { this.utilisateurs = data; },
      error => console.error('Erreur lors de la récupération des utilisateurs:', error)
    );

    this.testService.getAllTests().subscribe(
      data => { this.tests = data; },
      error => console.error('Erreur lors de la récupération des tests:', error)
    );
  }

  onSubmit(): void {
    if (this.addCertificatForm.invalid) return;

    const certificat: Certificat = {
      id: null,
      nom: this.addCertificatForm.value.nom,
      dateObtention: new Date(this.addCertificatForm.value.dateObtention),
      scoreObtenu: this.addCertificatForm.value.scoreObtenu,
      scoreMin: this.addCertificatForm.value.scoreMin,
      utilisateur: { id: Number(this.addCertificatForm.value.utilisateurId) } as Utilisateur,
      test: { id: Number(this.addCertificatForm.value.testId) } as Test
    };

    this.certificatService.create(certificat).subscribe(
      () => this.router.navigate(['/certificats']),
      error => console.error('Erreur lors de la création du certificat', error)
    );
  }
}
