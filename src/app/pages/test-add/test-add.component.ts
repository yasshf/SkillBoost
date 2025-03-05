import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.css']
})
export class TestAddComponent implements OnInit {
  testForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Création du formulaire avec des validations
    this.testForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]], // Titre requis, au moins 3 caractères
      description: ['', [Validators.required, Validators.minLength(10)]], // Description requise, au moins 10 caractères
      duration: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Durée requise, nombre entier
      niveau: ['', Validators.required] // Niveau requis
    });
  }

  // Accéder aux contrôles de formulaire pour l'affichage des erreurs
  get formControls() {
    return this.testForm.controls;
  }

  // Fonction d'envoi du formulaire
  addTest(): void {
    if (this.testForm.invalid) {
      return; // Ne pas soumettre le formulaire si invalide
    }

    this.testService.createTest(this.testForm.value).subscribe(
      (data) => {
        console.log('Test ajouté', data);
        alert('Test ajouté avec succès !');
        this.router.navigate(['/tests']); // Redirige vers la liste des tests
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du test', error);
      }
    );
  }
}
