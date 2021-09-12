import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Perfil', url: '/Pages/Perfil', icon: 'person' },
    { title: 'Loja', url: '/Pages/Loja', icon: 'storefront' },
    { title: 'Biblioteca', url: '/Pages/Biblioteca', icon: 'game-controller' },
    { title: 'Sobre', url: '/Pages/Sobre', icon: 'help-circle'},
  ];
  constructor() {}
}
