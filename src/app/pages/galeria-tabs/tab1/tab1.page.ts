import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonButton, IonIcon, IonBackButton, IonAvatar, IonCard, 
  IonItem, IonLabel 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sunnyOutline, moonOutline, mailOutline, personOutline } from 'ionicons/icons';

import { PhotoService } from '../../../services/photo.service';
import { SupabaseService } from '../../../services/supabase.service'; // Ajusta la ruta

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports:[
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
    IonButton, IonIcon, IonBackButton, IonAvatar, IonCard, 
    IonItem, IonLabel
  ],
})
export class Tab1Page implements OnInit {
  // Inyección de dependencias moderna
  public photoService = inject(PhotoService);
  private supabaseService = inject(SupabaseService);

  // Variables para la UI
  userEmail: string = 'Cargando...';

  constructor() {
    // Registramos iconos de perfil y modo nocturno
    addIcons({ sunnyOutline, moonOutline, mailOutline, personOutline });
  }

  async ngOnInit() {
    // Obtenemos la sesión actual de Supabase
    const session = await this.supabaseService.getSession();
    if (session && session.user) {
      this.userEmail = session.user.email || 'Sin correo registrado';
    } else {
      this.userEmail = 'Usuario no identificado';
    }
  }

  toggleDarkMode() {
    this.photoService.toggleDarkMode();
  }
}