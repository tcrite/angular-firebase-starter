import { getFile } from 'ts-node/dist';
import { error } from 'util';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-validation-message',
    template: `<span class="text-warning" *ngIf="message">{{message}}</span>`
})
export class ValidationMessageComponent {

    @Input() control: FormControl | FormGroup;

    get message() {
        return this.getMessage(this.control);
    }

    private getMessage(control: FormControl | FormGroup | void, isChild: boolean = false): string | void {
        if (control && control.touched || isChild) {
            for (let errorName in control.errors) {
                if (control.errors.hasOwnProperty(errorName)) {
                    return control.errors[errorName];
                }
            }
            const fg = control as FormGroup
            if (fg.controls) {
                for (let controlName in fg.controls) {
                    if (fg.controls.hasOwnProperty(controlName)) {
                        const error = this.getMessage(fg[controlName]);
                        if (error) {
                            return error;
                        }
                    }
                }
            }
        }
    }
}