import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonToast
} from '@ionic/angular/standalone';

import { TarefaService } from '../../services/tarefas';
import { Task } from '../../models/task';

@Component({
  selector: 'app-criar-tarefa',
  templateUrl: './criar-tarefa.page.html',
  styleUrls: ['./criar-tarefa.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonToast
  ]
})

export class CriarTarefaPage implements OnInit {

  titulo: string = '';
  descricao: string = '';
  data: string = '';
  horaTermino: string = '';
  dataMinima: string = new Date().toISOString();
  mostrarToast: boolean = false;

  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {

  }

  criarTarefa() {
    
    if (!this.titulo.trim()) {

      alert('O título é obrigatório.');

      return;

    }

    const horaFinal = this.horaTermino
      ? new Date(this.horaTermino).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        })
      : new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        });

      const dataFinal =
        this.data ||
        new Date().toISOString();

    const novaTarefa: Task = {

      titulo: this.titulo,

      descricao: this.descricao,

      data: dataFinal,

      horaTermino: horaFinal,

      concluida: false

    };

    this.tarefaService.addTarefa(novaTarefa)

      .then(() => {

        this.mostrarToast = true;

        this.titulo = '';
        this.descricao = '';
        this.data = '';
        this.horaTermino = '';

      })

      .catch((erro: any) => {

        console.error('Erro ao salvar tarefa:', erro);

      });

  }
}