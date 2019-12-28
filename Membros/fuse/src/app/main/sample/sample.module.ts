import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { FuseSharedModule } from "@fuse/shared.module";

import { SampleComponent } from "./sample.component";
import { MemberCardComponent } from './member-card.component';

const routes = [
    {
        path: "sample",
        component: SampleComponent
    }
];

@NgModule({
    declarations: [SampleComponent, MemberCardComponent],
    imports: [RouterModule.forChild(routes), TranslateModule, FuseSharedModule],
    exports: [SampleComponent]
})
export class SampleModule {}
