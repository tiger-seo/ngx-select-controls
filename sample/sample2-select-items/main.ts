import "rxjs/Rx";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {FormsModule} from "@angular/forms";
import {Component, NgModule} from "@angular/core";
import {SELECT_CONTROL_DIRECTIVES} from "../../src/index";
import {BrowserModule} from "@angular/platform-browser";
import {Car} from "./Car";

@Component({
    selector: "app",
    template: `
<div class="container">

    <h4>Simple select items: </h4>
    <select-items [(ngModel)]="selectedCars"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name">
    </select-items>
    
    <h4>model: </h4>
    <pre>{{ selectedCars | json }}</pre>

    <h4>Select list with search</h4>
    <select-items [(ngModel)]="selectedCars1"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name"
                  searchBy="name"
                  searchLabel="search...">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars1 | json }}</pre>

    <h4>Select list with ordering</h4>
    <select-items [(ngModel)]="selectedCars2"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name"
                  orderBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars2 | json }}</pre>

    <h4>Select list with descendant ordering</h4>
    <select-items [(ngModel)]="selectedCars3"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name"
                  orderBy="name"
                  orderDirection="desc">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars3 | json }}</pre>
    
    
    <h4>Select items with select all option</h4>
    <select-items [(ngModel)]="selectedCars4"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name"
                  [selectAll]="true"
                  selectAllLabel="select all"> <!-- label is optional -->
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars4 | json }}</pre>
    
    <h4>Select items with limited number of shown items:</h4>
    <select-items [(ngModel)]="selectedCars5"
                  [items]="cars"
                  [multiple]="true"
                  [limit]="4"
                  labelBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars5 | json }}</pre>
    
    <h4>Select items with limited number of shown items, with more button:</h4>
    <select-items [(ngModel)]="selectedCars6"
                  [items]="cars"
                  [multiple]="true"
                  [limit]="4"
                  labelBy="name"
                  moreLabel="more">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars6 | json }}</pre>
    
    <h4>Select items with limited number of shown items, with more & hide button:</h4>
    <select-items [(ngModel)]="selectedCars7"
                  [items]="cars"
                  [multiple]="true"
                  [limit]="4"
                  labelBy="name"
                  moreLabel="more"
                  hideLabel="hide">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars7 | json }}</pre>
    
    <h4>Select items where items can be removed:</h4>
    <select-items [(ngModel)]="selectedCars8"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name"
                  [removeButton]="true">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars8 | json }}</pre>
    
    <h4>Select items with no controls:</h4>
    <select-items [(ngModel)]="selectedCars9"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name"
                  [hideControls]="true">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars9 | json }}</pre>
    
    <h4>Select items where where selected items are not showing after they are selected:</h4>
    <select-items [(ngModel)]="selectedCars10"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name"
                  [hideSelected]="true">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars10 | json }}</pre>
    
    <h4>Select items with maximal number of allowed selected items:</h4>
    <select-items [(ngModel)]="selectedCars11"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name"
                  [maxModelSize]="3">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars11 | json }}</pre>
    
    <h4>Select items with minimal number of allowed selected items:</h4>
    <select-items [(ngModel)]="selectedCars12"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name"
                  [minModelSize]="3">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars12 | json }}</pre>
    
    <h4>Select items with track by, to track by another model:</h4>
    <select-items [(ngModel)]="secondSelectedCars"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name"
                  trackBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ secondSelectedCars | json }}</pre>
    
    <h4>Select items with value by, to get more specific values:</h4>
    <select-items [(ngModel)]="selectedCarNames"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name"
                  valueBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCarNames | json }}</pre>
    
    <h4>Select items with grouping:</h4>
    <select-items [(ngModel)]="selectedCars13"
                  [items]="cars"
                  [multiple]="true"
                  groupBy="year"
                  labelBy="name"
                  valueBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars13 | json }}</pre>
    
    <h4>Select items with grouping and select-alls in groups:</h4>
    <select-items [(ngModel)]="selectedCars14"
                  [items]="cars"
                  [multiple]="true"
                  [groupSelectAll]="true"
                  groupBy="year"
                  labelBy="name"
                  valueBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars14 | json }}</pre>
    
    <h4>Select items with grouping and select-alls in groups, but without a checkbox:</h4>
    <select-items [(ngModel)]="selectedCars15"
                  [items]="cars"
                  [multiple]="true"
                  [groupSelectAll]="true"
                  [hideGroupSelectAllCheckbox]="true"
                  groupBy="year"
                  labelBy="name"
                  valueBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars15 | json }}</pre>
    
    <h4>Select items with custom item template:</h4>
    <select-items #selectItems
                  [(ngModel)]="selectedCars17"
                  [multiple]="true"
                  [items]="cars"
                  labelBy="name">
        <span *ngFor="let item of selectItems.displayedItems">
           <span *itemTemplate="item">
                #{{ item.id }} <b>{{ item.name }}</b> <i>({{ item.year }})</i>
            </span>          
        </span>
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars17 | json }}</pre>
    
    <h4>Select items with custom item template and hidden controls:</h4>
    <select-items #secondSelectItems
                  [(ngModel)]="selectedCars17"
                  [multiple]="true"
                  [items]="cars"
                  [hideControls]="true"
                  labelBy="name">
        <span *ngFor="let item of secondSelectItems.displayedItems">
           <span *itemTemplate="item">
                #{{ item.id }} <b>{{ item.name }}</b> <i>({{ item.year }})</i>
            </span>          
        </span>
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars17 | json }}</pre>
    
    <h4>All-in-one select items:</h4>
    <select-items [(ngModel)]="selectedCars18"
                  [multiple]="true"
                  [items]="cars"
                  [removeButton]="true"
                  [hideControls]="false"
                  [hideSelected]="false"
                  [limit]="4"
                  [maxModelSize]="0"
                  [minModelSize]="0"
                  labelBy="name"
                  searchBy="name"
                  orderBy="name"
                  orderDirection="desc"
                  moreLabel="more"
                  hideLabel="hide"
                  [selectAll]="true"
                  selectAllLabel="select all">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCars18 | json }}</pre>
    
    <h4>Using with forms and required:</h4>
    <form>
        <select-items  #selectedCarsInput="ngModel"
                      name="selectedCars"
                      [(ngModel)]="selectedCars19"
                      [multiple]="true"
                      [items]="cars"
                      [required]="true"
                      labelBy="name">
        </select-items>
    </form>
    <div [hidden]="selectedCarsInput.valid || selectedCarsInput.pristine" class="alert alert-danger">
        This field is required
    </div>

    <h4>model: </h4>
    <pre>{{ selectedCars19 | json }}</pre>
    
    <h4>Select items with items inside template: </h4>
    <select-items [(ngModel)]="selectedCars20" [multiple]="true">
        <items>
            <span *itemTemplate="'bmw'">BMW</span>
            <span *itemTemplate="'mercedes'">Mercedes</span>
            <span *itemTemplate="'porshe'">Porshe</span>
        </items>
    </select-items>
    
    <h4>model: </h4>
    <pre>{{ selectedCars20 | json }}</pre>
 
    <h4>Select items with items inside template, second example:</h4>
    <select-items [(ngModel)]="selectedCars21" [multiple]="true">
        <items>
            <span *itemTemplate="carBmw">BMW</span>
            <span *itemTemplate="{ type: 'mercedes', year: 2000 }">Mercedes</span>
            <span *itemTemplate="{ type: 'porshe', year: 2009 }">Porshe</span>
        </items>
    </select-items>
    
    <h4>model: </h4>
    <pre>{{ selectedCars21 | json }}</pre>
     
    <!-- SAME WITH RADIO -->
    
    <hr>
    Single item:
    <hr>
    
    <h4>Simple select items: </h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  labelBy="name">
    </select-items>
    
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>

    <h4>Select list with search</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  labelBy="name"
                  searchBy="name"
                  searchLabel="search...">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>

    <h4>Select list with ordering</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  labelBy="name"
                  orderBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>

    <h4>Select list with descendant ordering</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  labelBy="name"
                  orderBy="name"
                  orderDirection="desc">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>
    
    
    <h4>Select items with nothing is selected</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  labelBy="name"
                  [noSelection]="true"
                  noSelectionLabel="nothing is selected">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>
    
    <h4>Select items with limited number of shown items:</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  [limit]="4"
                  labelBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>
    
    <h4>Select items with limited number of shown items, with more button:</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  [limit]="4"
                  labelBy="name"
                  moreLabel="more">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>
    
    <h4>Select items with limited number of shown items, with more & hide button:</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  [limit]="4"
                  labelBy="name"
                  moreLabel="more"
                  hideLabel="hide">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>
    
    <h4>Select items where items can be removed:</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  labelBy="name"
                  [removeButton]="true">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>
    
    <h4>Select items where with no controls:</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  labelBy="name"
                  [hideControls]="true">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>
    
    <h4>Select items where where selected items are not showing after they are selected:</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  labelBy="name"
                  [hideSelected]="true">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>
    
    <h4>Select items with maximal number of allowed selected items:</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  labelBy="name"
                  [maxModelSize]="3">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>
    
    <h4>Select items with minimal number of allowed selected items:</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  labelBy="name"
                  [minModelSize]="3">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>
    
    <h4>Select items with track by, to track by another model:</h4>
    <select-items [(ngModel)]="secondSelectedCar"
                  [items]="cars"
                  labelBy="name"
                  trackBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ secondSelectedCar | json }}</pre>
    
    <h4>Select items with value by, to get more specific values:</h4>
    <select-items [(ngModel)]="selectedCarName"
                  [items]="cars"
                  labelBy="name"
                  valueBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCarName | json }}</pre>
    
    <h4>Select items with explicitly set multiple option:</h4>
    <select-items [(ngModel)]="allNewSelectedCars"
                  [items]="cars"
                  [multiple]="true"
                  labelBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ allNewSelectedCars | json }}</pre>
    
    <h4>Select items single with grouping:</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  groupBy="year"
                  labelBy="name"
                  valueBy="name">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>
    
    <h4>All-in-one select items:</h4>
    <select-items [(ngModel)]="selectedCar"
                  [items]="cars"
                  [removeButton]="true"
                  [hideControls]="false"
                  [hideSelected]="false"
                  [limit]="4"
                  [maxModelSize]="0"
                  [minModelSize]="0"
                  labelBy="name"
                  searchBy="name"
                  searchLabel="search..."
                  orderBy="name"
                  orderDirection="desc"
                  moreLabel="more"
                  hideLabel="hide"
                  [selectAll]="true"
                  selectAllLabel="select all">
    </select-items>
    <h4>model: </h4>
    <pre>{{ selectedCar | json }}</pre>
    
    <hr/>
    
    <h4>Single select, but array model:</h4>
    <select-items [(ngModel)]="selectedCars22"
                  [multiple]="false"
                  [items]="cars"
                  labelBy="name"
                  trackBy="id">
    </select-items>
    <br/><br/>
    <select-items [(ngModel)]="selectedCars22"
                  [multiple]="false"
                  [items]="cars2"
                  labelBy="name"
                  trackBy="id">
    </select-items>
    <h4>model: selectedCars22</h4>
    
</div>
`,
    directives: [SELECT_CONTROL_DIRECTIVES]
})
export class Sample2App {

    carBmw = { type: "bmw", year: 2005 };

    cars: Car[] = [
        new Car(1, "BMW", 2000),
        new Car(2, "Mercedes", 1999),
        new Car(3, "Opel", 2008),
        new Car(4, "Porshe", 1940),
        new Car(5, "Ferrari", 2000),
        new Car(6, "Toyota", 2008),
        new Car(7, "Nissan", 1940)
    ];
    cars2: Car[] = [
        new Car(11, "Ford", 2000),
        new Car(12, "Nexia", 1999),
        new Car(13, "Lada", 2008),
        new Car(14, "Range Rover", 1940),
        new Car(15, "Mitsubishi", 2000),
    ];

    selectedCars: Car[] = [];
    selectedCars1: Car[] = [];
    selectedCars2: Car[] = [];
    selectedCars3: Car[] = [];
    selectedCars4: Car[] = [];
    selectedCars5: Car[] = [];
    selectedCars6: Car[] = [];
    selectedCars7: Car[] = [];
    selectedCars8: Car[] = [];
    selectedCars9: Car[] = [];
    selectedCars10: Car[] = [];
    selectedCars11: Car[] = [];
    selectedCars12: Car[] = [];
    selectedCars13: Car[] = [];
    selectedCars14: Car[] = [];
    selectedCars15: Car[] = [];
    selectedCars16: Car[] = [];
    selectedCars17: Car[] = [];
    selectedCars18: Car[] = [];
    selectedCars19: Car[] = [];
    selectedCars20: Car[] = [];
    selectedCars21: Car[] = [];
    secondSelectedCars: Car[] = [
        new Car(2, "Mercedes", 1999)
    ];
    selectedCars22: Car[] = [];
    selectedCarNames: string[] = [];

    selectedCar: Car;
    secondSelectedCar: Car = new Car(2, "Mercedes", 1999);
    selectedCarName: string;

    constructor() {
    }

}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        Sample2App
    ],
    bootstrap: [
        Sample2App
    ]
})
export class Sample2Module {

}

platformBrowserDynamic().bootstrapModule(Sample2Module);