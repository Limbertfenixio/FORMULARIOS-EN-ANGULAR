import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private contactCollection: AngularFirestoreCollection;

  constructor(afs: AngularFirestore) {
    //Asignamos la colección contacts
    this.contactCollection = afs.collection<any>('contacts');
  }

  /**
   * Servicio que guarda un nuevo contacto en la colección
   * @param newContact 
   */
  saveMessage(newContact: any): void{
    this.contactCollection.add(newContact);
  }
}
