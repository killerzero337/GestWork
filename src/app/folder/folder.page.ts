import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle } from '@ionic/angular/standalone';
import { ObraService } from '../services/obra.service';
import { Obra } from '../interfaces/obra';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, CommonModule,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle
  ],
})
export class FolderPage implements OnInit {
  obras: Obra[] = [];
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private obraService: ObraService) { }

  ngOnInit() {
    this.obraService.getObras().subscribe((obras) => {
      this.obras = obras
    })
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
