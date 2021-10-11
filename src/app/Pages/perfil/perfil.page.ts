import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { conta } from 'src/app/Class/conta';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  private conta_user: conta


  constructor(private router:Router , private contaService:PerfilService , private activatedRoute : ActivatedRoute,
    public authService : AuthServiceService) {
    this.conta_user = this.contaService.getConta()
    console.log(this.authService.getUserLogado())
  }

  private editar():void{
    this.router.navigateByUrl("/Editar")
  }
  
}
