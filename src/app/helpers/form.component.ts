import { StateService } from '../store';
import { StatefulClass } from './statefulClass';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export abstract class FormComponent extends StatefulClass    {

        static controlNames: { [name: string]: string; };
        formGroup: FormGroup;

        constructor(
                protected formBuilder: FormBuilder,
                state: StateService,
                firebase: AngularFire
        ) {
                super(state, firebase);
        }

        protected getFormValue<T>(controlName: string, fallback: T): T {
            if (this.formGroup && this.formGroup.controls[controlName] &&
                this.formGroup.controls[controlName].value) {
                return this.formGroup.controls[controlName].value;
            }
            return fallback;
        }
}