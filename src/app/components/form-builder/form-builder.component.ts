import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  public contactForm: FormGroup;
  //Regex para validar que el usuario ha introducido un email valido
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\*.+\*))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private dbData: DataService, private formBuilder: FormBuilder) { 
    this.contactForm = this.createForm();
  }

  ngOnInit() {
  }

  //Podemos obtener la referencia de los controles en una sola linea
  get f(){return this.contactForm.controls};

  /**
   * Función que crea la instancia del formulario y asigna las validaciones pertinentes
   */
  createForm(){
    return this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      name: new FormControl('', [Validators.required,Validators.minLength(5)]),
      message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100),
      this.validatePassword])
    });    
  }

  /**
   * Función que se encarga de hacer una validación personalizada a los controles
   * @param control control a validar
   */
  private validatePassword(control: AbstractControl){
    const password = control.value;
    let error = null;
    if(!password.includes('$')){
      error = {...error, dollar: 'necesitar un dolar como simbolo!'};
    }
    if(!parseFloat(password[0])){
      error = { ...error, number: 'necesita ingresar un numero'};
    }
    return error;
  }

  /**
   * Función que se encarga de manejar los errores de los controles
   * @param controlName nombre del control
   */
  public getError(controlName: string): string {
    let error = '';
    const control = this.contactForm.get(controlName);
    if(control.touched && control.errors != null){
      error = JSON.stringify(control.errors);
    }

    return error;
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
