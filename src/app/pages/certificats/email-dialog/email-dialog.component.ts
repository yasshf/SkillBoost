import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-email-dialog',
  template: `
    <div class="modal-backdrop" *ngIf="visible" (click)="onBackdropClick($event)">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Envoyer le certificat par email</h3>
          <button class="close-btn" (click)="close()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="email">Adresse Email</label>
            <input 
              type="email" 
              class="form-control" 
              id="email" 
              [(ngModel)]="email" 
              placeholder="exemple@domaine.com"
              required
            >
            <div *ngIf="emailSubmitted && !isValidEmail()" class="error-message">
              Veuillez entrer une adresse email valide
            </div>
          </div>
          
          <div class="form-group mt-3">
            <label for="file">Choisir un fichier (optionnel)</label>
            <input 
              type="file" 
              class="form-control" 
              id="file"
              (change)="onFileSelected($event)"
            >
            <small class="text-muted">Si aucun fichier n'est sélectionné, un PDF sera généré automatiquement</small>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="close()">Annuler</button>
          <button class="btn btn-primary" (click)="send()">Envoyer</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .modal-container {
      width: 500px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #e9ecef;
    }
    
    .modal-header h3 {
      margin: 0;
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      color: #6c757d;
    }
    
    .modal-body {
      padding: 20px;
    }
    
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      padding: 15px 20px;
      border-top: 1px solid #e9ecef;
    }
    
    .modal-footer button {
      margin-left: 10px;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
    }
    
    .error-message {
      color: #dc3545;
      font-size: 14px;
      margin-top: 5px;
    }
  `]
})
export class EmailDialogComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() sendEmail = new EventEmitter<{email: string, file: File | null}>();
  
  email = '';
  selectedFile: File | null = null;
  emailSubmitted = false;
  
  isValidEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(this.email);
  }
  
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  
  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.reset();
  }
  
  reset(): void {
    this.email = '';
    this.selectedFile = null;
    this.emailSubmitted = false;
  }
  
  send(): void {
    this.emailSubmitted = true;
    
    if (this.isValidEmail()) {
      this.sendEmail.emit({
        email: this.email,
        file: this.selectedFile
      });
      this.close();
    }
  }
  
  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}