import { Validator,ValidatorFn, AbstractControl,FormControl } from '@angular/forms';
import {INPUT,SELECT,CHECKBOX,TEXTAREA,KEYPRESS, ONCHANGE,ONKEYUP,ONCLICK,
RADIO,FILE, ELEMENT_VALUE,BLUR,FOCUS,CHANGE,BLANK
  } from "../../const";

export abstract class BaseValidator implements Validator{
    protected validator: ValidatorFn;
    protected validators:ValidatorFn[];
    protected element: any;
    protected eventName:string;
    private oldValue:string = undefined;
    protected controls:{[key:string]:FormControl};

    protected setEventName() {
      var eventName:string = '';
      switch(this.element.tagName) {
        case INPUT:
        case TEXTAREA:
         eventName = (this.element.type == CHECKBOX || this.element.type == RADIO || this.element.type == FILE) ?  CHANGE : INPUT;
        break;
        case SELECT:
         eventName = CHANGE;
        break;
      }
      this.eventName = eventName.toLowerCase();
    }

    validate(control: AbstractControl): {[key: string]: any} {
      if(this.oldValue != control.value && this.controls)
          Object.keys(this.controls).forEach(fieldName => {
              this.controls[fieldName].updateValueAndValidity();
          })
      this.oldValue = control.value;
      return  this.validator ? this.validator(control) : null;
    }
}
