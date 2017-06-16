import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the TaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  tasks: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage,
    private alertCtrl: AlertController
    ){
  }

  doRefresh(refresher) {

    setTimeout(() => {
      this.storage.get('tasks').then((tasks) => {
        this.tasks = tasks
        refresher.complete();
      })
    }, 1000);
  }

  doneTask(task){

    let done = (task) => {
        let newTaskList = this.tasks.filter((item) => {
        return task.id != item.id
      })

      this.storage.set('tasks', newTaskList);
    }
    this.presentConfirm(done, task);

  }

  presentConfirm(done, task) {
    let alert = this.alertCtrl.create({
      title: 'Atenção!',
      message: 'Deseja realmente finalizar esta tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Finalizar',
          handler: () => {
            done(task);
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.storage.get('tasks').then((tasks) => {
      this.tasks = tasks
    })
  }
}
