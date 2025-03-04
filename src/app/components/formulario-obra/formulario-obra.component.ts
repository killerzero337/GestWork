import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IonItem, IonLabel, IonButton, IonInput, IonToggle } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Obra } from 'src/app/interfaces/obra';
import { ObraService } from 'src/app/services/obra.service';

@Component({
  selector: 'app-formulario-obra',
  imports: [CommonModule, FormsModule,
    IonItem, IonLabel, IonButton, IonInput, IonToggle
  ],
  templateUrl: './formulario-obra.component.html',
  styleUrls: ['./formulario-obra.component.scss'],
})
export class FormularioObraComponent implements OnInit {

  @Input() obra: Obra | null = null;
  @Output() cancelar = new EventEmitter<void>();
  obraForm: Obra = {
    titulo: '',
    localidad: '',
    direccion: '',
    nombreCompletoCliente: '',
    telefonoCliente: '',
    estado: true    
  };

  constructor(private obraSerivice: ObraService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['obra'] && this.obra) {
      this.obraForm = { ...this.obra };
    }

  }

  limpiarFormulario() {
    this.obraForm = {
      id: '',
      titulo: '',
      localidad: '',
      direccion: '',
      nombreCompletoCliente: '',
      telefonoCliente: '',
      estado: true
    };
  }

  guardarObra() {
    if (this.obraForm.id) {
      this.obraSerivice.updateObra(this.obraForm).then(() => {
        console.log('Obra editada correctamente');
      });
    } else {
      this.obraSerivice.addObra(this.obraForm).then(() => {
        console.log('Obra creada correctamente');
      });
    }
  }

  cancelarObra() {
    this.cancelar.emit();
    this.limpiarFormulario();
  }

}
