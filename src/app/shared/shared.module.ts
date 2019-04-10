import { NgModule } from '@angular/core';

import { formatStarlingText } from './textformat.pipe';

@NgModule({
    declarations: [ formatStarlingText ],
    exports: [ formatStarlingText ]
})
export class SharedModule { }