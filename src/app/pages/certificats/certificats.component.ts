import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CertificatService } from '../../services/certificat.service';
import { EmailService } from 'app/services/email.service';
import { Certificat } from '../../models/certificat.model';
import { jsPDF } from 'jspdf';  // Importation de jsPDF
import { QRCodeModule } from 'angularx-qrcode';
@Component({
  selector: 'app-certificats',
  templateUrl: './certificats.component.html',
  styleUrls: ['./certificats.component.css']
})
export class CertificatsComponent implements OnInit {
  certificats: Certificat[] = [];  // Liste complète des certificats
  searchNom: string = '';  // Valeur du champ de recherche
  filteredCertificats: Certificat[] = [];  // Liste filtrée des certificats
  constructor(private certificatService: CertificatService, private router: Router, private emailService: EmailService) {}
  showEmailDialog = false;
  currentCertificat: Certificat | null = null;

  ngOnInit(): void {
    this.loadCertificats();  // Charger les certificats dès que le composant est initialisé
  }

  loadCertificats(): void {
    this.certificatService.getAllCertificats().subscribe(
      (data) => {
        console.log('Certificats récupérés :', data);
        this.certificats = data;
        this.filteredCertificats = [...this.certificats];  // Par défaut, tous les certificats sont affichés
      },
      (error) => {
        console.error('Erreur lors du chargement des certificats:', error);
      }
    );
  }

  // Méthode pour rediriger vers la page de modification d'un certificat
  editCertificat(certificatId: number): void {
    this.router.navigate(['/edit-certificat', certificatId]);
  }

  // Méthode pour supprimer un certificat
  deleteCertificat(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce certificat ?')) {
      this.certificatService.delete(id).subscribe(
        () => this.loadCertificats(),
        error => console.error('Erreur lors de la suppression du certificat', error)
      );
    }
  }

  // Méthode de recherche par nom
  searchCertificatByName(): void {
    if (this.searchNom.trim() !== '') {
      this.filteredCertificats = this.certificats.filter(certificat => 
        certificat.nom.toLowerCase().includes(this.searchNom.toLowerCase())
      );
    } else {
      this.filteredCertificats = [...this.certificats];  // Si la recherche est vide, afficher tous les certificats
    }
  }
  // Méthode pour générer le PDF pour chaque certificat
  generatePdf(certificat: any): void {
    const doc = new jsPDF();
  
    // Titre
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 51, 102); // Couleur bleue pour le titre
    doc.text('Certificat de Réussite', 105, 30, { align: 'center' });
  
    // Détails du certificat
    const lineHeight = 10;
    const formattedDate = new Date(certificat.dateObtention).toLocaleDateString('fr-FR');
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    
    // Espacement et alignement des colonnes
    const leftMargin = 20;
    const columnWidth = 180; // Largeur des colonnes pour l'alignement
    
    // Nom : Couleur personnalisée
    doc.setTextColor(0, 102, 204); // Bleu clair
    doc.text(`Nom : ${certificat.nom}`, leftMargin, 60);
  
    // Date d'obtention : Couleur personnalisée
    doc.setTextColor(34, 139, 34); // Vert
    doc.text(`Date d'obtention : ${formattedDate}`, leftMargin, 60 + lineHeight);
  
    // Score obtenu : Couleur personnalisée
    doc.setTextColor(255, 165, 0); // Orange
    doc.text(`Score obtenu : ${certificat.scoreObtenu}`, leftMargin, 60 + 2 * lineHeight);
  
    // Score minimum : Couleur personnalisée
    doc.setTextColor(255, 99, 71); // Tomate
    doc.text(`Score minimum : ${certificat.scoreMin}`, leftMargin, 60 + 3 * lineHeight);
  
    // Utilisateur : Couleur personnalisée
    doc.setTextColor(70, 130, 180); // Bleu acier
    doc.text(`Utilisateur : ${certificat.utilisateur?.id || 'Non défini'}`, leftMargin, 60 + 4 * lineHeight);
  
    // Test : Couleur personnalisée
    doc.setTextColor(255, 20, 147); // DeepPink
    doc.text(`Test : ${certificat.test?.titre || 'Non défini'}`, leftMargin, 60 + 5 * lineHeight);
  
    // Ajouter une ligne pour séparer les détails et la signature
    doc.setLineWidth(0.5);
    doc.line(leftMargin, 80, leftMargin + columnWidth, 80);
  
    // Positionnement de "Signature" et "Certificat validé par notre système"
    const footerMarginY = 160; // Augmenter la position pour les éloigner des attributs
    
    // "Signature" avec une ligne pour la signature
    doc.setTextColor(0, 51, 102); // Bleu pour la signature
    doc.text('Signature:', leftMargin, footerMarginY);
    doc.line(leftMargin + 40, footerMarginY + 2, leftMargin + 170, footerMarginY + 2); // Ligne pour signature
    
    // "Certificat validé par notre système"
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100); // Gris
    doc.text('Certificat validé par notre système.', 105, footerMarginY + 20, { align: 'center' });
  
    // Télécharger le PDF
    doc.save(`certificat_${certificat.nom}.pdf`);
  }
  // Pagination
page: number = 1;
pageSize: number = 4; // Nombre d'éléments par page

// Méthode pour générer le QR code (par exemple, pour un certificat spécifique)
generateQRCode(certificat: Certificat): string {
  // Vous pouvez choisir ici ce que vous voulez encoder dans le QR code
  const qrData = `Certificat: ${certificat.nom} | Score: ${certificat.scoreObtenu}`;
  return qrData;
}

/*sendCertificatByEmail(certificat: Certificat): void {
  const doc = new jsPDF();

  // Ton code PDF comme dans generatePdf(certificat)
  doc.setFontSize(22);
  doc.text('Certificat de Réussite', 105, 30, { align: 'center' });
  // ... (autres textes et décorations)
  const formattedDate = new Date(certificat.dateObtention).toLocaleDateString('fr-FR');
  doc.setFontSize(14);
  doc.text(`Nom : ${certificat.nom}`, 20, 60);
  doc.text(`Date d'obtention : ${formattedDate}`, 20, 70);
  doc.text(`Score obtenu : ${certificat.scoreObtenu}`, 20, 80);
  doc.text(`Score minimum : ${certificat.scoreMin}`, 20, 90);
  doc.text(`Utilisateur : ${certificat.utilisateur?.id || 'Non défini'}`, 20, 100);
  doc.text(`Test : ${certificat.test?.titre || 'Non défini'}`, 20, 110);

  // Convertir le PDF en blob
  const pdfBlob = doc.output('blob');

  // Envoyer via le service
  this.emailService.sendCertificatEmailWithAttachment(
    'ahmed.drid4070@gmail.com',
    'Votre certificat',
    'Félicitations, voici votre certificat !',
    pdfBlob,
    `certificat_${certificat.nom}.pdf`
  ).subscribe(
    () => {
      console.log('Email envoyé avec succès !');
      alert('Email envoyé avec succès !');
    },
    (error) => {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
      alert('Erreur lors de l\'envoi de l\'email');
    }
  );
}*/

sendCertificatByEmail(certificat: Certificat): void {
  this.currentCertificat = certificat;
  this.showEmailDialog = true;
}

handleSendEmail(data: {email: string, file: File | null}): void {
  const email = data.email;
  const selectedFile = data.file;
  const certificat = this.currentCertificat;
  
  if (!certificat) return;

  if (selectedFile) {
    // Si l'utilisateur a sélectionné un fichier, l'utiliser
    this.sendExistingFile(email, selectedFile, certificat);
  } else {
    // Sinon, générer un nouveau PDF
    this.generateAndSendPdf(email, certificat);
  }
}

private sendExistingFile(email: string, file: File, certificat: Certificat): void {
  // Convertir le fichier sélectionné en blob si nécessaire
  const reader = new FileReader();
  reader.onload = () => {
    const fileBlob = new Blob([reader.result as ArrayBuffer], { type: file.type });
    
    this.emailService.sendCertificatEmailWithAttachment(
      email,
      'Votre certificat',
      'Félicitations, voici votre certificat !',
      fileBlob,
      file.name
    ).subscribe(
      () => {
        console.log('Email envoyé avec succès !');
        alert('Email envoyé avec succès !');
      },
      (error) => {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        alert('Erreur lors de l\'envoi de l\'email');
      }
    );
  };
  reader.readAsArrayBuffer(file);
}

private generateAndSendPdf(email: string, certificat: Certificat): void {
  const doc = new jsPDF();

  // Génération du PDF
  doc.setFontSize(22);
  doc.text('Certificat de Réussite', 105, 30, { align: 'center' });
  
  const formattedDate = new Date(certificat.dateObtention).toLocaleDateString('fr-FR');
  doc.setFontSize(14);
  doc.text(`Nom : ${certificat.nom}`, 20, 60);
  doc.text(`Date d'obtention : ${formattedDate}`, 20, 70);
  doc.text(`Score obtenu : ${certificat.scoreObtenu}`, 20, 80);
  doc.text(`Score minimum : ${certificat.scoreMin}`, 20, 90);
  doc.text(`Utilisateur : ${certificat.utilisateur?.id || 'Non défini'}`, 20, 100);
  doc.text(`Test : ${certificat.test?.titre || 'Non défini'}`, 20, 110);

  // Convertir le PDF en blob
  const pdfBlob = doc.output('blob');

  // Envoyer via le service
  this.emailService.sendCertificatEmailWithAttachment(
    email,
    'Votre certificat',
    'Félicitations, voici votre certificat !',
    pdfBlob,
    `certificat_${certificat.nom}.pdf`
  ).subscribe(
    () => {
      console.log('Email envoyé avec succès !');
      alert('Email envoyé avec succès !');
    },
    (error) => {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
      alert('Erreur lors de l\'envoi de l\'email');
    }
  );
}



}