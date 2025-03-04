
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { manOutline, manSharp, man, home, homeOutline, homeSharp, reader, readerOutline, readerSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, 
    IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Partes de obra', url: '/parte-obra', icon: 'reader' },
    { title: 'Obras', url: '/obra', icon: 'home' },
    { title: 'Empleados', url: '/empleado', icon: 'man' },

  ];
  constructor() {
    addIcons({ manOutline, manSharp, man, home, homeOutline, homeSharp, reader, readerOutline, readerSharp });
  }
}
