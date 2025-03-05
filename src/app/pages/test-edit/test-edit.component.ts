import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.css']
})
export class TestEditComponent implements OnInit {
  testForm: FormGroup;
  testId: number;

  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du test depuis les paramètres de l'URL
    this.testId = +this.route.snapshot.paramMap.get('id');
    
    // Initialiser le formulaire
    this.testForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      duration: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      niveau: ['', Validators.required]
    });

    // Charger les données existantes du test à modifier
    this.loadTest();
  }

  // Charger le test existant
  loadTest(): void {
    this.testService.getTestById(this.testId).subscribe(
      (test) => {
        // Remplir le formulaire avec les données du test
        this.testForm.patchValue({
          titre: test.titre,
          description: test.description,
          duration: test.duration,
          niveau: test.niveau
        });
      },
      (error) => {
        console.error('Erreur lors du chargement du test', error);
      }
    );
  }

  // Soumettre le formulaire pour modifier le test
  updateTest(): void {
    if (this.testForm.invalid) {
      return;
    }

    this.testService.updateTest(this.testId, this.testForm.value).subscribe(
      (data) => {
        console.log('Test modifié', data);
        alert('Test modifié avec succès !');
        this.router.navigate(['/tests']); // Redirige vers la liste des tests
      },
      (error) => {
        console.error('Erreur lors de la modification du test', error);
      }
    );
  }

  // Accéder aux contrôles de formulaire pour l'affichage des erreurs
  get formControls() {
    return this.testForm.controls;
  }
}
