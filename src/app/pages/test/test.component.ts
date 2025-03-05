import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  tests: any[] = [];
  filteredTests: any[] = [];
  searchTerm: string = '';
  searchType: string = 'titre'; // Par défaut, recherche par titre
  niveauStats: any = { debutant: 0, intermediaire: 0, avance: 0 };

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests() {
    this.testService.getAllTests().subscribe(
      (data) => {
        this.tests = data;
        this.filteredTests = data;
        this.calculateNiveauStats();
      },
      (error) => {
        console.error('Erreur lors du chargement des tests', error);
      }
    );
  }

  calculateNiveauStats() {
    this.niveauStats = { debutant: 0, intermediaire: 0, avance: 0 };

    this.tests.forEach(test => {
      if (test.niveau === 'Débutant') {
        this.niveauStats.debutant++;
      } else if (test.niveau === 'Intermédiaire') {
        this.niveauStats.intermediaire++;
      } else if (test.niveau === 'Avancé') {
        this.niveauStats.avance++;
      }
    });
  }

  searchTests() {
    if (!this.searchTerm.trim()) {
      this.filteredTests = this.tests;
      return;
    }

    this.filteredTests = this.tests.filter(test => {
      if (this.searchType === 'id') {
        return test.id.toString().includes(this.searchTerm.trim());
      } else {
        return test.titre.toLowerCase().includes(this.searchTerm.toLowerCase().trim());
      }
    });
  }

  viewTest(id: number) {
    this.router.navigate(['/tests', id]);
  }

  editTest(id: number) {
    this.router.navigate(['/edit-test', id]);
  }

  deleteTest(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce test ?')) {
      this.testService.deleteTest(id).subscribe(
        () => {
          alert('Test supprimé avec succès');
          this.loadTests();
        },
        (error) => {
          console.error('Erreur lors de la suppression', error);
        }
      );
    }
  }
  sortAscending: boolean = true; // True = tri A→Z, False = tri Z→A

sortByTitle() {
  this.sortAscending = !this.sortAscending; // Inverser le tri à chaque clic
  this.filteredTests.sort((a, b) => {
    const titleA = a.titre.toLowerCase();
    const titleB = b.titre.toLowerCase();
    return this.sortAscending ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
  });
}

}
