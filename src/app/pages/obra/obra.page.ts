import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSearchbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { Obra } from 'src/app/interfaces/obra';
import { ObraService } from 'src/app/services/obra.service';
import { FormularioObraComponent } from 'src/app/components/formulario-obra/formulario-obra.component';
import { ParteObra } from 'src/app/interfaces/parte-obra';
import { ParteObraService } from 'src/app/services/parte-obra.service';
import { FormularioPartesComponent } from 'src/app/components/formulario-partes/formulario-partes.component';

@Component({
  selector: 'app-obra',
  templateUrl: './obra.page.html',
  styleUrls: ['./obra.page.scss'],
  standalone: true,
  imports: [IonContent, FormularioObraComponent, FormularioPartesComponent, IonHeader,
    IonButton, IonTitle, IonToolbar, CommonModule, FormsModule, IonSearchbar, IonButtons, IonButton, IonMenuButton]
})
export class ObraPage implements OnInit {
  cadenaBusqueda: string = '';
  obrasFiltradas: Obra[] = [];
  obras: Obra[] = [];
  obraSeleccionada: Obra | null = null;
  partesObraSeleccionada: ParteObra[] = [];
  parteObraSeleccionada: ParteObra | null = null;
  desplegarFormulario: boolean = false;
  desplegarFormularioParte: boolean = false;
  filtroEstado: string = '';

  constructor(private obraService: ObraService, private parteObraService: ParteObraService) { }

  cerrarFormulario() {
    this.desplegarFormulario = false;
    this.obraSeleccionada = null;
  }


  ngOnInit() {
    this.obtenerObras();
  }

  obtenerObras() {
    this.obraService.getObras().subscribe((obras) => {
      this.obras = obras;
      this.obrasFiltradas = obras;
    });
  }

  eliminarObra(obraId: string) {
    this.obraService.deleteObra(obraId).then(() => {
      this.obras = this.obras.filter((obra) => obra.id !== obraId);
    });
  }

  filtrarObras() {
    const busqueda = this.cadenaBusqueda.toLowerCase();
    this.obrasFiltradas = this.obras
      .filter(obra =>
        obra.titulo.toLowerCase().includes(busqueda) ||
        obra.localidad.toLowerCase().includes(busqueda) ||
        obra.direccion.toLowerCase().includes(busqueda)
      )
      .filter(obra => {
        if (this.filtroEstado === '') {
          return true;  // Si no hay filtro seleccionado, mostrar todas las obras
        }
        return obra.estado === (this.filtroEstado === 'true');  // Filtrar por el estado seleccionado
      });
  }

  seleccionarObra(obra: Obra) {
    this.obraSeleccionada = { ...obra };
    this.desplegarFormulario = true;
  }

  togglePartesObra(obra: Obra) {
    this.obraSeleccionada = obra;
    this.parteObraService.getPartesPorObra(obra.id!).subscribe((partes) => {
      this.partesObraSeleccionada = partes;
    });
  }

  cerrarPartesObra() {
    this.desplegarFormularioParte = false;
    this.obraSeleccionada = null;
    this.partesObraSeleccionada = [];
    this.parteObraSeleccionada = null;
  }

  seleccionarParte(parte: ParteObra) {
    this.parteObraSeleccionada = { ...parte };
    this.desplegarFormularioParte = true;
  }

  eliminarParte(parteId: string) {
    this.parteObraService.deleteParte(parteId).then(() => {
      this.partesObraSeleccionada = this.partesObraSeleccionada.filter((parte) => parte.id !== parteId);
    });
  }
}