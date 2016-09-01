import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Checkbox} from "./Checkbox";
import {CheckboxItem} from "./CheckboxItem";
import {CheckboxGroup} from "./CheckboxGroup";
import {RadioBox} from "./RadioBox";
import {RadioItem} from "./RadioItem";
import {RadioGroup} from "./RadioGroup";
import {SelectItems} from "./SelectItems";
import {Autocomplete, AutocompleteDropdownTemplate} from "./Autocomplete";
import {SelectDropdown} from "./SelectDropdown";
import {SelectTags, SelectTagsDropdownTemplate, SelectTagsBoxTemplate} from "./SelectTags";
import {ItemTemplate, Items, ItemTemplateTransclude} from "./ItemTemplate";
import {Dropdown} from "./Dropdown";
import {DropdownOpen} from "./DropdownOpen";
import {DropdownNotClosableZone} from "./DropdownNotClosableZone";

export * from "./CheckboxGroup";
export * from "./Checkbox";
export * from "./CheckboxItem";
export * from "./RadioGroup";
export * from "./RadioBox";
export * from "./RadioItem";
export * from "./SelectItems";
export * from "./Autocomplete";
export * from "./SelectDropdown";
export * from "./SelectTags";
export * from "./ItemTemplate";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        CheckboxGroup,
        CheckboxItem,
        RadioGroup,
        RadioItem,
        RadioBox,
        Checkbox,
        Items,
        SelectItems,
        Autocomplete,
        SelectDropdown,
        SelectTags,
        ItemTemplate,
        SelectTagsDropdownTemplate,
        SelectTagsBoxTemplate,
        AutocompleteDropdownTemplate,
        ItemTemplateTransclude,
        Dropdown,
        DropdownNotClosableZone,
        DropdownOpen
    ],
    exports: [
        CheckboxGroup,
        CheckboxItem,
        RadioGroup,
        RadioItem,
        RadioBox,
        Checkbox,
        Items,
        SelectItems,
        Autocomplete,
        SelectDropdown,
        SelectTags,
        ItemTemplate,
        SelectTagsDropdownTemplate,
        SelectTagsBoxTemplate,
        AutocompleteDropdownTemplate
    ]
})
export class SelectControlsModule {

}