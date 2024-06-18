import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListagemreservasService {

  private host = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  public getReservas(){
    return new Promise((resolve, reject) => {
      this.http.get(this.host + 'reservas').subscribe(
        (reserva: any) => {
          resolve(reserva);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public deleteReserva(reserva: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.delete(this.host + 'reserva/' + reserva.codReserva, { responseType: 'text' }).subscribe(
        () => {
          resolve('Reserva cancelada com sucesso');
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
