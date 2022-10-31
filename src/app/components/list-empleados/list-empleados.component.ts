import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css'],
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];

  constructor(
    private _empleadoService: EmpleadoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe((data) => {
      this.empleados = [];
      data.forEach((element: any) => {
        // con esto nos traemos los elementos de la firebase
        // console.log(element.payload.doc.id); esto para obtener las id en la consola
        // console.log(element.payload.doc.data()); esto para obtener los datos de la firebase en la consola
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.empleados);
    });
  }
  eliminarEmpleado(id: string) {
    this._empleadoService
      .eliminarEmpleado(id)
      .then(() => {
        console.log('empleado eliminado con exito');
        this.toastr.error(
          'El empleado fue eliminado con exito',
          'Registro eliminado',
          {
            positionClass: 'toast-bottom-right',
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
