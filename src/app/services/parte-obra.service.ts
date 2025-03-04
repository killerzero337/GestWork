import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ParteObra } from '../interfaces/parte-obra';

@Injectable({
  providedIn: 'root'
})
export class ParteObraService {

  private partesObraRef = collection(this.firestore, 'Partes');

  constructor(
    private firestore: Firestore,
  ) { }

  getPartesPorObra(obraId: string): Observable<ParteObra[]> {
    const partesQuery = query(this.partesObraRef, where('obraId', '==', obraId));
    return collectionData(partesQuery, { idField: 'id' }) as Observable<ParteObra[]>;
  }

  getPartes(): Observable<ParteObra[]> {
    return collectionData(this.partesObraRef, { idField: 'id' }) as Observable<ParteObra[]>;
  }

  addParte(parte: ParteObra) {
    return addDoc(this.partesObraRef, parte);
  }

  updateParte(parte: ParteObra) {
    const parteDocRef = doc(this.firestore, `Partes/${parte.id}`);
    return updateDoc(parteDocRef, { ...parte });
  }

  deleteParte(parteId: string) {
    const parteDocRef = doc(this.firestore, `Partes/${parteId}`);
    return deleteDoc(parteDocRef);
  }
}