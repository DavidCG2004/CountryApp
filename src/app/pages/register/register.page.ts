import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // <-- Importante: RouterLink
import { 
  IonContent, IonButton, IonInput, IonIcon, 
  ToastController, LoadingController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, personAddOutline, arrowBackOutline } from 'ionicons/icons';

import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports:[
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink, // <-- Sin esto los botones con routerLink no hacen nada
    IonContent, IonButton, IonInput, IonIcon
  ]
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController);

  registerForm: FormGroup;

  constructor() {
    addIcons({ mailOutline, lockClosedOutline, personAddOutline, arrowBackOutline });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creando cuenta...',
      spinner: 'crescent'
    });
    await loading.present();

    const { email, password } = this.registerForm.value;

    try {
      const { error } = await this.supabaseService.signUp(email, password);

      if (error) throw error;

      await this.showToast('Cuenta creada exitosamente. Por favor, inicia sesión.', 'success');
      this.router.navigate(['/login']);
      this.registerForm.reset();

    } catch (error: any) {
      await this.showToast(error.message || 'Error al crear la cuenta', 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  private async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}