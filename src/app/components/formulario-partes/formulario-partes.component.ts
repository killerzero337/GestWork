import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ParteObra } from 'src/app/interfaces/parte-obra';
import {
  IonItem, IonLabel, IonButton, IonInput, IonSelect, IonSelectOption, IonDatetime
  , IonTextarea
} from '@ionic/angular/standalone';

import { ParteObraService } from 'src/app/services/parte-obra.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ObraService } from 'src/app/services/obra.service';
import { Empleado } from 'src/app/interfaces/empleado';
import { Obra } from 'src/app/interfaces/obra';

@Component({
  selector: 'app-formulario-partes',
  templateUrl: './formulario-partes.component.html',
  imports: [IonButton,
    IonInput, FormsModule, CommonModule, IonSelect, IonSelectOption,
    IonDatetime, IonTextarea],
  styleUrls: ['./formulario-partes.component.scss'],
})
export class FormularioPartesComponent implements OnInit {

  empleados: Empleado[] = [];
  obras: Obra[] = [];
  @Output() cancelar = new EventEmitter<void>();
  @Input() parte: ParteObra | null = null;
  constructor(
    private parteObraService: ParteObraService,
    private empleadoService: EmpleadoService,
    private obraService: ObraService
  ) { }

  parteForm: ParteObra = {
    obraId: '',
    empleadoId: '',
    nombreCompletoCliente: '',
    fecha: new Date(),
    horas: 0,
    concepto: '',
    observaciones: ''
  };

  ngOnInit() {
    this.empleadoService.getEmpleados().subscribe((empleados) => {
      this.empleados = empleados;
    });
    this.obraService.getObras().subscribe((obras) => {
      this.obras = obras;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parte'] && this.parte) {
      this.parteForm = { ...this.parte };
    }
  }

  limpiarFormulario() {
    this.parteForm = {
      id: '',
      obraId: '',
      empleadoId: '',
      nombreCompletoCliente: '',
      fecha: new Date(),
      horas: 0,
      concepto: '',
      observaciones: ''      
    };
  }

  cancelarParte() {
    this.cancelar.emit();
    this.limpiarFormulario();
    // ahora oculta el formulario
  }

  guardarParte() {
    if (this.parte) {
      this.parteObraService.updateParte(this.parteForm);
      console.info('Parte editado correctamente');
    } else {
      this.parteObraService.addParte(this.parteForm);
      console.info('Parte creado correctamente');
    }
  }
}
