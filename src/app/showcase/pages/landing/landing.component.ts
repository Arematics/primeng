import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MenuItem, SelectItem, TreeNode } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppConfig } from '../../domain/appconfig';
import { Customer, Representative } from '../../domain/customer';
import { AppComponent } from '../../layout/app.component';
import { AppConfigService } from '../../service/appconfigservice';
import { CustomerService } from '../../service/customerservice';
import { NodeService } from '../../service/nodeservice';
import Versions from '../../data/versions.json';
import docsearch from '@docsearch/js';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {
    @ViewChild('containerElement') containerElement: ElementRef;

    @ViewChild('dt') table: Table;

    @ViewChild('editor') editor: ElementRef;

    versions: any[] = Versions;
    
    menuActive: boolean = false;

    scrollListener: any;

    chartData: any;

    chartOptions: any;

    items: MenuItem[];

    selectButtonValue: SelectItem
    
    selectButtonOptions:SelectItem[]

    treeData: TreeNode[];

    value1: number = 240;

    value2: number = 356;
    
    radioValue: string = 'C';

    switchValue : boolean = true

    checked: boolean = true;

    selectedVal: number = 1;

    rangeValues = [20, 80];

    dateValue: Date;

    customers: Customer[];

    selectedCustomers: Customer[];

    representatives: Representative[];

    statuses: SelectItem[];

    loading: boolean = true;

    fonts: SelectItem[];

    selectedFont: string = '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol';

    inputStyle: string = 'outlined';

    size: string = 'normal';

    selectedCity: City;

    cities: City[];

    price: number;

    config: AppConfig;

    darkMode: boolean = false;

    setAnimation: boolean = true;

    selectedOptions: string[] = ['1'];

    theme: string = 'lara-light-blue';

    isNpmCopied: boolean = false;

    usersData = [
        { name: 'fox', width: '51', height: '22' },
        { name: 'airbus', width: '87', height: '16' },
        { name: 'mercedes', width: '34', height: '34' },
        { name: 'ford', width: '64', height: '26' },
        { name: 'vw', width: '35', height: '34' },
        { name: 'intel', width: '53', height: '34' },
        { name: 'unicredit', width: '79', height: '18' },
        { name: 'lufthansa', width: '97', height: '18' },
        { name: 'nvidia', width: '86', height: '16' },
        { name: 'verizon', width: '102', height: '18' },
        { name: 'amex', width: '81', height: '30' }
    ];
    usersImages: any;

    private window: Window;

    get landingClass() {
        return {
            'landing': true,
            'layout-dark': this.config.dark,
            'layout-light': !this.config.dark,
            'layout-news-active': this.app.newsActive && this.app.announcement
        }
    }

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        private renderer: Renderer2,
        private nodeService: NodeService,
        private customerService: CustomerService,
        private configService: AppConfigService,
        private cd: ChangeDetectorRef,
        public app: AppComponent,
        private metaService: Meta,
        private titleService: Title
    ) {
        this.window = this.document.defaultView as Window;
    }

    ngOnInit() {
        this.titleService.setTitle('PrimeNG - Angular UI Component Library');
        this.metaService.updateTag({ name: 'description', content: 'The ultimate collection of design-agnostic, flexible and accessible Angular UI Components.' });
        this.config = this.configService.config;
        this.changeTableTheme(this.config.dark ? 'lara-dark-blue' : 'lara-light-blue');
        this.configService.updateConfig({ ...this.config, ...{ theme: this.config.dark ? 'lara-dark-blue' : 'lara-light-blue' } });

        this.chartData = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    {
                        label: 'Annual Income',
                        data: [40, 59, 40, 50, 56],
                        fill: true,
                        borderColor: '#3b82f6',
                        tension: 0.4,
                        backgroundColor: 'rgba(59, 130, 246, .2)'
                    }
                ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
              
                y: {
                    beginAtZero: true,
                  
                    min: 0,
                    max: 100,
                
                }
            }
        };
        this.selectButtonValue =  { label: 'Styled', value: 1 },
        this.selectButtonOptions = [
            {label: 'Styled', value: 1 },
            {label: 'Unstyled', value: 2 }
        ]

        this.items = [
            { label: 'Home', icon: 'pi pi-fw pi-home' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },

        ];

        this.nodeService.getFiles().then((files) => (this.treeData = files));

        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;
        });

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];

        this.fonts = [
            {
                label: 'Arial',
                value: 'Arial,Helvetica Neue,Helvetica,sans-serif'
            },
            {
                label: 'System',
                value: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol'
            },
            {
                label: 'Trebuches MS',
                value: 'Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif'
            },
            {
                label: 'Verdana',
                value: 'Verdana,Geneva,sans-serif'
            }
        ];

        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' }
        ];

        if (isPlatformBrowser(this.platformId)) {
            this.initDocSearch();
        }
    }

    initDocSearch() {
        docsearch({
            appId: 'XG1L2MUWT9',
            apiKey: '6057fe1af77fee4e7e41907b0b3ec79d',
            indexName: 'primeng',
            container: '#docsearch',
            transformItems: this.handleDocSearchTransformItems.bind(this)
        });
    }

    handleDocSearchTransformItems(results) {
        const valid = process.env.NODE_ENV !== 'production';
        return results.map((result) => {
            if (valid) {
                const url = new URL(result.url);

                url.protocol = this.window.location.protocol;
                url.hostname = this.window.location.hostname;
                url.port = this.window.location.port;
                result.url = url.toString();
            }

            return result;
        });
    }

    copyNpm() {
        navigator.clipboard.writeText('npm i primeng');
        this.isNpmCopied = true;
        setTimeout(() => {
            this.isNpmCopied = false;
        }, 2000);
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    handleChange(event) {
        this.checked = event.checked;
    }

    toggleDarkMode() {
        this.config.dark = !this.config.dark;
        let theme = this.config.dark ? this.theme.replace('light', 'dark') : this.theme.replace('dark', 'light');
        this.config = { ...this.config, dark: this.config.dark, theme: theme };

        this.configService.updateConfig({ ...this.configService.config, ...{ theme: this.config.dark ? 'lara-dark-blue' : 'lara-light-blue', dark: this.config.dark } });
        this.changeTableTheme(theme);

        if (isPlatformBrowser(this.platformId)) {
            let linkElement = document.getElementById('theme-link');
            this.replaceLink(linkElement, theme);
            this.theme = theme;
        }
    }

    changeTableTheme(newTheme) {
        if (isPlatformBrowser(this.platformId)) {
            let linkElement = document.getElementById('home-table-link');
            this.replaceLink(linkElement, newTheme);
            this.theme = newTheme;
        }
    }

    replaceLink(linkElement, theme) {
        if (isPlatformBrowser(this.platformId)) {
            const id = linkElement.getAttribute('id');
            const tableThemeTokens = linkElement.getAttribute('href').split('/');
            const currentTableTheme = tableThemeTokens[tableThemeTokens.length - 2];
            if (currentTableTheme !== theme) {
                const cloneLinkElement = linkElement.cloneNode(true);
                cloneLinkElement.setAttribute('href', linkElement.getAttribute('href').replace(currentTableTheme, theme));
                cloneLinkElement.setAttribute('id', id + '-clone');

                linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
                this.renderer.listen(cloneLinkElement, 'load', () => {
                    linkElement.remove();
                    cloneLinkElement.setAttribute('id', id);
                });
            }
        }
    }

    changeFont() {
        if (isPlatformBrowser(this.platformId)) {
            this.editor?.nativeElement.style.setProperty('--dd-font', this.selectedFont);
        }
    }

    changeDesignerTheme(color, darker) {
        if (isPlatformBrowser(this.platformId)) {
            this.editor?.nativeElement.style.setProperty('--dd-primary', color);
            this.editor?.nativeElement.style.setProperty('--dd-primary-darker', darker);
        }
    }

    onActivityChange(event) {
        const value = event.target.value;
        if (value && value.trim().length) {
            const activity = parseInt(value);

            if (!isNaN(activity)) {
                this.table.filter(activity, 'activity', 'gte');
            }
        }
    }

    onDateSelect(value) {
        this.table.filter(this.formatDate(value), 'date', 'equals');
    }

    formatDate(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return date.getFullYear() + '-' + month + '-' + day;
    }

    onRepresentativeChange(event) {
        this.table.filter(event.value, 'representative', 'in');
    }

    getSeverity(status) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    }
}
