import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent implements OnInit {

  public contactForm: FormGroup;
  //Regex para validar que el usuario ha introducido un email valido
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\*.+\*))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private dbData: DataService) { 
    this.contactForm = this.createForm();
  }

  ngOnInit() {
  }

  get name() { return this.contactForm.get('name');}
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }

  //Podemos obtener la referencia de los controles en una sola linea
  get f(){return this.contactForm.controls};

  /**
   * Función que crea la instancia del formulario y asigna las validaciones pertinentes
   */
  createForm(){
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      name: new FormControl('', [Validators.required,Validators.minLength(5)]),
      message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)])
    });    
  }

  /**
   * Función que se encarga de resetear el formulario
   */
  onResetForm(): void{
    this.contactForm.reset();
  }

  /**
   * Función que se encarga de mandar los datos del formulario al servicio para guardar el mensaje
   */
  onSaveForm(): void {
    if(this.contactForm.valid){
      this.dbData.saveMessage(this.contactForm.value);
      this.onResetForm();
    }
  }
}
