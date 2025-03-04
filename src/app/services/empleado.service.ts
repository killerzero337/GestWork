import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private EmpleadosRef = collection(this.firestore, 'Empleados');

  constructor(private firestore: Firestore) { }

  getEmpleados(): Observable<Empleado[]> {
    return collectionData(this.EmpleadosRef, { idField: 'id' }) as Observable<Empleado[]>;
  }

  addEmpleado(empleado: Empleado) {
    return addDoc(this.EmpleadosRef, empleado);
  }

  updateEmpleado(empleado: Empleado) {
    const empleadoRef = doc(this.firestore, `Empleados/${empleado.id}`);
    return updateDoc(empleadoRef, { ...empleado });
  }

  deleteEmpleado(empleadoId: string) {
    if (!empleadoId) {
      console.error("Error: El ID del empleado no es válido");
      return Promise.reject("El ID del empleado no es válido.");
    }

    const empleadoRef = doc(this.firestore, `Empleados/${empleadoId}`);

    return deleteDoc(empleadoRef)
      .then(() => console.log("Empleado eliminado correctamente"))
      .catch((error) => {
        console.error("Error al eliminar empleado:", error);
        return Promise.reject("No se pudo eliminar el empleado.");
      });
  }

}
