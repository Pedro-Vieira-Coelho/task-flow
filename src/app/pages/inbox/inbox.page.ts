import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonLabel,
  IonList,
  IonItem,
  IonCheckbox,
  IonIcon
} from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { TarefaService } from '../../services/tarefas';
import { Task } from '../../models/task';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonLabel,
    IonList,
    IonItem,
    IonCheckbox,
    CommonModule,
    IonIcon,
    FormsModule
  ]
})

export class InboxPage implements OnInit {

  tarefas: Task[] = [];

  constructor(

    private tarefaService: TarefaService,

    private alertController: AlertController

  ) { }

  ngOnInit() {

    this.carregarTarefas();

  }

  carregarTarefas() {

    this.tarefaService.getTarefas()
      .subscribe((dados) => {

        this.tarefas = dados
          .filter(tarefa => !tarefa.concluida)
          .sort((a, b) => {

            const dataA = new Date(a.data).getTime();
            const dataB = new Date(b.data).getTime();

            return dataA - dataB;

          });

      });

  }

  concluirTarefa(tarefa: Task) {

    tarefa.concluida = true;

    this.tarefaService.editarTarefa(tarefa);

  }

  formatarData(data: string): string {

    if (!data) {
      return 'Sem data definida';
    }

    return new Date(data).toLocaleDateString('pt-BR');

  }

  formatarHora(hora: string): string {

    if (!hora) {
      return '--:--';
    }

    if (hora.includes(':') && hora.length <= 5) {
      return hora;
    }

    return new Date(hora).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });

  }

  async confirmarExclusao(tarefa: Task) {

    const alert = await this.alertController.create({

      header: 'Excluir tarefa',

      message: 'Deseja realmente excluir esta tarefa?',

      buttons: [

        {
          text: 'Cancelar',
          role: 'cancel'
        },

        {
          text: 'Excluir',

          role: 'destructive',

          handler: () => {

            this.excluirTarefa(tarefa);

          }

        }

      ]

    });

    await alert.present();

  }

  excluirTarefa(tarefa: Task) {

    if (!tarefa.id) {

      return;

    }

    this.tarefaService.excluirTarefa(tarefa.id);

  }

}