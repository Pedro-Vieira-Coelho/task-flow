import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton, IonList, IonItem, IonLabel, IonInput, IonDatetime,IonToast,
} from '@ionic/angular/standalone';
import { Task } from 'src/app/models/task';
import { TarefaService } from 'src/app/services/tarefas';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.page.html',
  styleUrls: ['./editar-tarefa.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, CommonModule, FormsModule,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonInput, IonDatetime,IonToast
  ]
})
export class EditarTarefaPage implements OnInit {

  constructor(private router: Router, private tarefaService: TarefaService) { }
  task_id = this.router.url.split('/')[2];
  
  home:boolean = false;
  alteradoToast:boolean = false;
  erroToast:boolean = false;
  tarefa: Task = {
    id: '',
    titulo: '',
    descricao: '',
    data: '',
    horaTermino: '',
    concluida: false,
  };

  async editarTarefa() {
    try {
      await this.tarefaService.editarTarefa(this.tarefa);
      this.alteradoToast = true;
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
      alert('Erro ao editar tarefa.');
    }
  }

  voltar(){
    this.router.navigate(['/inbox']);
  }


  async ngOnInit() {

    const tarefa = this.tarefaService.getTarefa(this.task_id);
    this.tarefa.titulo = (await tarefa).titulo;
    this.tarefa.descricao = (await tarefa).descricao;
    this.tarefa.data = (await tarefa).data;
    this.tarefa.horaTermino = (await tarefa).horaTermino;
    this.tarefa.concluida = (await tarefa).concluida;
    this.tarefa.id = this.task_id;
    
  }

}
