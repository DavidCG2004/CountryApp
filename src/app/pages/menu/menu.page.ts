import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar,
  IonIcon,
  IonButtons, IonButton,
  IonRippleEffect,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentTextOutline, imagesOutline, codeSlashOutline, logOutOutline } from 'ionicons/icons';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar,
    IonIcon,
    IonButtons, IonButton,
    IonRippleEffect,
  ]
})
export class MenuPage {
  private router = inject(Router);
  private supabaseService = inject(SupabaseService);

  constructor() {
    addIcons({ documentTextOutline, imagesOutline, codeSlashOutline, logOutOutline });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  async logout() {
    const { error } = await this.supabaseService.logout();
    if (!error) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      console.error('Error al cerrar sesión:', error.message);
    }
  }
}