import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSearchbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { FormularioPartesComponent } from 'src/app/components/formulario-partes/formulario-partes.component';
import { ParteObraService } from 'src/app/services/parte-obra.service';
import { ParteObra } from 'src/app/interfaces/parte-obra';
import { Obra } from 'src/app/interfaces/obra';
import { ObraService } from 'src/app/services/obra.service';

@Component({
  selector: 'app-parte-obra',
  templateUrl: './parte-obra.page.html',
  styleUrls: ['./parte-obra.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,
    IonToolbar, CommonModule, FormsModule, FormularioPartesComponent,
     IonSearchbar, IonButtons, IonMenuButton]
})
export class ParteObraPage implements OnInit {
  cadenaBusqueda = '';
  desplegarFormulario = false;
  parteObraSeleccionada: ParteObra | null = null;
  parteFiltrada: ParteObra[] = [];
  partes: ParteObra[] = [];
  obras: Obra[] = [];
  filtroConcepto: string = '';
  filtroCliente: string = '';
  ordenFecha: string = 'asc';
  filtroObraId: string = '';


  constructor(private parteObraServicce: ParteObraService, private obraService: ObraService) { }

  ngOnInit() {
    this.parteObraServicce.getPartes().subscribe((partes) => {
      this.partes = partes;
      this.parteFiltrada = partes;
    }),
      this.obraService.getObras().subscribe((obras) => {
        this.obras = obras
    })

  }
  filtrarPartes() {
    let partesFiltradas = this.partes.filter(parte =>
      parte.concepto.toLowerCase().includes(this.filtroConcepto.toLowerCase()) &&      
      (this.filtroObraId ? parte.obraId === this.filtroObraId : true)
    );

    // Ordenar por fecha
    partesFiltradas.sort((a, b) => {
      const fechaA = new Date(a.fecha).getTime();
      const fechaB = new Date(b.fecha).getTime();
      return this.ordenFecha === 'asc' ? fechaA - fechaB : fechaB - fechaA;
    });

    this.parteFiltrada = partesFiltradas;
  }

  seleccionarParte(parte: ParteObra) {
    this.parteObraSeleccionada = { ...parte }
    this.desplegarFormulario = true;
  }

  eliminarParte(parteId: string) {
    this.parteObraServicce.deleteParte(parteId);
  }

  cerrarPartesObra() {
    this.parteObraSeleccionada = null;
    this.desplegarFormulario = false;
  }

}
