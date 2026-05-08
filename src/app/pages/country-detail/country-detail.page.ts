import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonBackButton, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonList, IonItem,
  IonLabel, IonIcon, IonSpinner, IonBadge
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  businessOutline, cashOutline, peopleOutline,
  mapOutline, languageOutline, earthOutline
} from 'ionicons/icons';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.page.html',
  styleUrls: ['./country-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonBackButton, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonList, IonItem,
    IonLabel, IonIcon, IonSpinner, IonBadge
  ]
})
export class CountryDetailPage implements OnInit {

  private route = inject(ActivatedRoute);
  private countryService = inject(CountryService);

  country: any = null;
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor() {
    addIcons({
      businessOutline, cashOutline, peopleOutline,
      mapOutline, languageOutline, earthOutline
    });
  }

  ngOnInit() {
    const cca3 = this.route.snapshot.paramMap.get('cca3');
    if (cca3) {
      this.loadCountry(cca3);
    }
  }

  private loadCountry(cca3: string) {
    this.countryService.getCountryByCode(cca3).subscribe({
      next: (response) => {
        this.country = response[0];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  getCurrency(currencies: any): string {
    if (!currencies) return 'No disponible';
    const firstKey = Object.keys(currencies)[0];
    const currency = currencies[firstKey];
    return `${currency.name} (${currency.symbol})`;
  }

  getLanguages(languages: any): string {
    if (!languages) return 'No disponible';
    return Object.values(languages).join(', ');
  }
}