import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { PhotoService } from '@service/photoservice';

@Component({
    selector: 'galleria-responsive-demo',
    template: `
        <app-docsectiontext>
            <p>Galleria responsiveness is defined with the <i>responsiveOptions</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria
                [(value)]="images"
                [responsiveOptions]="responsiveOptions"
                [containerStyle]="{ 'max-width': '640px' }"
                [numVisible]="7"
                [circular]="true"
            >
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
                <ng-template pTemplate="thumbnail" let-item>
                    <img [src]="item.thumbnailImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-responsive-demo"></app-code>
    `,
})
export class ResponsiveDoc implements OnInit {
    images: any[] | undefined;

    responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4,
        },
        {
            breakpoint: '575px',
            numVisible: 1,
        },
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => (this.images = images));
    }

    code: Code = {
        basic: `<p-galleria 
    [(value)]="images" 
    [responsiveOptions]="responsiveOptions" 
    [containerStyle]="{ 'max-width': '640px' }" 
    [numVisible]="7" 
    [circular]="true">
        <ng-template pTemplate="item" let-item>
            <img 
                [src]="item.itemImageSrc" 
                style="width: 100%; display: block;" />
        </ng-template>
        <ng-template pTemplate="thumbnail" let-item>
                <img 
                    [src]="item.thumbnailImageSrc" 
                    style="width: 100%; display: block;" />
        </ng-template>
</p-galleria>`,
        html: `<div class="card">
    <p-galleria 
        [(value)]="images" 
        [responsiveOptions]="responsiveOptions" 
        [containerStyle]="{ 'max-width': '640px' }" 
        [numVisible]="7" 
        [circular]="true"> 
            <ng-template pTemplate="item" let-item>
                <img 
                    [src]="item.itemImageSrc" 
                    style="width: 100%; display: block;"/>
            </ng-template>
            <ng-template pTemplate="thumbnail" let-item>
                    <img 
                        [src]="item.thumbnailImageSrc" 
                        style="width: 100%; display: block;" />
            </ng-template>
    </p-galleria>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { PhotoService } from '@service/photoservice';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'galleria-responsive-demo',
    templateUrl: './galleria-responsive-demo.html',
    standalone: true,
    imports: [GalleriaModule],
    providers: [PhotoService]
})
export class GalleriaResponsiveDemo implements OnInit {
    images: any[] | undefined;

    responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4,
        },
        {
            breakpoint: '575px',
            numVisible: 1,
        },
    ];


    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => (this.images = images));
    }
}`,
        data: `
/* PhotoService */
{
    itemImageSrc: 'https://primeng.org/images/galleria/galleria1.jpg',
    thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},
...`,
    };
}
