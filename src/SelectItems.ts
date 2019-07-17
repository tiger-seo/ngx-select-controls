import {
    Component,
    Input,
    ViewEncapsulation,
    ChangeDetectorRef,
    AfterViewInit,
    ElementRef,
    ViewChildren,
    QueryList,
    Output,
    EventEmitter,
    ContentChildren,
    Optional,
    OnInit,
    ContentChild
} from "@angular/core";
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CheckboxGroup} from "./CheckboxGroup";
import {RadioGroup} from "./RadioGroup";
import {RadioItem} from "./RadioItem";
import {CheckboxItem} from "./CheckboxItem";
import {SelectValueAccessor} from "./SelectValueAccessor";
import {SelectValidator} from "./SelectValidator";
import {ItemTemplate, ItemTemplateTransclude, Items} from "./ItemTemplate";
import {SelectControlsOptions} from "./SelectControlsOptions";

@Component({
    selector: "select-items",
    template: `
<div class="select-items">
    <div [class.hidden]="!searchLabel">
        <input class="select-items-search" type="text" [(ngModel)]="keyword" [placeholder]="searchLabel">
    </div>
    <div class="select-items-multiple" *ngIf="valueAccessor.multiple">
        <div class="select-items-item select-all" 
            (click)="selectAllItems(getItems())" 
            [ngStyle]="{ display: ((searchBy && keyword) || !selectAll || !getItems().length) ? 'none' : 'block' }"
            [class.hide-controls]="hideControls"
            [class.active]="activeSelectAll"
            [class.selected]="isAllSelected(getItems())">
            <input type="checkbox" [checked]="isAllSelected(getItems())">
            <span class="select-items-label">{{ selectAllLabel }}</span>
        </div>
        <checkbox-group [(ngModel)]="valueAccessor.model" (ngModelChange)="changeModel($event)" [trackBy]="trackBy" [customToggleLogic]="customToggleLogic">
            <div class="select-items-group" *ngFor="let group of getGroups()">
                <div class="select-items-group-header"
                    [class.select-all]="groupSelectAll"
                    [hidden]="!group" 
                    (click)="groupSelectAll ? selectAllItems(getItems(group)) : 0">
                    <input type="checkbox" 
                           [hidden]="!groupSelectAll || hideGroupSelectAllCheckbox"
                           [checked]="isAllSelected(getItems(group))">
                    <span class="select-items-label">{{ group }}</span>
                </div>
                <div class="select-items-group-item" 
                    *ngFor="let item of getItems(group); let index = index; let last = last" 
                    #itemElement
                    [class.active]="active === index"
                    [class.hide-controls]="hideControls"
                    [class.with-remove-button]="removeButton"
                    [class.selected]="checkboxItem.isChecked()"
                    [class.disabled]="isItemDisabled(item)"
                    [title]="isItemDisabled(item) ? disableMessage : ''"
                    class="select-items-item item">
                    <checkbox-item #checkboxItem
                        (onSelect)="onSelect.emit($event)"
                        [value]="getItemValue(item)" 
                        [readonly]="readonly"
                        [disabled]="isItemDisabled(item)">
                        <span [class.hidden]="!getItemTemplates() || !getItemTemplates().length" [itemTemplateTransclude]="getItemTemplates()" [item]="item"></span>
                        <span [class.hidden]="getItemTemplates() && getItemTemplates().length" class="select-items-label">{{ getItemLabel(item) }}</span><span [class.hidden]="(getItemTemplates() && getItemTemplates().length) || last" class="select-items-separator"></span>
                    </checkbox-item>
                    <span class="remove-button" 
                          [class.hidden]="!removeButton" (click)="removeItem(item)">×</span>
                </div>
                <div [class.hidden]="!noItemsLabel || getItems().length > 0" class="no-items-label">{{ noItemsLabel }}</div>
            </div>
        </checkbox-group>
    </div>
    <div class="select-items-single" *ngIf="!valueAccessor.multiple">
        <div class="select-items-item no-selection" 
            [class.hide-controls]="hideControls"
            [class.hidden]="!noSelection"
            (click)="resetModel()"
            [class.active]="activeNoSelection"
            [class.selected]="!valueAccessor.model">
            <input type="radio" [checked]="!valueAccessor.model">
            <span class="select-items-label">{{ noSelectionLabel }}</span>
        </div>
        <radio-group [(ngModel)]="valueAccessor.model" (ngModelChange)="changeModel($event)" [trackBy]="trackBy">
            <div class="select-items-group" *ngFor="let group of getGroups()">
                <div class="select-items-group-header" [hidden]="!group">
                    <span class="select-items-label">{{ group }}</span>
                </div>
                <div class="select-items-group-item" 
                    *ngFor="let item of getItems(group); let index = index; let last = last"
                    #itemElement
                    [class.active]="active === index"
                    [class.hide-controls]="hideControls"
                    [class.with-remove-button]="removeButton"
                    [class.selected]="radioItem.isChecked()"
                    [class.disabled]="isItemDisabled(item)"
                    [title]="isItemDisabled(item) ? disableMessage : ''"
                    class="select-items-item item">
                    <radio-item #radioItem
                        (onSelect)="onSelect.emit($event)"
                        [value]="getItemValue(item)" 
                        [readonly]="readonly"
                        [disabled]="isItemDisabled(item)">
                        <span [class.hidden]="!getItemTemplates() || !getItemTemplates().length" [itemTemplateTransclude]="getItemTemplates()" [item]="item"></span>
                        <span [class.hidden]="getItemTemplates() && getItemTemplates().length"  class="select-items-label">{{ getItemLabel(item) }}</span><span [class.hidden]="(getItemTemplates() && getItemTemplates().length) || last" class="select-items-separator"></span>
                    </radio-item>
                    <span class="remove-button" [class.hidden]="!removeButton" (click)="removeItem(item)">×</span>
                </div>
                <div [class.hidden]="!noItemsLabel || getItems().length > 0" class="no-items-label">{{ noItemsLabel }}</div>
            </div>
        </radio-group>
    </div>
    <div class="more-button" (click)="showMore()" [class.hidden]="isMaxLimitReached || !moreLabel || isMoreShown">
        <a>{{ moreLabel }}</a>
        <div class="caret-body caret-top"></div>
    </div>
    <div class="hide-button" (click)="hideMore()" [class.hidden]="isMaxLimitReached || !hideLabel || !isMoreShown">
        <a>{{ hideLabel }}</a> 
        <div class="caret-body caret-bottom"></div>
    </div>
</div>`,
    styles: [`
.select-items .hidden {
    display: none !important;
}
.select-items input.select-items-search {
    padding: 6px 12px;
    margin-bottom: 5px;

}
.select-items .select-all, .select-items .no-selection {
    cursor: pointer;
}
.select-items .select-items-item.hide-controls.selected {
    background: #337ab7;
    color: #FFF;
}
.select-items .select-items-item.disabled {
    color: #CCC;
}
.select-items .select-items-item.selected.active {
    background: #469FE0;
    color: #FFF;
}
.select-items .select-items-item.active {
    color: #495c68;
    background-color: #f5fafd;
}
.select-items .select-items-label {
    padding-right: 3px;
}
.select-items .select-items-group-header {
    font-weight: bold;
    margin-top: 2px;
}
.select-items .select-items-group-header.select-all {
    cursor: pointer;
}
.select-items .select-items-group-header input[type=checkbox] {
    vertical-align: text-top;
}
.select-items .remove-button {
    font-size: 12px;
    font-weight: bold;
    color: #999;
    vertical-align: text-bottom;
    cursor: pointer;
}
.select-items .remove-button:hover {
    color: #333;
}
.select-items .checkbox-item, .select-items .radio-item {
    display: inline;
}
.select-items .select-items-item.hide-controls input[type=checkbox], 
.select-items .select-items-item.hide-controls input[type=radio] {
    display: none;
}
.select-items .more-button, .select-items .hide-button {
    color: #999;
    cursor: pointer;
}
.select-items .more-button a, .select-items .hide-button a {
    border-bottom: 1px dashed;
}
.select-items .more-button a:hover, .select-items .hide-button a:hover {
    text-decoration: none;
}
.select-items .caret-body {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
}
.select-items .caret-bottom {
    border-bottom: 4px dashed;
}
.select-items .caret-top {
    border-top: 4px dashed;
}
`],
    encapsulation: ViewEncapsulation.None,
    providers: [
        SelectValueAccessor,
        SelectValidator,
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectValueAccessor, multi: true },
        { provide: NG_VALIDATORS, useExisting: SelectValidator, multi: true }
    ]
})
export class SelectItems implements AfterViewInit, OnInit {

    // -------------------------------------------------------------------------
    // Inputs / Outputs
    // -------------------------------------------------------------------------

    @Input()
    items: any[];

    @Output()
    itemsChange = new EventEmitter();

    @Input()
    set multiple(multiple: boolean) {
        this.valueAccessor.multiple = multiple;
    }

    @Input()
    disableBy: string|((item: any) => string);

    @Input()
    labelBy: string|((item: any) => string);

    @Input()
    searchBy: string|((item: any, keyword: string) => boolean);

    @Input()
    orderBy: string|((item1: any, item2: any) => number);

    @Input()
    groupBy: string|((item1: any, item2: any) => number);

    @Input()
    groupSelectAll: boolean = false;

    @Input()
    hideGroupSelectAllCheckbox: boolean = false;

    @Input()
    orderDirection: "asc"|"desc" = "asc";

    @Input()
    limit: number;

    @Input()
    disabled: boolean = false;

    @Input()
    readonly: boolean = false;

    @Input()
    hideSelected: boolean = false;

    @Input()
    hideNonSelected: boolean = false;

    @Input()
    removeButton: boolean = false;

    @Input()
    hideControls: boolean = false;

    @Input()
    searchLabel: string;

    @Input()
    moreLabel: string;

    @Input()
    hideLabel: string;

    @Input()
    selectAll: boolean = false;

    @Input()
    selectAllLabel: string;

    @Input()
    noSelection: boolean = false;

    @Input()
    noSelectionLabel: string;

    @Input()
    noItemsLabel: string;

    @Input()
    maxModelSize: number;

    @Input()
    minModelSize: number;

    @Input()
    filter: (items: any[]) => any[];

    @Input()
    exclude: any[];

    @Input()
    disable: any[];

    @Input()
    disableMessage: string;

    @Input()
    reverse: boolean;

    @Input()
    customToggleLogic: (options: { event: MouseEvent, valueAccessor: SelectValueAccessor }) => void;

    @Output()
    onSelect = new EventEmitter<{ event: Event }>();

    @Input()
    keyword: string;

    // -------------------------------------------------------------------------
    // Input accessors
    // -------------------------------------------------------------------------

    @Input()
    set valueBy(valueBy: string|((item: any) => string)) {
        this.valueAccessor.valueBy = valueBy;
    }

    get valueBy() {
        return this.valueAccessor.valueBy;
    }

    @Input()
    set trackBy(trackBy: string|((item1: any, item2: any) => boolean)) {
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

    active: number = -1;
    activeSelectAll: boolean = false;
    activeNoSelection: boolean = false;
    isMoreShown: boolean = false;
    isMaxLimitReached: boolean = false;

    @ViewChildren("itemElement")
    itemElements: QueryList<ElementRef>;

    @ContentChildren(ItemTemplate)
    itemTemplates: QueryList<ItemTemplate>;

    @Input()
    customItemTemplates: QueryList<ItemTemplate>;

    @ContentChild(Items, {static: true})
    contentItems: Items;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(public valueAccessor: SelectValueAccessor,
                private cdr: ChangeDetectorRef,
                private validator: SelectValidator,
                @Optional() private defaultOptions: SelectControlsOptions) {
    }

    // -------------------------------------------------------------------------
    // Lifecycle callbacks
    // -------------------------------------------------------------------------

    ngOnInit(): void {
        this.applyOptions();
    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    get displayedItems() {
        return this.getItems();
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    getItemTemplates() {
        if (this.customItemTemplates)
            return this.customItemTemplates;

        if (this.contentItems && this.contentItems.itemTemplates)
            return this.contentItems.itemTemplates;

        return this.itemTemplates;
    }

    changeModel(model: any) {
        this.valueAccessor.set(model);
        this.checkActive();
    }

    isItemDisabled(item: any) {
        if (this.disabled)
            return true;

        if (this.disable && this.disable.length > 0) {
            const isDisabled = this.disable.some(disabled => {
                if (this.trackBy instanceof Function) {
                    return (this.trackBy as ((item1: any, item2: any) => boolean))(item, disabled);
                } else if (this.trackBy) {
                    return disabled[this.trackBy as string] === item[this.trackBy as string];
                } else {
                    return item === disabled;
                }
            });
            if (isDisabled === true)
                return true;
        }

        if (this.disableBy) {
            if (typeof this.disableBy === "string") {
                return !!item[this.disableBy as string];

            } else if (typeof this.disableBy === "function") {
                return !!(this.disableBy as any)(item);
            }
        }

        if (this.valueAccessor.multiple) {
            if (this.maxModelSize > 0 && this.valueAccessor.model && this.valueAccessor.model.length >= this.maxModelSize) {
                return this.valueAccessor.has(item) ? false : true;
            }
            if (this.minModelSize > 0 && this.valueAccessor.model && this.valueAccessor.model.length <= this.minModelSize) {
                return this.valueAccessor.has(item) ? true : false;
            }

        }

        return false;
    }

    getItemLabel(item: any) {
        if (this.labelBy) {
            if (typeof this.labelBy === "string") {
                return item[this.labelBy as string];

            } else if (typeof this.labelBy === "function") {
                return (this.labelBy as any)(item);
            }
        }

        return item;
    }

    getItemValue(item: any) {
        if (this.valueBy) {
            if (typeof this.valueBy === "string") {
                return item[this.valueBy as string];

            } else if (typeof this.valueBy === "function") {
                return (this.valueBy as any)(item);
            }
        }

        return item;
    }

    getGroups() {
        if (!this.groupBy)
            return [undefined];

        return this.getItems().map(item => {
            if (typeof this.groupBy === "string") {
                return item[this.groupBy as string];
            } else {
                return (this.groupBy as (item: any) => any)(item);
            }
        }).filter((item, index, items) => items.lastIndexOf(item) === index);
    }

    getSelectedItems(): any[] {
        const items = this.getItems();
        const valueItems: any[] = [];
        items.forEach(item => {
            const valueItem = this.valueAccessor.get(this.getItemValue(item));
            if (valueItem)
                valueItems.push(valueItem);
        });
        return valueItems;
    }

    getItems(group?: any) {
        let items: any[] = this.items;
        if (!items && this.contentItems && this.contentItems.itemTemplates && this.contentItems.itemTemplates.length) {
            items = this.contentItems.itemTemplates.toArray().map(itemTemplate => {
                return itemTemplate.item;
            });
        }
        if (!items)
            return [];

        items = items.map(item => item);
        if (this.searchBy && this.keyword) {
            items = items.filter(item => {
                if (typeof this.searchBy === "string") {
                    if (typeof item[this.searchBy as string] === "string")
                        return item[this.searchBy as string].toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1;

                } else {
                    return (this.searchBy as any)(item, this.keyword);
                }
                return false;
            });
        }

        if (this.orderBy) {
            if (typeof this.orderBy === "string") {
                items.sort((item1, item2) => {
                    const a = item1[this.orderBy as string];
                    const b = item2[this.orderBy as string];

                    if (typeof a === "string" && typeof b === "string") { // order logic for strings
                        const aLower = a.toLowerCase();
                        const bLower = b.toLowerCase();
                        if (aLower < bLower)
                            return -1;
                        if (aLower > bLower)
                            return 1;
                        return 0;

                    } else if (typeof a === "number" && typeof b === "number") { // order logic for numbers
                        return a - b;
                    }

                    return 0; // else simply don't order
                });
            } else {
                items.sort(this.orderBy as any);
            }

            if (this.orderDirection === "desc")
                items = items.reverse();
        }

        if (this.hideSelected) {
            items = items.filter(item => !this.valueAccessor.has(item));
        }

        if (this.hideNonSelected) {
            items = items.filter(item => this.valueAccessor.has(item));
        }

        this.isMaxLimitReached = false;
        if (this.limit) {
            const startFrom = items.length - this.limit;
            this.isMaxLimitReached = startFrom <= 0;
            if (startFrom > 0 && !this.isMoreShown)
                items.splice(startFrom * -1);
        }

        if (this.filter)
            items = this.filter(items);

        if (this.exclude) {
            items = items.filter(item => {
                return this.exclude.every(excluded => {
                    if (this.trackBy instanceof Function) {
                        return !(this.trackBy as ((item1: any, item2: any) => boolean))(item, excluded);
                    } else if (this.trackBy) {
                        return excluded[this.trackBy as string] !== item[this.trackBy as string];
                    } else {
                        return item !== excluded;
                    }
                });
            });
        }

        if (this.groupBy && group) {
            items = items.filter(item => {
                if (typeof this.groupBy === "string") {
                    return item[this.groupBy as string] === group;
                } else {
                    return (this.groupBy as (item: any) => any)(item) === group;
                }
            });
        }

        if (this.reverse)
            items = items.reverse();

        return items;
    }

    removeItem(item: any) {
        if (this.isItemDisabled(item)) return;
        this.items.splice(this.items.indexOf(item), 1);
        this.itemsChange.emit(this.items);
        this.checkActive();
    }

    showMore() {
        this.isMoreShown = true;
    }

    hideMore() {
        this.isMoreShown = false;
    }

    selectAllItems(items: any[]) {
        if (!this.isAllSelected(items)) {
            items.forEach(item => this.valueAccessor.add(this.getItemValue(item)));
        } else {
            items.forEach(item => this.valueAccessor.remove(this.getItemValue(item)));
        }
    }

    isAllSelected(items: any[]): boolean {
        let has = true;
        items.forEach(item => {
            if (has)
                has = this.valueAccessor.has(this.getItemValue(item));
        });

        return has;
    }

    resetModel() {
        this.valueAccessor.set(undefined);
    }

    previousActive() {
        const items = this.getItems();
        let newIndex = this.active - 1;
        if (newIndex === -1) {
            if (this.valueAccessor.multiple && this.selectAllLabel) {
                this.activeSelectAll = true;
                this.active = -1;
            } else if (!this.valueAccessor.multiple && this.noSelectionLabel) {
                this.activeNoSelection = true;
                this.active = -1;
            } else {
                newIndex = 0;
            }
        } else if (newIndex === -2 && !this.activeNoSelection && !this.activeSelectAll) {
            this.active = items.length - 1;
        }

        if (newIndex !== -1) {
            if (items[newIndex] !== null && items[newIndex] !== undefined) {
                this.active = newIndex;
            }
        }
    }

    nextActive(): void {
        const items = this.getItems();
        const newIndex = this.active + 1;
        if (this.activeNoSelection || this.activeSelectAll) {
            this.activeNoSelection = this.activeSelectAll = false;
        }
        if (items[newIndex] !== null && items[newIndex] !== undefined) {
            this.active = newIndex;
        }
    }

    resetActive(): void {
        this.active = -1;
        this.activeNoSelection = false;
        this.activeSelectAll = false;
    }

    selectActive() {
        const items = this.getItems();
        if (this.activeSelectAll) {
            this.selectAllItems(items);

        } else if (this.activeNoSelection) {
            this.resetModel();

        } else if (this.active > -1 && items[this.active]) {
            if (this.valueAccessor.multiple) {
                this.valueAccessor.addOrRemove(items[this.active]);
            } else {
                this.valueAccessor.set(items[this.active]);
            }
            this.checkActive();
        }
    }

    checkActive(): void {
        const items = this.getItems();
        if (this.active > -1 && this.active >= items.length) {
            this.active = items.length - 1;
        }
    }

    hasActive(): boolean {
        return !!this.activeNoSelection || !!this.activeSelectAll || this.active > -1;
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    /**
     * Applies default options.
     */
    private applyOptions() {
        const options = this.defaultOptions && this.defaultOptions.selectItems ? this.defaultOptions.selectItems : undefined;
        if (!this.noSelectionLabel) {
            if (options && options.noSelectionLabel !== undefined) {
                this.noSelectionLabel = options.noSelectionLabel;
            } else {
                this.noSelectionLabel = "no selection";
            }
        }
        if (!this.selectAllLabel) {
            if (options && options.selectAllLabel !== undefined) {
                this.selectAllLabel = options.selectAllLabel;
            } else {
                this.selectAllLabel = "select all";
            }
        }
        if (!this.searchLabel) {
            if (options && options.searchLabel !== undefined) {
                this.searchLabel = options.searchLabel;
            } else {
                this.searchLabel = "";
            }
        }
    }

}
