import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonSearchbar, IonContent,
  IonIcon, IonCard, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonCardContent, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonThumbnail, IonSpinner,
  LoadingController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchCircle, chevronForwardOutline } from 'ionicons/icons';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.page.html',
  styleUrls: ['./country-search.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonSearchbar, IonContent,
    IonIcon, IonCard, IonCardHeader, IonCardSubtitle,
    IonCardTitle, IonCardContent, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonThumbnail, IonSpinner
  ]
})
export class CountrySearchPage implements OnInit {

  private countryService = inject(CountryService);
  private loadingCtrl = inject(LoadingController);
  private toastCtrl = inject(ToastController);
  private router = inject(Router);

  searchTerm: string = '';
  countries: any[] = [];      // <-- ahora es un arreglo
  isLoading: boolean = false;

  constructor() {
    addIcons({ searchCircle, chevronForwardOutline });
  }

  ngOnInit() {}

  async searchCountry() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.countries = [];
      return;
    }

    this.countries = [];
    this.isLoading = true;

    const cleanSearch = this.searchTerm.trim().toLowerCase();

    this.countryService.getCountryByName(cleanSearch).subscribe({
      next: (response) => {
        this.countries = response;   // <-- guardamos todos los resultados
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        const msg = error.status === 404
          ? 'No se encontraron países. Revisa el nombre.'
          : 'Error de conexión. Inténtalo de nuevo.';
        this.showToast(msg, 'danger');
      }
    });
  }

  // Navega al detalle usando el código único del país
  goToDetail(cca3: string) {
    this.router.navigate(['/api/country', cca3]);
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}