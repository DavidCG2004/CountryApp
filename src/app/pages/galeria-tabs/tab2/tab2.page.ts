import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, 
  IonIcon, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonImg, IonFab, IonFabButton 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { shareSocialOutline, trashOutline, checkmarkCircle, closeOutline, camera } from 'ionicons/icons';
import { PhotoService, UserPhoto } from '../../../services/photo.service'; // Ajusta la ruta

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true, // <-- CAMBIO CLAVE
  imports: [
    CommonModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, 
    IonIcon, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonImg, IonFab, IonFabButton
  ]
})
export class Tab2Page implements OnInit {
  public photoService = inject(PhotoService);

  selectedPhoto: UserPhoto | null = null;
  selectedPosition: number = -1;

  constructor() {
    addIcons({ shareSocialOutline, trashOutline, checkmarkCircle, closeOutline, camera });
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  selectPhoto(photo: UserPhoto, position: number) {
    if (this.selectedPosition === position) {
      this.selectedPhoto = null;
      this.selectedPosition = -1;
    } else {
      this.selectedPhoto = photo;
      this.selectedPosition = position;
    }
  }

  async deleteSelected() {
    if (this.selectedPhoto !== null) {
      await this.photoService.deletePhoto(this.selectedPhoto, this.selectedPosition);
      this.selectedPhoto = null;
      this.selectedPosition = -1;
    }
  }

  async shareSelected() {
    if (this.selectedPhoto !== null) {
      await this.photoService.sharePhoto(this.selectedPhoto);
    }
  }
}