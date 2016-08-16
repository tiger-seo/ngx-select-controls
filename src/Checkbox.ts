import {Input, Host, Directive, HostBinding, Optional, HostListener, forwardRef, Inject} from "@angular/core";
import {NG_VALUE_ACCESSOR, NG_VALIDATORS} from "@angular/forms";
import {SelectValueAccessor} from "./SelectValueAccessor";
import {SelectValidator} from "./SelectValidator";
import {CheckboxGroup} from "./CheckboxGroup";
import {CheckboxItem} from "./CheckboxItem";

@Directive({
    selector: "[checkbox], input[type=checkbox][ngModel]",
    providers: [
        SelectValueAccessor,
        SelectValidator,
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectValueAccessor, multi: true },
        { provide: NG_VALIDATORS, useExisting: SelectValidator, multi: true }
    ],
})
export class Checkbox {

    // -------------------------------------------------------------------------
    // Inputs
    // -------------------------------------------------------------------------

    @Input()
    value: any = true;

    @Input()
    uncheckedValue: any = false;

    // -------------------------------------------------------------------------
    // Input accessors
    // -------------------------------------------------------------------------

    @Input()
    set required(required: boolean) {
        this.validator.options.required = required;
    }

    get required() {
        return this.validator.options.required;
    }

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(@Optional() @Host() @Inject(forwardRef(() => CheckboxGroup)) private checkboxGroup: CheckboxGroup,
                @Optional() @Host() @Inject(forwardRef(() => CheckboxItem)) private checkboxItem: CheckboxItem,
                private validator: SelectValidator,
                private valueAccessor: SelectValueAccessor) {
    }

    // -------------------------------------------------------------------------
    // Bindings
    // -------------------------------------------------------------------------

    @HostBinding("checked")
    get checked() {
        if (this.checkboxItem) return this.checkboxItem.isChecked();

        const valueAccessor = this.checkboxGroup ? this.checkboxGroup.valueAccessor : this.valueAccessor;
        return valueAccessor.has(this.value);
    }

    @HostListener("click")
    check() {
        if (this.checkboxItem) return;

        const valueAccessor = this.checkboxGroup ? this.checkboxGroup.valueAccessor : this.valueAccessor;
        if (valueAccessor.model instanceof Array) {
            valueAccessor.addOrRemove(this.value);
        } else {
            if (valueAccessor.has(this.value)) {
                valueAccessor.set(this.uncheckedValue);
            } else {
                valueAccessor.set(this.value);
            }
        }
    }

}