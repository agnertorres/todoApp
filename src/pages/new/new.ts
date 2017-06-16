import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the NewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
})
export class NewPage {

  taskList: any;
  task: object;
  description: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    private alertCtrl: AlertController
  ){
    this.storage = storage;
    
    this.storage.get('tasks').then((tasks) => {
      this.taskList = tasks || [];
    });
  }

  ionViewDidLoad() {
  }

  addNewTask(){
    this.task = { 
      id: this.generateId(),
      description: this.description
    }

    this.taskList.push(this.task);

    this.storage.set('tasks', this.taskList);
    this.presentAlert();
    this.clearFields();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Concluído',
      subTitle: 'Sua atividade foi cadastrada com sucesso.',
      buttons: ['Ok']
    });
    
    alert.present();
    alert.onDidDismiss(() => {
      this.navCtrl.parent.select(0);
    });
  }

  ngOnInit() {
    this.storage.get('tasks').then((tasks) => {
      this.taskList = tasks || [];
    });
  }

  clearFields(){
    this.description = '';
  }

  generateId(){
    return Math.floor(Math.random() * 100000000);
  }

}
