import "rxjs/Rx";
import {Component, Input, forwardRef, Provider, ViewEncapsulation, OnInit, ViewChild, ElementRef} from "@angular/core";
import {NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, ControlValueAccessor, Control} from "@angular/common";
import {SelectItems} from "./SelectItems";
import {DROPDOWN_DIRECTIVES} from "ng2-dropdown";
import {Observable} from "rxjs/Rx";
import {WidthCalculator} from "./WidthCalculator";
import {SelectValidator} from "./SelectValidator";
import {SelectValueAccessor} from "./SelectValueAccessor";

@Component({
    selector: "select-tags",
    template: `
<div class="select-tags"
     [class.disabled]="disabled">
    <div class="select-tags-dropdown dropdown" dropdown [dropdownToggle]="false">
        <div #selectTagsBox
            (click)="focusTagsInput()" 
            (keydown)="onSelectTagsBoxKeydown($event)"
            tabindex="1" 
            class="select-tags-box">
            <select-items #boxSelectItems
                [(ngModel)]="selectedItems"
                [hideControls]="true"
                [removeButton]="true"
                [disabled]="disabled"
                [items]="valueAccessor.model"
                (onSelect)="onTagSelect($event)"
                [customToggleLogic]="selectItemsToggleLogic"
                [labelBy]="valueBy ? listLabelBy : (listLabelBy || labelBy)"
                [trackBy]="valueBy ? listTrackBy : (listTrackBy || trackBy)"></select-items>
            <input #selectTagsBoxInput 
                   class="select-tags-input"
                   [class.hidden]="items && valueAccessor.model && items.length === valueAccessor.model.length && !loader"
                   dropdown-open
                   type="text"
                   [placeholder]="placeholder"
                   [disabled]="isDisabled()"
                   [(ngModel)]="term"
                   [ngFormControl]="termControl"
                   (focus)="load()"
                   (click)="load()"
                   (keydown)="onInputKeydown($event)"
                   (keyup)="recalculateInputWidth($event)"
                   (blur)="recalculateInputWidth($event)"
                   (keydown.enter)="addTerm()"/>
        </div>
        <div class="select-tags-add-button" [class.hidden]="!persist || !term || !term.length">
            <a (click)="addTerm()">{{ addButtonLabel }}</a> {{ addButtonSecondaryLabel }}
        </div>
        <div class="select-tags-dropdown-menu dropdown-menu"
            [class.hidden]="!dropdownSelectItems.getItems().length">
            <select-items #dropdownSelectItems
                [(ngModel)]="valueAccessor.model" 
                (ngModelChange)="onModelChange($event)"
                [items]="items"
                [keyword]="term"
                [hideSelected]="true"
                [hideControls]="true"
                [multiple]="true"
                [labelBy]="labelBy"
                [searchBy]="labelBy"
                [trackBy]="trackBy"
                [valueBy]="valueBy"
                [limit]="limit"
                [orderBy]="orderBy"
                [orderDirection]="orderDirection"
                [disableBy]="disableBy"></select-items>
        </div>
    </div>
</div>`,
    styles: [`
.select-tags {
}
.select-tags .hidden {
    display: none !important;
}
.select-tags-add-button {
    float: right;
    font-size: 0.75em;
    color: #999;
}
.select-tags-add-button a {
    border-bottom: 1px dotted;
}
.select-tags .select-tags-dropdown .select-tags-input {
    border: none;
    outline: none;
    box-shadow: none;
    height: 25px;
    width: 4px;
    display: inline-block;
}
.select-tags .select-tags-dropdown {
    position: relative;
}
.select-tags .select-tags-dropdown-menu {
    position: absolute;
    top: 100%;
    width: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    margin: 2px 0px 2px -1px;
    min-width: 160px;
    padding: 5px 0 5px 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, .15);   
}
.select-tags .select-tags-dropdown.open .dropdown-menu {
    display: block;
}
.select-tags .select-tags-box {
    padding: 5px 5px 3px 5px;
    outline: 1px solid #CCC;
}
.select-tags .select-tags-box .select-items,
.select-tags .select-tags-box .select-items .select-items-multiple,
.select-tags .select-tags-box .select-items .select-items-single,
.select-tags .select-tags-box .select-items .radio-group,
.select-tags .select-tags-box .select-items .checkbox-group {
    display: inline;
}
.select-tags .select-tags-box .select-items .select-items-item .remove-button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: inline-block;
    width: 17px;
    padding: 3px 0 0 0;
    font-size: 12px;
    font-weight: bold;
    color: inherit;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    border-left: 1px solid #0073bb;
    -webkit-border-radius: 0 2px 2px 0;
    -moz-border-radius: 0 2px 2px 0;
    border-radius: 0 2px 2px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.select-tags .select-tags-box .select-items .select-items-item .remove-button:hover {
    background: rgba(0, 0, 0, 0.05);
}
.select-tags .select-tags-box .select-items .select-items-item.with-remove-button {
    position: relative;
    padding-right: 24px !important;
}
.select-tags .select-tags-box .select-items .select-items-item {
    display: inline-block;
    padding: 2px 6px;
    margin: 0 3px 3px 0;
    color: #ffffff;
    cursor: pointer;
    background: #1da7ee;
    border: 1px solid #0073bb;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), inset 0 1px rgba(255, 255, 255, 0.03);
    border-radius: 3px;
    background-image: linear-gradient(to bottom, #1da7ee, #178ee9);
    background-repeat: repeat-x;
    text-shadow: 0 1px 0 rgba(0, 51, 83, 0.3);
    background-color: #1b9dec;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.select-tags .select-tags-box .select-items .select-items-item.selected,
.select-tags .select-tags-box .select-items .select-items-item.selected {
    background-color: #0085d4;
    background-image: -moz-linear-gradient(top, #008fd8, #0075cf);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#008fd8), to(#0075cf));
    background-image: -webkit-linear-gradient(top, #008fd8, #0075cf);
    background-image: -o-linear-gradient(top, #008fd8, #0075cf);
    background-image: linear-gradient(to bottom, #008fd8, #0075cf);
    background-repeat: repeat-x;
    border: 1px solid #00578d;
}
.select-tags .select-tags-box .select-items .select-items-item.selected .remove-button ,
.select-tags .select-tags-box .select-items .select-items-item.selected .remove-button {
    border-left-color: #00578d;
}
.select-tags .select-tags-dropdown-menu .select-items .no-selection,
.select-tags .select-tags-dropdown-menu .select-items .select-all,
.select-tags .select-tags-dropdown-menu .select-items .checkbox-item,
.select-tags .select-tags-dropdown-menu .select-items .radio-item {
    padding: 3px 15px;
    clear: both;
    font-weight: normal;
    line-height: 1.42857;
    color: #333333;
    white-space: nowrap;
    display: block;
}
.select-tags .select-tags-dropdown-menu .select-items .no-selection:hover,
.select-tags .select-tags-dropdown-menu .select-items .select-all:hover,
.select-tags .select-tags-dropdown-menu .select-items .checkbox-item:hover,
.select-tags .select-tags-dropdown-menu .select-items .radio-item:hover {
    text-decoration: none;
    color: #fff;
    background-color: #0095cc;
    cursor: pointer;
}
.select-tags .select-items .checkbox-item.disabled:hover,
.select-tags .select-items .radio-item.disabled:hover {
    color: #333;
    background-color: #eeeeee;
    cursor: not-allowed;
}
.select-tags.disabled .select-items .checkbox-item.disabled:hover, .select-tags .select-items .radio-item.disabled:hover{
    color: #BBB;
}
.select-tags.disabled,
.select-tags.disabled .select-tags-box .select-items .remove-button,
.select-tags.disabled .select-tags-box .select-items .select-items-item,
.select-tags.disabled .select-tags-box .select-items .no-selection,
.select-tags.disabled .select-tags-box .select-items .select-all,
.select-tags.disabled .select-tags-box .select-items .checkbox-item,
.select-tags.disabled .select-tags-box .select-items .radio-item {
    cursor: not-allowed;
}
.select-tags.disabled .select-tags-box .select-items .select-items-item .remove-button:hover {
    background: #EEE;
}
.select-tags.disabled .select-tags-box .select-items .select-items-item .remove-button {
    border-left: 1px solid #CCC;
}
.select-tags.disabled .select-tags-box .select-items .select-items-item {
    background: #EEE;
    border: 1px solid #CCC;
    color: #BBB;
    box-shadow: none;
    text-shadow: none;
}
`],
    encapsulation: ViewEncapsulation.None,
    directives: [
        SelectItems,
        DROPDOWN_DIRECTIVES
    ],
    providers: [
        SelectValueAccessor,
        SelectValidator,
        WidthCalculator,
        new Provider(NG_VALUE_ACCESSOR, {
            useExisting: SelectValueAccessor,
            multi: true
        }),
        new Provider(NG_VALIDATORS, {
            useExisting: SelectValidator,
            multi: true
        })
    ]
})
export class SelectTags implements OnInit {

    // -------------------------------------------------------------------------
    // Inputs
    // -------------------------------------------------------------------------

    @Input()
    debounceTime = 500;

    @Input()
    minQueryLength = 2;

    @Input()
    persist: boolean = false;

    @Input()
    listTrackBy: string|((item: any) => string);

    @Input()
    listLabelBy: string|((item: any) => string);

    @Input()
    labelBy: string|((item: any) => string);

    @Input()
    disableBy: string|((item: any) => string);

    @Input()
    orderBy: string|((item1: any, item2: any) => number);

    @Input()
    orderDirection: "asc"|"desc";

    @Input()
    disabled: boolean = false;

    @Input()
    limit: number;

    @Input()
    minModelSize: number; // todo: at least should notify about errors if model size isnt enought

    @Input()
    maxModelSize: number;

    @Input()
    loader: (term: string) => Observable<any>;

    @Input()
    items: any[] = [];

    @Input()
    itemConstructor: ((term: string) => any);

    @Input()
    addButtonLabel: string = "add";

    @Input()
    addButtonSecondaryLabel: string = "(or press enter)";

    @Input()
    removeByKey: boolean = true; // todo

    @Input()
    unqiue: boolean = false; // todo

    @Input()
    minLength: number; // todo

    @Input()
    maxLength: number; // todo

    // -------------------------------------------------------------------------
    // Input accessors
    // -------------------------------------------------------------------------

    @Input()
    set placeholder(placeholder: string) {
        this._placeholder = placeholder;
        if (!this.term)
            this.recalculateInputWidth(undefined, placeholder);
    }

    get placeholder() {
        return this._placeholder;
    }

    @Input()
    set valueBy(valueBy: string|((item: any) => string)) {
        this.valueAccessor.valueBy = valueBy;
    }

    get valueBy() {
        return this.valueAccessor.valueBy;
    }

    @Input()
    set trackBy(trackBy: string|((item: any) => string)) {
        this.valueAccessor.trackBy = trackBy;
    }

    get trackBy() {
        return this.valueAccessor.trackBy;
    }

    @Input()
    set required(required: boolean) {
        this.validator.options.required = required;
    }

    get required() {
        return this.validator.options.required;
    }

    // -------------------------------------------------------------------------
    // Public Properties
    // -------------------------------------------------------------------------

    termControl = new Control();
    term: string;
    lastLoadTerm: string = "";
    selectedItems: any[] = [];

    @ViewChild("selectTagsBoxInput")
    selectTagsBoxInput: ElementRef;

    @ViewChild("boxSelectItems")
    boxSelectItems: SelectItems;

    @ViewChild("selectTagsBox")
    selectTagsBox: ElementRef;

    selectItemsToggleLogic = (options: { event: MouseEvent, valueAccessor: SelectValueAccessor, value: any }) => {
        if (options.event.metaKey || options.event.shiftKey || options.event.ctrlKey) {
            options.valueAccessor.addOrRemove(options.value);
        } else {
            options.valueAccessor.clear();
            options.valueAccessor.add(options.value);
        }
    };

    // -------------------------------------------------------------------------
    // Private Properties
    // -------------------------------------------------------------------------

    private _placeholder: string = "";
    private cursorPosition: number = 0;
    private originalModel = false;
    private initialized: boolean = false;
    private itemsAreLoaded: boolean = false;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(private widthCalculator: WidthCalculator,
                public valueAccessor: SelectValueAccessor,
                private validator: SelectValidator) {
        this.valueAccessor.modelWrites.subscribe((model: any) => {
            if (model)
                this.originalModel = true;
            if (this.initialized) {
                this.cursorPosition = model.length;
                this.term = this.getItemLabel(model);
                this.recalculateInputWidth(undefined, this.term);
            }
        });
    }

    // -------------------------------------------------------------------------
    // Lifecycle callbacks
    // -------------------------------------------------------------------------

    ngOnInit() {
        this.initialized = true;

        if (this.valueAccessor.model) {
            this.cursorPosition = this.valueAccessor.model.length;
            this.term = this.getItemLabel(this.valueAccessor.model);
        }

        // load options on term changes
        this.termControl
            .valueChanges
            .debounceTime(this.debounceTime) // make a debounced request on term change
            .filter(term => !this.originalModel && typeof term === "string" && term.trim().length >= this.minQueryLength)
            .subscribe(term => this.load());

        this.termControl
            .valueChanges
            .subscribe((term: string) => {
                this.originalModel = false;
            });
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Load items using loader.
     */
    load() {
        if (!this.loader || this.originalModel || !this.term || this.term.length < this.minQueryLength || this.term === this.lastLoadTerm)
            return;

        return this
            .loader(this.term)
            .subscribe(items => {
                this.lastLoadTerm = this.term;
                this.items = items;
                this.itemsAreLoaded = true;
            });
    }

    /**
     * On model change outside.
     */
    onModelChange(model: any[]) {
        this.cursorPosition = model.length;
        this.valueAccessor.set(model);
        this.lastLoadTerm = "";
        this.term = "";
        this.recalculateInputWidth(undefined, this.term);
        if (this.itemsAreLoaded)
            this.items = [];
    }

    /**
     * Adds new term to the tags input.
     */
    addTerm() {
        const term = this.term ? this.term.trim() : "";
        if (!term || !this.persist) return;

        const newModel = this.itemConstructor ? this.itemConstructor(term) : { [this.labelBy as string]: term };
        this.valueAccessor.addAt(newModel, this.cursorPosition);
        this.cursorPosition++;
        setTimeout(() => this.move()); // using timeout is monkey patch
        this.lastLoadTerm = "";
        this.term = "";
        if (this.itemsAreLoaded)
            this.items = [];
        this.recalculateInputWidth(undefined, term);
    }

    /**
     * Checks if this component is disabled.
     */
    isDisabled() {
        if (this.maxModelSize > 0 &&
            this.valueAccessor.model.length >= this.maxModelSize)
            return true;

        return this.disabled;
    }

    getItemLabel(item: any) { // todo: duplication
        if (!item) return; 
        
        if (this.labelBy) {
            if (typeof this.labelBy === "string") {
                return item[this.labelBy as string];

            } else if (typeof this.labelBy === "function") {
                return (this.labelBy as any)(item);
            }
        }

        return item;
    }

    /**
     * Recalculates input width. Input width always match input's contents.
     */
    recalculateInputWidth(event?: Event, value?: any) {
        this.widthCalculator.recalculateInputWidth(this.selectTagsBoxInput.nativeElement, event, value);
    }

    /**
     * When keydown in the tags input occurs we need to recalculate width of input.
     * Also we handle to some of them specifically:
     * - left, right to move input to the left or right
     * - backspace and delete to remove previous or next tag box
     */
    onInputKeydown(event: KeyboardEvent) {
        this.recalculateInputWidth(event);

        // actions with tags can be done when focus inside, but no text in the input box
        if (!this.term) {
            if (event.keyCode === 37) { // left
                this.moveLeft();

            } else if (event.keyCode === 39) { // right
                this.moveRight();

            } else if (event.keyCode === 8 && this.removeByKey) { // backspace
                this.valueAccessor.removeAt(this.cursorPosition - 1);
                setTimeout(() => this.moveLeft()); // using timeout is monkey patch

            } else if (event.keyCode === 46 && this.removeByKey) { // delete
                this.valueAccessor.removeAt(this.cursorPosition);
                setTimeout(() => this.move()); // using timeout is monkey patch

            }
        }
    }

    /**
     * Moves input to the left.
     */
    moveLeft() {
        if (this.cursorPosition === 0) return;
        --this.cursorPosition;
        this.move();
    }

    /**
     * Moves input to the right.
     */
    moveRight() {
        if (this.cursorPosition >= this.boxSelectItems.itemElements.toArray().length) return;
        ++this.cursorPosition;
        this.move();
    }

    /**
     * Sets the focus to tags input. Selected tag boxes should be unselected after this operation.
     */
    focusTagsInput() {
        this.selectedItems = [];
        this.selectTagsBoxInput.nativeElement.focus();
    }

    /**
     * When user keydowns on select-tags-input we need to capture backspace, delete, esc and Ctrl+A to make
     * operations with tag boxes.
     */
    onSelectTagsBoxKeydown(event: KeyboardEvent) {
        if (this.term) {
            this.focusTagsInput();
            return;
        }
        
        if ((event.keyCode === 46 || event.keyCode === 8) && this.removeByKey && this.selectedItems.length) { // backspace or delete
            this.valueAccessor.removeMany(this.selectedItems);
            this.cursorPosition = this.valueAccessor.model.length;
            this.selectedItems = [];
            this.focusTagsInput();
            event.preventDefault();
            event.stopPropagation();

        } else if (event.keyCode === 27) { // esc
            this.selectedItems = [];

        } else if (event.keyCode === 65 && (event.metaKey || event.ctrlKey)) { // ctrl + A
            this.selectedItems = this.valueAccessor.model.map((i: any) => i);
            event.preventDefault();
            event.stopPropagation();
        }

    }

    /**
     * When user clicks item in boxes a tag we need to stop the event propagation, because we don't want out input
     * to get a focus at this time.
     */
    onTagSelect(event: { event: MouseEvent }) {
        event.event.preventDefault();
        event.event.stopPropagation();
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    /**
     * Moves input box into cursorPosition.
     */
    private move() {
        const items = this.boxSelectItems.itemElements.toArray();
        const input = this.selectTagsBoxInput.nativeElement;
        if (items[this.cursorPosition]) {
            const element = items[this.cursorPosition].nativeElement;
            element.parentElement.insertBefore(input, element);
        } else {
            if (this.cursorPosition === 0 || !items[this.cursorPosition - 1])
                return;

            const element = items[this.cursorPosition - 1].nativeElement;
            element.parentElement.insertBefore(input, element.nextSibling);
        }
        this.selectTagsBoxInput.nativeElement.focus();
    }

}