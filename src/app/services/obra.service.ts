import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Obra } from '../interfaces/obra';
import { ParteObraService } from './parte-obra.service';
import { ParteObra } from '../interfaces/parte-obra';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  ParteObra: ParteObra[] = [];
  private obrasRef = collection(this.firestore, 'Obras');

  constructor(private firestore: Firestore, private parteObraService: ParteObraService) { }

  getObras(): Observable<Obra[]> {
    return collectionData(this.obrasRef, { idField: 'id' }) as Observable<Obra[]>;
  }

  addObra(obra: Obra) {
    return addDoc(this.obrasRef, obra);
  }

  updateObra(obra: Obra) {
    const obraDocRef = doc(this.firestore, `Obras/${obra.id}`);
    return updateDoc(obraDocRef, { ...obra });
  }

  async deleteObra(obraId: string) {
    try {
      this.parteObraService.getPartesPorObra(obraId).subscribe((partes: ParteObra[]) => {
        for (const parte of partes) {
          this.parteObraService.deleteParte(parte.id ?? '').then(() => {
            const obraDocRef = doc(this.firestore, `Obras/${obraId}`);
            deleteDoc(obraDocRef).then(() => {
              console.log(`Obra ${obraId} eliminada correctamente junto con sus partes.`);
            });
          });
        }
      });
      const obraDocRef = doc(this.firestore, `Obras/${obraId}`);
      await deleteDoc(obraDocRef);

      console.log(`Obra ${obraId} eliminada correctamente junto con sus partes.`);
    } catch (error) {
      console.error("Error al eliminar la obra y sus partes:", error);
    }
  }
}
