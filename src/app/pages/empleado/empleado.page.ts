import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel,
  IonSearchbar, IonList, IonMenuButton, IonButtons
} from '@ionic/angular/standalone';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/interfaces/empleado';
import { FormularioEmpleadoComponent } from 'src/app/components/formulario-empleado/formulario-empleado.component';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonItem, IonLabel, IonList, FormularioEmpleadoComponent, IonSearchbar, IonMenuButton, IonButtons,

  ]
})
export class EmpleadoPage implements OnInit {
  empleados: Empleado[] = []
  cadenaBusqueda: string = '';
  empleadosFiltrados: Empleado[] = [];
  empleadoSeleccionado: Empleado | null = null;
  desplegarFormulario: boolean = false;
  mostrarDatosEmpleado: boolean = false;
  filtroEstado: string = '';

  constructor(private EmpleadoService: EmpleadoService) { }

  ngOnInit() {
    this.EmpleadoService.getEmpleados().subscribe((empleados) => {
      this.empleados = empleados;
      this.empleadosFiltrados = empleados;
    })

    console.log(this.empleadosFiltrados);
  }

  filtrarEmpleados() {
    const busqueda = this.cadenaBusqueda.toLowerCase();
    this.empleados = this.empleadosFiltrados.filter(empleado =>
      empleado.nombreCompleto.toLowerCase().includes(busqueda) ||
      empleado.dni.toLowerCase().includes(busqueda) ||
      empleado.telefono.includes(busqueda)
    ).filter(obra => {
      if (this.filtroEstado === '') {
        return true;  // Si no hay filtro seleccionado, mostrar todas las obras
      }
      return obra.estado === (this.filtroEstado === 'true');  // Filtrar por el estado seleccionado
    });
  }

  seleccionarEmpleado(empleado: Empleado) {
    this.empleadoSeleccionado = { ...empleado };
    this.desplegarFormulario = true;
  }

  cerrarFormulario() {
    this.desplegarFormulario = false;
    this.limpiarSeleccion();
  }

  limpiarSeleccion() {
    this.empleadoSeleccionado = null;
  }

  verEmpleado(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
    this.mostrarDatosEmpleado = true;
  }



  eliminarEmpleado(empleadoId: string) {
    if (confirm("¿Estás seguro de que quieres eliminar este empleado?")) {
      this.EmpleadoService.deleteEmpleado(empleadoId)
        .then(() => {
          console.log("Empleado eliminado correctamente");
        })
        .catch((error) => {
          console.error("Error al eliminar empleado:", error);
        });
    }
  }

  toggleDetallesEmpleado(empleado: Empleado) {
    if (this.empleadoSeleccionado && this.empleadoSeleccionado.id === empleado.id) {
      this.empleadoSeleccionado = null; // Si es el mismo, se oculta
    } else {
      this.empleadoSeleccionado = empleado; // Si es otro, se muestra
    }
  }


  cerrarDetallesEmpleado() {
    this.empleadoSeleccionado = null;
    this.mostrarDatosEmpleado = false;
  }
}
