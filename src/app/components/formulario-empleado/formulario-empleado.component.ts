import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { IonItem, IonLabel, IonButton, IonInput, IonToggle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/interfaces/empleado';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-formulario-empleado',
  templateUrl: './formulario-empleado.component.html',
  imports: [
    IonItem, IonLabel,
    IonButton, IonInput, CommonModule, FormsModule,
    IonToggle],
  standalone: true,
  styleUrls: ['./formulario-empleado.component.scss'],
})
export class FormularioEmpleadoComponent {
  @Input() empleado: Empleado | null = null;
  @Output() cancelar = new EventEmitter<void>();
  empleadoForm: Empleado = {
    nombreCompleto: '',
    dni: '',
    telefono: '',
    estado: true
  };

  constructor(private empleadoService: EmpleadoService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['empleado'] && this.empleado) {
      this.empleadoForm = { ...this.empleado };
    }
  }

  limpiarFormulario() {
    this.empleadoForm = {
      id: '',
      nombreCompleto: '',
      dni: '',
      telefono: '',
      estado: true
    };
  }

  guardarEmpleado() {
    if (this.empleadoForm.id) {
      this.empleadoService.updateEmpleado(this.empleadoForm).then(() => {
        console.log('Empleado editado correctamente');
        this.limpiarFormulario();
      });
    } else {
      this.empleadoService.addEmpleado(this.empleadoForm).then(() => {
        console.log('Empleado añadido correctamente');
        this.limpiarFormulario();
      });
    }
  }

  cancelarEmpleado() {
    this.cancelar.emit();
    this.limpiarFormulario();
  }
}