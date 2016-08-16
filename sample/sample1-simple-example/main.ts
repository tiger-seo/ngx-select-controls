import "rxjs/Rx";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {Component, NgModule} from "@angular/core";
import {SELECT_CONTROL_DIRECTIVES} from "../../src/index";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";
import {Car} from "./Car";

@Component({
    selector: "app",
    template: `
<div class="container">

    <h4>Is something enabled: (non-multiple checkbox)</h4>
    <input checkbox type="checkbox" [(ngModel)]="isSomethingEnabled"/>
    <i>isSomethingEnabled value:</i> <b>{{ isSomethingEnabled }}</b><br/><br/>

    <h4>Order by: (multiple check boxes)</h4>
    <input checkbox type="checkbox" [(ngModel)]="orderBy" value="rating"> Rating<br/>
    <input checkbox type="checkbox" [(ngModel)]="orderBy" value="date"> Date<br/>
    <input checkbox type="checkbox" [(ngModel)]="orderBy" value="watches"> Watch count<br/>
    <input checkbox type="checkbox" [(ngModel)]="orderBy" value="comments"> Comment count<br/>
    
    <i>selected items:</i> <b><span *ngFor="let order of orderBy">{{ order }} </span></b><br/><br/>
    
    
    <h4>Sort by: (simple radio boxes)</h4>
    <input radiobox type="radio" [(ngModel)]="sortWithoutGroup" value="rating"> Rating<br/>
    <input radiobox type="radio" [(ngModel)]="sortWithoutGroup" value="date"> Date<br/>
    <input radiobox type="radio" [(ngModel)]="sortWithoutGroup" value="watches"> Watch count<br/>
    <input radiobox type="radio" [(ngModel)]="sortWithoutGroup" value="comments"> Comment count<br/>
    
    <i>selected item:</i> <b>{{ sortWithoutGroup }}</b><br/><br/>


    <h4>Sort by: (radio boxes wrapped in the group)</h4>
    <radio-group [(ngModel)]="sortBy">
        <input radiobox type="radio" value="rating"> Rating<br/>
        <input radiobox type="radio" value="date"> Date<br/>
        <input radiobox type="radio" value="watches"> Watch count<br/>
        <input radiobox type="radio" value="comments"> Comment count<br/>
    </radio-group>
    
    <i>selected item:</i> <b>{{ sortBy }}</b><br/><br/>


    <h4>Order by: (check boxes wrapped in the group)</h4>
    <checkbox-group [(ngModel)]="orderBy">
        <input checkbox type="checkbox" value="rating"> Rating<br/>
        <input checkbox type="checkbox" value="date"> Date<br/>
        <input checkbox type="checkbox" value="watches"> Watch count<br/>
        <input checkbox type="checkbox" value="comments"> Comment count<br/>
    </checkbox-group>
    
    <i>selected items:</i> <b><span *ngFor="let order of orderBy">{{ order }} </span></b><br/><br/>
    
    
    <h4>Sort by: (radio boxes in group, less flexible, but simpler and the whole component is clickable)</h4>
    <radio-group [(ngModel)]="sortBy">
        <radio-item value="">No sorting</radio-item>
        <radio-item value="rating">Rating</radio-item>
        <radio-item value="date">Date</radio-item>
        <radio-item value="watches">Watch count</radio-item>
        <radio-item value="comments">Comment count</radio-item>
    </radio-group>
    
    <i>selected item:</i> <b>{{ sortBy }}</b><br/><br/>


    <h4>Order by: (check boxes in group, less flexible, but simpler and the whole component is clickable)</h4>
    <checkbox-group [(ngModel)]="orderBy">
        <checkbox-item value="rating">Rating</checkbox-item>
        <checkbox-item value="date">Date</checkbox-item>
        <checkbox-item value="watches">Watch count</checkbox-item>
        <checkbox-item value="comments">Comment count</checkbox-item>
    </checkbox-group>
    
    <i>selected items:</i> <b><span *ngFor="let order of orderBy">{{ order }} </span></b><br/><br/>


    <h4>Example with form:</h4>

    <form>
        <radio-group name="sortByControl" #sortByRadioGroup="ngModel" [(ngModel)]="sortBy" [required]="true">
            <input radiobox type="radio" value=""> Not selected<br/>
            <input radiobox type="radio" value="rating"> Rating<br/>
            <input radiobox type="radio" value="date"> Date<br/>
            <input radiobox type="radio" value="watches"> Watch count<br/>
            <input radiobox type="radio" value="comments"> Comment count<br/>
        </radio-group>
        <div [hidden]="sortByRadioGroup.valid || sortByRadioGroup.pristine" class="alert alert-danger">
            Sort by is required
        </div>
    
        <i>selected item:</i> <b>{{ sortBy }}</b><br/><br/>
        
        <checkbox-group name="orderByControl" #orderByCheckboxGroup="ngModel" [(ngModel)]="orderBy" [required]="true">
            <checkbox-item value="rating">Rating</checkbox-item>
            <checkbox-item value="date">Date</checkbox-item>
            <checkbox-item value="watches">Watch count</checkbox-item>
            <checkbox-item value="comments">Comment count</checkbox-item>
        </checkbox-group>
        <div [hidden]="orderByCheckboxGroup.valid || orderByCheckboxGroup.pristine" class="alert alert-danger">
            Order by is required
        </div>
    
        <i>selected items:</i> <b><span *ngFor="let order of orderBy">{{ order }} </span></b><br/><br/>
    </form>
    
    <h4>Disabled group:</h4>
    <checkbox-group [(ngModel)]="orderBy" [disabled]="true">
        <checkbox-item value="rating">Rating</checkbox-item>
        <checkbox-item value="date">Date</checkbox-item>
        <checkbox-item value="watches">Watch count</checkbox-item>
        <checkbox-item value="comments">Comment count</checkbox-item>
    </checkbox-group>
    
    <h4>Selecting objects:</h4>
    <checkbox-group [(ngModel)]="selectedCars1">
        <checkbox-item *ngFor="let car of cars" [value]="car">{{ car.name }}</checkbox-item>
    </checkbox-group>
    <b>selectedCars:</b>
    <pre>{{ selectedCars1 | json }}</pre>
    
    <h4>Using track by:</h4>
    <checkbox-group [(ngModel)]="selectedCars2" trackBy="id">
        <checkbox-item *ngFor="let car of cars" [value]="car">{{ car.name }}</checkbox-item>
    </checkbox-group>
    <b>selectedCars:</b>
    <pre>{{ selectedCars2 | json }}</pre>
    
    
    
    <h4>Radio group with array model:</h4>
    <h5>first: </h5>
    <radio-group [(ngModel)]="selectedOrders">
        <radio-item value="rating">Rating</radio-item>
        <radio-item value="date">Date</radio-item>
        <radio-item value="watches">Watch count</radio-item>
        <radio-item value="comments">Comment count</radio-item>
    </radio-group>
    <h5>second: </h5>
    <radio-group [(ngModel)]="selectedOrders">
        <radio-item value="with_comments">with comments</radio-item>
        <radio-item value="without_comments">without comments</radio-item>
    </radio-group>
    
    <i>selected orders:</i> <b>{{ selectedOrders }}</b><br/><br/>


    
</div>
`,
    directives: [SELECT_CONTROL_DIRECTIVES]
})
export class Sample1App {

    isSomethingEnabled: boolean = false;
    sortBy: string = "date";
    orderBy: string[] = ["rating", "comments"];
    selectedOrders: string[] = [];

    selectedCars1: Car[] = [];
    selectedCars2: Car[] = [];
    cars: Car[];

    constructor() {
        this.cars = [
            new Car(1, "BMW", 2000),
            new Car(2, "Mercedes", 1999),
            new Car(3, "Opel", 2008)
        ];
        this.selectedCars2 = [
            new Car(2, "Mercedes", 1999),
        ];
    }

}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        Sample1App
    ],
    bootstrap: [
        Sample1App
    ]
})
export class Sample1Module {

}

platformBrowserDynamic().bootstrapModule(Sample1Module);