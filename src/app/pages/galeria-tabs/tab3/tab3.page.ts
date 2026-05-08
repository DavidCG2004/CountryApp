import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonImg 
} from '@ionic/angular/standalone';
import { PhotoService } from '../../../services/photo.service'; // Ajusta la ruta

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true, // <-- CAMBIO CLAVE
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonImg
  ]
})
export class Tab3Page {
  public photoService = inject(PhotoService);

  constructor() {}
}