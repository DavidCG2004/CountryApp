import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // <-- Importación crucial para Standalone
import {
  IonContent,
  IonInput, IonButton,
  IonIcon,             
  LoadingController, ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, chevronForwardOutline } from 'ionicons/icons';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls:['./login.page.scss'],
  standalone: true,
  imports:[
    CommonModule, 
    FormsModule, 
    RouterLink, // <-- Registramos el RouterLink aquí
    IonContent,
    IonInput, IonButton,
    IonIcon,              
  ]
})
export class LoginPage {
  email = '';
  password = '';

  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  private loadingCtrl = inject(LoadingController);
  private toastCtrl = inject(ToastController);

  constructor() {
    addIcons({ mailOutline, lockClosedOutline, chevronForwardOutline });
  }

  async ngOnInit() {
    const session = await this.supabaseService.getSession();
    if (session) {
      this.router.navigateByUrl('/menu', { replaceUrl: true });
    }
  }

  async login() {
    if (!this.isValidForm()) return;
    const loading = await this.showLoading('Iniciando sesión...');
    
    const { error } = await this.supabaseService.login(this.email, this.password);
    
    await loading.dismiss();
    
    if (error) { 
      this.showToast(error.message, 'danger'); 
      return; 
    }
    
    this.showToast('¡Bienvenido!', 'success');
    this.router.navigateByUrl('/menu', { replaceUrl: true });
  }

  // Se eliminó el método register() porque ya no es necesario aquí

  private isValidForm(): boolean {
    if (!this.email || !this.password) {
      this.showToast('Por favor, ingresa correo y contraseña', 'warning');
      return false;
    }
    return true;
  }

  private async showLoading(message: string) {
    const loading = await this.loadingCtrl.create({ message, spinner: 'crescent' });
    await loading.present();
    return loading;
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastCtrl.create({ message, duration: 3000, color, position: 'bottom' });
    await toast.present();
  }
}