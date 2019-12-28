import {
    Component,
    Input,
    ElementRef,
    ViewChild,
    EventEmitter,
    Output,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from "@angular/core";
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

@Component({
    selector: "member-card",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            #title
            class="fuse-card"
            [style.border-color]="isFocused ? 'black' : '#EEEEEE'"
            style="float:left;position:relative;margin:5px;"
        >
            <div
                class="p-16"
                fxLayout="row"
                fxLayoutAlign="space-between center"
            >
                <div class="pr-16">
                    <div class="h2" title="{{ member.fullname }}">
                        {{ member.name }}
                    </div>
                    <div class="h4 text-secondary">
                        Admissão:
                        {{ member.admission_date | date: "dd/MM/yyyy" }}
                    </div>
                </div>

                <div class="w-80 h-80">
                    <img src="{{ member.avatar_img_path }}" />
                </div>
            </div>

            <div class="p-16 pt-0 line-height-1.75">
                <span *ngIf="member.is_disciple == 1">
                    {{ member.kung_fu_name_alias }} - {{ member.ideograms }} -
                    {{ member.baaisi_date | date: "dd/MM/yyyy" }}
                </span>
                <span *ngIf="member.is_disciple == 0">
                    _
                </span>
            </div>

            <div class="p-16 pt-0 line-height-1.75">
                {{ member.branch_abrev }}
            </div>
        </div>
    `
})
export class MemberCardComponent {
    isFocused = false;

    @Input("member") member: any;

    @ViewChild("title", { static: false })
    private elTitle: ElementRef;

    @Output()
    elementFound: EventEmitter<ElementRef> = new EventEmitter();

    setFocus() {
        this.isFocused = true;

        if (!this.elTitle) {
            return;            
        }
        
        this.cdRef.detectChanges();

        setTimeout(() => this.elTitle.nativeElement.scrollIntoView({
            behavior: "auto",
            block: "start"
        }), 500);        
    }

    constructor(private cdRef : ChangeDetectorRef) {

    }
}
