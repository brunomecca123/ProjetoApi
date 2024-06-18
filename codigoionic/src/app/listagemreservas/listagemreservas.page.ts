import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ListagemreservasService } from '../api/listagemreservas.service';

@Component({
  selector: 'app-listagemreservas',
  templateUrl: './listagemreservas.page.html',
  styleUrls: ['./listagemreservas.page.scss'],
})
export class ListagemreservasPage implements OnInit {

  public empresaLogada: any = {};
  public descricaoreservas: any = [];

  constructor(
    private router: Router,
    private listagemreservasservice: ListagemreservasService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.route.queryParams.subscribe((params) => {
      this.empresaLogada = params['empresaLogada'];
      this.carregarReservas(); // Chama a função para carregar as reservas ao inicializar
    });
  }

  ngOnInit() {
    this.carregarReservas();
  }

  carregarReservas() {
    this.listagemreservasservice.getReservas().then((reservas: any) => {
      console.log('Reservas carregadas:', reservas); // Log dos dados recebidos
      this.descricaoreservas = reservas;
    }).catch(error => {
      console.error('Erro ao carregar reservas:', error);
    });
  }

  confirmarReserva(reserva: any) {
    const confirmar = confirm('Tem certeza de que deseja cancelar a reserva?');

    if (confirmar) {
      this.listagemreservasservice.deleteReserva(reserva).then(() => {
        console.log('Reserva cancelada com sucesso!');
        // Atualizar a lista de reservas após cancelamento
        this.carregarReservas();
      }).catch(error => {
        console.error('Erro ao cancelar reserva:', error);
      });
    } else {
      console.log('Evento deletar reserva cancelado!');
    }
  }

  openPerfilEmpresa() {
    this.navCtrl.navigateForward('perfilempresa', {
      queryParams: { empresaLogada: this.empresaLogada },
    });
  }
}
