import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProfileComponent } from "./profile.component";
import { AuthEditComponent } from "./auth-edit/auth-edit.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
      ProfileComponent,
      AuthEditComponent
    ],
    imports:[
        FormsModule,
        CommonModule
    ],
    exports:[

    ]
})
export class ProfileModule{}