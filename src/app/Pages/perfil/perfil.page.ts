import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { conta } from 'src/app/Class/conta';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  public conta_user: conta
  constructor(private router:Router ,
    private contaService:PerfilService ,
    public authService : AuthServiceService) {
    this.conta_user = this.contaService.getConta()
  }

  public exit_account(){
    this.authService.signOut()
  }

  private editar():void{
    this.router.navigateByUrl("/Editar")
  }
}
