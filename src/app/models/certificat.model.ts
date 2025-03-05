import { Test } from './test.model';
import { Utilisateur } from './utilisateur.model';

export class Certificat {
  id: number | null = null; // Le rendre optionnel ou null lors de la création d'un nouveau certificat
  nom: string = '';
  dateObtention: Date | null = null;
  scoreObtenu: number = 0;
  scoreMin: number = 0;
  utilisateur: Utilisateur | null = null; // Ici, on permet à utilisateur d'être null si non fourni
  test: Test | null = null; // Même principe pour test
}