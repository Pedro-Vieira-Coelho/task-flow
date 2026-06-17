import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonList,
  IonLabel,
  IonItem,
  IonIcon,
} from '@ionic/angular/standalone';

import { TarefaService } from '../../services/tarefas';
import { Task } from '../../models/task';

@Component({
  selector: 'app-concluidas',
  standalone: true,
  templateUrl: './concluidas.page.html',
  styleUrls: ['./concluidas.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonList,
    IonLabel,
    IonItem,
    IonIcon,
    CommonModule,
    FormsModule
  ],
})

export class ConcluidasPage implements OnInit {

  tarefasConcluidas: Task[] = [];

  constructor(

    private router: Router,

    private tarefaService: TarefaService

  ) { }

  ngOnInit() {

    this.carregarTarefas();

  }

  ionViewWillEnter() {

    this.carregarTarefas();

  }

  carregarTarefas() {

    this.tarefaService.getTarefas()

      .subscribe((dados) => {

        this.tarefasConcluidas = dados.filter(

          tarefa => tarefa.concluida

        );

      });

  }

  reabrirTarefa(tarefa: Task) {

    tarefa.concluida = false;

    this.tarefaService.editarTarefa(tarefa);

  }

  irParaEditarTarefa() {

    this.router.navigate(['/editar-tarefa']);

  }

  formatarData(data: string): string {

    return new Date(data).toLocaleDateString('pt-BR');

  }

  formatarHora(hora: string): string {

    if (!hora) {
      return '--:--';
    }

    if (hora.includes('T')) {

      return new Date(hora).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });

    }

    return hora;

  }

}
