import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import type { Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { AlertController, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  public isDarkMode: boolean = false;

  private PHOTO_STORAGE: string = 'photos';
  private platform: Platform;

  constructor(platform: Platform, private alertController: AlertController) {
    this.platform = platform;
  }

  // ─────────────────────────────────────────
  // 🌙 MODO NOCTURNO
  // ─────────────────────────────────────────
  public toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    // Ionic 7+: se aplica en <html> con la clase 'ion-palette-dark'
    document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
  }

  // ─────────────────────────────────────────
  // 🗑️ ELIMINAR FOTO
  // ─────────────────────────────────────────
  public async deletePhoto(photo: UserPhoto, position: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar foto',
      message: '¿Estás seguro de que deseas eliminar esta foto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            // Eliminar del array en memoria
            this.photos.splice(position, 1);

            // Actualizar Preferences
            Preferences.set({
              key: this.PHOTO_STORAGE,
              value: JSON.stringify(this.photos),
            });

            // Eliminar del filesystem
            const filename = photo.filepath.substring(
              photo.filepath.lastIndexOf('/') + 1
            );
            await Filesystem.deleteFile({
              path: filename,
              directory: Directory.Data,
            });
          },
        },
      ],
    });

    await alert.present();
  }

  // ─────────────────────────────────────────
  // 📤 COMPARTIR FOTO
  // ─────────────────────────────────────────
  public async sharePhoto(photo: UserPhoto) {
    try {
      if (this.platform.is('hybrid')) {
        await Share.share({
          title: 'Compartir foto',
          text: '¡Mira esta foto de mi galería!',
          url: photo.filepath,
          dialogTitle: 'Compartir con...',
        });
      } else {
        const alert = await this.alertController.create({
          header: 'Compartir no disponible',
          message:
            'La función de compartir solo está disponible en dispositivos móviles.',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  }

  // ─────────────────────────────────────────
  // 💬 ALERT GENÉRICO
  // ─────────────────────────────────────────
  public async showAlert(
    header: string = 'Aviso',
    message: string = 'Esta es una alerta predeterminada.',
    buttonText: string = 'Aceptar'
  ) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: buttonText,
          role: 'confirm',
          handler: () => {
            console.log('Alerta confirmada');
          },
        },
      ],
    });
    await alert.present();
  }

  // ─────────────────────────────────────────
  // 📷 CÁMARA
  // ─────────────────────────────────────────
  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      saveToGallery: true,
    });

    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }

  private async savePicture(photo: Photo) {
    let base64Data: string | Blob;

    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      base64Data = file.data;
    } else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      base64Data = (await this.convertBlobToBase64(blob)) as string;
    }

    const fileName = Date.now() + 'DCjamarca' + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (this.platform.is('hybrid')) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  }

  private convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  public async loadSaved() {
    const { value: photoList } = await Preferences.get({
      key: this.PHOTO_STORAGE,
    });
    this.photos = (photoList ? JSON.parse(photoList) : []) as UserPhoto[];

    if (!this.platform.is('hybrid')) {
      for (let photo of this.photos) {
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}