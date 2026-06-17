import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  deleteDoc,
  setDoc
} from '@angular/fire/firestore';

import { getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})

export class TarefaService {

  constructor(private firestore: Firestore) { }

  addTarefa(tarefa: Task) {

    const tarefaRef = collection(this.firestore, 'tarefas');

    return addDoc(tarefaRef, tarefa);

  }

  getTarefas(): Observable<Task[]> {

    const tarefaRef = collection(this.firestore, 'tarefas');

    return collectionData(
      tarefaRef,
      { idField: 'id' }

    ) as Observable<Task[]>;

  }

  async getTarefa(id: string): Promise<Task> {

    const tarefaRef = doc(this.firestore, `tarefas/${id}`);

    return (await getDoc(tarefaRef)).data() as Task;

  }

  excluirTarefa(id: string) {

    const tarefaRef = doc(this.firestore, `tarefas/${id}`);

    return deleteDoc(tarefaRef);

  }

  editarTarefa(tarefa: Task) {

    const tarefaRef = doc(this.firestore, `tarefas/${tarefa.id}`);

    return setDoc(
      tarefaRef,
      tarefa,
      { merge: true }
    );

  }

}