import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent {

    formulario: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.formulario = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(5)]],
      });
    }
  
    submitForm() {
      if (this.formulario.valid) {
        console.log('Formulario enviado', this.formulario.value);
      }
    }
  }
