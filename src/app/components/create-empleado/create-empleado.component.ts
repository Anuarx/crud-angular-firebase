import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css'],
})
export class CreateEmpleadoComponent implements OnInit {
  public get router(): Router {
    return this._router;
  }
  public set router(value: Router) {
    this._router = value;
  }
  // createEmpleado: FormGroup;
  submitted: Boolean = false;
  emailValidated: Boolean = false;
  loading: Boolean = false;
  id: string | null;
  texto = 'Agregar Empleado';
  // ejArray: string[] = ["HOLA", "SOY", "UN", "ARRAY"]

  nombre: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('', [
    Validators.email,
    Validators.required,
  ]);
  apellido: FormControl = new FormControl('', Validators.required);
  documento: FormControl = new FormControl('', Validators.required);
  salario: FormControl = new FormControl('', Validators.required);
  fechaCreacion: FormControl = new FormControl(new Date());
  fechaActualizacion: FormControl = new FormControl(new Date());

  constructor(
    private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private _router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  form: FormGroup = new FormGroup({
    nombre: this.nombre,
    email: this.email,
    apellido: this.apellido,
    documento: this.documento,
    salario: this.salario,
    fechaCreacion: this.fechaCreacion,
    fechaActualizacion: this.fechaActualizacion,
  });

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEmpleado() {
    //Boolean = TRUE || FALSE

    // this.fechaCreacion.setValue(new Date())
    // this.fechaActualizacion.setValue(new Date())

    // OPERADOR || DEVUELVE TRUE SI UNO DE ELLOS ES TRUE SI AMBOS SON FALSE, DEVUELVE FALSE

    if (this.form.invalid || this.email.invalid) {
      this.emailValidated = true;
      this.submitted = true;

      alert('Algo esta mal');

      setTimeout(() => {
        this.emailValidated = false;
        this.submitted = false;
      }, 3000);

      return;
    }

    // OPERADOR && DEVUELVE TRUE SI Y SOLO SI AMBOS SON TRUE SI NO FALSE

    // if (this.form.invalid && this.email.invalid) {
    //   alert('Algo esta mal')
    //   return
    // }

    // if (this.email.invalid) {
    //   alert('El email no es un email')
    //   return
    // }

    // if (this.form.invalid) {
    //   this.submitted = true
    //   alert('Es invalido')
    //   return
    // }

    this._empleadoService
      .agregarEmpleado(this.form.value)
      .then(() => {
        this.loading = true;
        this.toastr.success(
          'El empleado fue registrado con exito',
          'Empleado registrado',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.loading = false;
        this._router.navigate(['/list-empleados']);
        // this.form.reset();
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }
  esEditar() {
    this.texto = 'Editar Empleado';
    if (this.id !== null) {
      this._empleadoService.getEmpleado(this.id).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
