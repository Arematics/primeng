import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { InputIconStyle } from './style/inputiconstyle';
import { styleClassAttribute } from "primeng/base";

/**
 * InputIcon displays an icon.
 * @group Components
 */
@Component({
    selector: 'p-inputicon, p-inputIcon',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputIconStyle],
    host: {
        '[class]': 'styleClass',
        '[class.p-inputicon]': 'true',
    },
})
export class InputIcon extends BaseComponent {
    /**
     * Style class of the element.
     * @group Props
     */
    @Input({ transform: styleClassAttribute }) styleClass: string | undefined;

    _componentStyle = inject(InputIconStyle);
}

@NgModule({
    imports: [CommonModule],
    exports: [InputIcon, SharedModule],
    declarations: [InputIcon],
})
export class InputIconModule {}
