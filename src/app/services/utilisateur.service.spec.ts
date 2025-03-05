import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UtilisateurService } from './utilisateur.service';
import { HttpClient } from '@angular/common/http';

describe('UtilisateurService', () => {
  let service: UtilisateurService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Ajout du module HttpClientTestingModule
      providers: [UtilisateurService]
    });

    service = TestBed.inject(UtilisateurService); // Injection du service
    httpMock = TestBed.inject(HttpTestingController); // Injection de HttpTestingController
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve utilisateurs', () => {
    const mockUtilisateurs = [
      { id: 1, name: 'Utilisateur 1' },
      { id: 2, name: 'Utilisateur 2' },
    ];

    service.getAll().subscribe((utilisateurs) => {
      expect(utilisateurs.length).toBe(2);
      expect(utilisateurs).toEqual(mockUtilisateurs);
    });

    // Simuler la réponse HTTP
    const req = httpMock.expectOne('http://localhost:8090/api/utilisateurs');
    expect(req.request.method).toBe('GET');
    req.flush(mockUtilisateurs); // Répond avec des données simulées
  });

  afterEach(() => {
    httpMock.verify(); // Vérifier qu'aucun appel HTTP en attente n'existe
  });
});
