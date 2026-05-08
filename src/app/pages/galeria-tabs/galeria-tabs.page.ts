import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, cameraOutline, imagesOutline } from 'ionicons/icons';

@Component({
  selector: 'app-galeria-tabs',
  templateUrl: './galeria-tabs.page.html',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class GaleriaTabsPage {
  constructor() {
    // Registramos los iconos de la barra inferior
    addIcons({ homeOutline, cameraOutline, imagesOutline });
  }
}