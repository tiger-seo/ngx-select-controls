import "rxjs/Rx";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {Component, NgModule} from "@angular/core";
import {SELECT_CONTROL_DIRECTIVES} from "../../src/index";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {Car} from "./Car";

@Component({
    selector: "app",
    template: `
<div class="container">
    
        <h4>Select Dropdown multiple:</h4>
        <select-dropdown [(ngModel)]="selectedCars1" 
                    [multiple]="true"
                    [items]="cars"
                    labelBy="name"
                    trackBy="name"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCars1 | json }}</pre>
    
        <h4>Select Dropdown single select:</h4>
        <select-dropdown [(ngModel)]="selectedCar1" 
                    [items]="cars"
                    labelBy="name"
                    trackBy="name"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCar1 | json }}</pre>
    
        <h4>Select Dropdown multiselect with explicit multiple:</h4>
        <select-dropdown [(ngModel)]="anotherSelectedCars" 
                    [items]="cars"
                    [multiple]="true"
                    labelBy="name"
                    trackBy="name"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ anotherSelectedCars | json }}</pre>
    
        <h4>Select Dropdown multiple with custom label:</h4>
        <select-dropdown [(ngModel)]="selectedCars2" 
                    [multiple]="true"
                    [items]="cars"
                    label="click here to select"
                    labelBy="name"
                    trackBy="name"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCars2 | json }}</pre>
    
        <h4>Select Dropdown single select with no selection option:</h4>
        <select-dropdown [(ngModel)]="selectedCar2" 
                    [items]="cars"
                    [noSelection]="true"
                    labelBy="name"
                    trackBy="name"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCar2 | json }}</pre>
    
        <h4>Select Dropdown multiple with select all option:</h4>
        <select-dropdown [(ngModel)]="selectedCars3" 
                    [multiple]="true"
                    [items]="cars"
                    [selectAll]="true"
                    labelBy="name"
                    trackBy="name"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCars3 | json }}</pre>
    
        <h4>Select Dropdown multiple with limit:</h4>
        <select-dropdown [(ngModel)]="selectedCars4" 
                    [multiple]="true"
                    [items]="cars"
                    [limit]="3"
                    labelBy="name"
                    trackBy="name"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCars4 | json }}</pre>
    
        <h4>Select Dropdown disabled:</h4>
        <select-dropdown [(ngModel)]="selectedCars5" 
                    [multiple]="true"
                    [items]="cars"
                    [disabled]="true"
                    labelBy="name"
                    trackBy="name"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCars5 | json }}</pre>
    
        <h4>Select Dropdown ordered:</h4>
        <select-dropdown [(ngModel)]="selectedCars6" 
                    [multiple]="true"
                    [items]="cars"
                    labelBy="name"
                    trackBy="name"
                    orderBy="name"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCars6 | json }}</pre>
    
        <h4>Select Dropdown ordered desc:</h4>
        <select-dropdown [(ngModel)]="selectedCars7" 
                    [multiple]="true"
                    [items]="cars"
                    labelBy="name"
                    trackBy="name"
                    orderBy="name"
                    orderDirection="desc"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCars7 | json }}</pre>
    
        <h4>Select Dropdown specific values:</h4>
        <select-dropdown [(ngModel)]="selectedCars8" 
                    [multiple]="true"
                    [items]="cars"
                    labelBy="name"
                    valueBy="name"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCars8 | json }}</pre>
    
        <h4>Select Dropdown with search:</h4>
        <select-dropdown [(ngModel)]="selectedCars9" 
                    [multiple]="true"
                    [items]="cars"
                    labelBy="name"
                    trackBy="name"
                    searchBy="name"
                    searchLabel="search..."></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCars9 | json }}</pre>
    
        <h4>Select Dropdown single with search:</h4>
        <select-dropdown [(ngModel)]="selectedCar3" 
                    [multiple]="true"
                    [items]="cars"
                    labelBy="name"
                    trackBy="name"
                    searchBy="name"
                    searchLabel="search..."></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCar3 | json }}</pre>
    
        <h4>Select Dropdown with hidden controls:</h4>
        <select-dropdown [(ngModel)]="selectedCars10" 
                    [multiple]="true"
                    [items]="cars"
                    labelBy="name"
                    trackBy="name"
                    [hideControls]="true"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCars10 | json }}</pre>
    
        <h4>Select Dropdown multiple readonly:</h4>
        <select-dropdown [(ngModel)]="selectedCars10" 
                    [multiple]="true"
                    [items]="cars"
                    labelBy="name"
                    trackBy="name"
                    [readonly]="true"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCars10 | json }}</pre>
    
        <h4>Select Dropdown multiple readonly and readonly custom label:</h4>
        <select-dropdown [(ngModel)]="selectedCars11" 
                    [multiple]="true"
                    [items]="cars"
                    labelBy="name"
                    trackBy="name"
                    [readonly]="true"
                    readonlyLabel="cars are not selected yet"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ selectedCars11 | json }}</pre>
    
        <h4>Select Dropdown single readonly:</h4>
        <select-dropdown [(ngModel)]="newSelectedCar" 
                    [items]="cars"
                    labelBy="name"
                    trackBy="name"
                    [readonly]="true"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ newSelectedCar | json }}</pre>
        
        <h4>Autocomplete with forms and required:</h4>
        <form>
            <select-dropdown #selectedCarInput="ngModel"
                        name="selectedCar"
                        [(ngModel)]="selectedCars12" 
                        [multiple]="true"
                        [items]="cars"
                        labelBy="name"
                        trackBy="name"
                        [required]="true"></select-dropdown>
        </form>
        <div [hidden]="selectedCarInput.valid || selectedCarInput.pristine" class="alert alert-danger">
            This field is required
        </div>
    
        <h4>model: </h4>
        <pre>{{ selectedCars12 | json }}</pre>
    
        <h4>Select Dropdown readonly with custom readonly label:</h4>
        <select-dropdown [(ngModel)]="notSelectedCar" 
                    [items]="cars"
                    labelBy="name"
                    trackBy="name"
                    [readonly]="true"
                    readonlyLabel="car is not selected yet"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ notSelectedCar | json }}</pre>
        
        <div *ngFor="let item of [1, 2, 3, 4, 5]; let index = index">
            <h4>Select Dropdown {{ index }}:</h4>
            <select-dropdown [(ngModel)]="selectedCarsInLoop[index]" 
                        [multiple]="true"
                        [items]="cars"
                        labelBy="name"
                        trackBy="name"></select-dropdown>
    
            <br/><b>model: </b>
            <pre>{{ selectedCarsInLoop[index] | json }}</pre>
        </div>
        
        <h4>Select Dropdown readonly with custom readonly label:</h4>
        <select-dropdown [(ngModel)]="notSelectedCar" 
                    [items]="cars"
                    labelBy="name"
                    trackBy="name"
                    [readonly]="true"
                    readonlyLabel="car is not selected yet"></select-dropdown>

        <br/><b>model: </b>
        <pre>{{ notSelectedCar | json }}</pre>
    
</div>
`,
    directives: [SELECT_CONTROL_DIRECTIVES]
})
export class Sample4App {

    cars: Car[] = [
        new Car(1, "BMW", 2000),
        new Car(2, "Mercedes", 1999),
        new Car(3, "Opel", 2008),
        new Car(4, "Porshe", 1940),
        new Car(4, "Ferrari", 2000)
    ];
    selectedCarsInLoop: any[] = [];
    selectedCars1: Car[] = [];
    selectedCars2: Car[] = [];
    selectedCars3: Car[] = [];
    selectedCars4: Car[] = [];
    selectedCars5: string[] = [];
    selectedCars6: Car[] = [];
    selectedCars7: Car[] = [];
    selectedCars8: Car[] = [];
    selectedCars9: Car[] = [];
    selectedCars10: Car[] = [];
    selectedCars11: Car[] = [];
    selectedCars12: Car[] = [];
    selectedCar: Car;
    selectedCar2: Car;
    selectedCar3: Car;
    newSelectedCar: Car = new Car(1, "BMW", 2000);

}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        Sample4App
    ],
    bootstrap: [
        Sample4App
    ]
})
export class Sample4Module {

}

platformBrowserDynamic().bootstrapModule(Sample4Module);