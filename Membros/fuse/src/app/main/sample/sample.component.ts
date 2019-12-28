import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewChildren,
    QueryList,
    AfterViewInit,
    AfterContentInit
} from "@angular/core";

import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";

import { locale as english } from "./i18n/en";
import { locale as turkish } from "./i18n/tr";

import { MembersService } from "./members.service";
import { FusePerfectScrollbarDirective } from "@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive";
import { Subject } from "rxjs";
import { FuseConfigService } from "@fuse/services/config.service";
import { FuseNavigationService } from "@fuse/components/navigation/navigation.service";
import { NavigationEnd, Router, ActivatedRoute } from "@angular/router";

import { delay, filter, take, takeUntil } from "rxjs/operators";
import { MemberCardComponent } from "./member-card.component";

@Component({
    selector: "sample",
    templateUrl: "./sample.component.html",
    styleUrls: ["./sample.component.scss"]
})
export class SampleComponent
    implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
    members: any[] = [];
    config: any;
    targetIdentifier: string;

    @ViewChildren(MemberCardComponent) memberCards: QueryList<
        MemberCardComponent
    >;

    private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    ngOnDestroy() {}

    ngAfterContentInit(): void {        
    }

    ngAfterViewInit() {
        this.memberCards.changes.subscribe(data => {
            let target = this.memberCards.find(
                mc => mc.member.short_identifier == this.targetIdentifier
            );

            if (target) {
                target.setFocus();                
            }
        });
    }

    ngOnInit() {
        this.route.fragment.subscribe((fragment: string) => {
            this.targetIdentifier = fragment;
        });

        this.membersService.getMembers().subscribe(data => {
            this.members = data;
        });

        this._fuseConfigService.config.subscribe(config => {
            this.config = config;
        });
    }

    // Directive
    @ViewChild(FusePerfectScrollbarDirective, { static: true })
    set directive(theDirective: FusePerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this._fusePerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._fuseNavigationService.onItemCollapseToggled
            .pipe(delay(500), takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._fusePerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                setTimeout(() => {
                    this._fusePerfectScrollbar.scrollToElement(
                        "navbar .nav-link.active",
                        -120
                    );
                });
            });
    }

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private membersService: MembersService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _router: Router,
        private route: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this._unsubscribeAll = new Subject();

        this._fuseConfigService.config;

        this._fuseConfigService.config = {
            colorTheme: "theme-yellow-light",
            layout: {
                style: "vertical-layout-1",
                width: "fullwidth",
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            },
            customScrollbars: true
        };
    }
}
