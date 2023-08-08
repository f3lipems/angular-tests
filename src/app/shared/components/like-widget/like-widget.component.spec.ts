import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { UniqueIdService } from "../../services/unique-id/unique-id.service";
import { LikeWidgetComponent } from "./like-widget.component";
import { LikeWidgetModule } from "./like-widget.module";

describe(LikeWidgetComponent.name, () => {

    let fixture: ComponentFixture<LikeWidgetComponent> = null;
    let component: LikeWidgetComponent = null;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LikeWidgetModule]
        }).compileComponents();

        // await TestBed.configureTestingModule({
        //     declarations: [LikeWidgetComponent],
        //     imports: [FontAwesomeModule],
        //     providers: [UniqueIdService]
        // }).compileComponents();

        fixture = TestBed.createComponent(LikeWidgetComponent)
        component = fixture.componentInstance;
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });
    
    it('Should auto generate ID during ngOnInit when (@Input id) is not assigned', () => {
        fixture.detectChanges();
        expect(component.id).toBeTruthy();
    });
    
    it('Should do not auto generate ID during ngOnInit when (@Input id) is assigned', () => {
        let id = 'someId';
        component.id = id;
        fixture.detectChanges();
        expect(component.id).toBe(id);
    });

    it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called - 1`, done => {
        fixture.detectChanges();
        component.liked.subscribe(() => {
            expect(true).toBeTrue();
            done();
        })
        component.like();
    })
   
    it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called - 2`, () => {
        spyOn(component.liked, 'emit');
        fixture.detectChanges();
        component.like();
        expect(component.liked.emit).toHaveBeenCalled();
    })

})