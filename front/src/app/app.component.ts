import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'gestorEventos';
  helloMessage: string = '';
  echoResponse: any;

   constructor(private api: ApiService) {}

  ngOnInit(): void {
    // Llamada GET /api/hello
    this.api.getHello().subscribe(
      (res) => {
        this.helloMessage = res.message;
      },
      (err) => {
        console.error('Error al llamar /api/hello:', err);
      }
    );
  }

  // Función para enviar POST /api/echo
  sendEcho() {
    const payload = { name: 'Juan' };
    this.api.echo(payload).subscribe(
      (res) => {
        this.echoResponse = res;
      },
      (err) => {
        console.error('Error al llamar /api/echo:', err);
      }
    );
  }

}
