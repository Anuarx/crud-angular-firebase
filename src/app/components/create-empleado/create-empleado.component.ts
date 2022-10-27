import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css'],
})
export class CreateEmpleadoComponent implements OnInit {
  // createEmpleado: FormGroup;
  submitted: Boolean = false;
  emailValidated: Boolean = false

  ejArray: string[] = ["HOLA", "SOY", "UN", "ARRAY"]

  nombre: FormControl = new FormControl('', Validators.required)
  email: FormControl = new FormControl('', [Validators.email, Validators.required])
  apellido: FormControl = new FormControl('', Validators.required)
  documento: FormControl = new FormControl('', Validators.required)
  salario: FormControl = new FormControl('', Validators.required)
  fechaCreacion: FormControl = new FormControl(new Date())
  fechaActualizacion: FormControl = new FormControl(new Date())

  constructor(private fb: FormBuilder,
    private _empleadoService: EmpleadoService) {
    // this.createEmpleado = this.fb.group({
    //   nombre: ['', Validators.required],
    //   apellido: ['', Validators.required],
    //   documento: ['', Validators.required],
    //   salario: ['', Validators.required]
    // });
  }

  form: FormGroup = new FormGroup({
    nombre: this.nombre,
    email: this.email,
    apellido: this.apellido,
    documento: this.documento,
    salario: this.salario,
    fechaCreacion: this.fechaCreacion,
    fechaActualizacion: this.fechaActualizacion
  })

  ngOnInit(): void {
    // alert(new Date())

    let ejArray2 = []

    for (let i = 0; i < this.ejArray.length; i++) {
      console.log(this.ejArray[i])
    }

    ejArray2 = this.ejArray.map((result, index) => {
      return result
    })

    console.log(ejArray2, 'array2')
  }

  agregarEmpleado() {

    //Boolean = TRUE || FALSE

    // this.fechaCreacion.setValue(new Date())
    // this.fechaActualizacion.setValue(new Date())

    // OPERADOR || DEVUELVE TRUE SI UNO DE ELLOS ES TRUE SI AMBOS SON FALSE, DEVUELVE FALSE

    if (this.form.invalid || this.email.invalid) {
      this.emailValidated = true
      this.submitted = true

      alert('Algo esta mal')

      setTimeout(() => {
        this.emailValidated = false
        this.submitted = false
      }, 2000);
      
      return
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

    this._empleadoService.agregarEmpleado(this.form.value)
      .then(() => {
        this.form.reset()
      }).catch(error => {
        console.log(error);
      })
  }
}
