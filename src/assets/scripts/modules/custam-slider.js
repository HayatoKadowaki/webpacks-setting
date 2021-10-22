export default class Slider {
    constructor() {
        this.init();
    }
    init() {
        console.log('init');
        this.kvSlide = document.querySelectorAll('[data-kv="slide"]');
        this.kvSlidePrev = document.querySelector('[data-kv="prev"]');
        this.kvSlideNext = document.querySelector('[data-kv="next"]');
        this.kvSlideDuration = 3000;
        this.activeIndex = 0;
        this.activeClassName = 'active';
        this.removeActiveClassName = 'remove-active';
        this.kvSlide[this.activeIndex].classList.add(this.activeClassName);
        this.loop = false;
        this.handleEvent();
    }
    handleEvent() {
        if (this.loop) this.autoPlay();
        this.kvSlidePrev.addEventListener('click', () => {
            this.slideChange('prev');
        });
        this.kvSlideNext.addEventListener('click', () => {
            this.slideChange('next');
        });
    }
    autoPlay() {
        setTimeout(() => {
            this.slideChange('next');
        }, this.kvSlideDuration);
    }
    slideChange(direction) {
        const indexes = this.indexCalculation();
        if (direction === 'next') {
            this.slideAnimation(
                this.kvSlide[indexes[0]],
                this.kvSlide[indexes[1]]
            );
            this.activeIndex = indexes[1];
        } else if (direction === 'prev') {
            this.slideAnimation(
                this.kvSlide[indexes[0]],
                this.kvSlide[indexes[2]]
            );
            this.activeIndex = indexes[2];
        } else {
            console.log('無効な値です');
        }
        if (this.loop) this.autoPlay();
    }
    indexCalculation() {
        const nowIndex = this.activeIndex;
        let nowNextIndex;
        if (nowIndex === this.kvSlide.length - 1) {
            nowNextIndex = 0;
        } else {
            nowNextIndex = nowIndex + 1;
        }
        let nowPrevIndex;
        if (nowIndex === 0) {
            nowPrevIndex = this.kvSlide.length - 1;
        } else {
            nowPrevIndex = nowIndex - 1;
        }
        return [nowIndex, nowNextIndex, nowPrevIndex];
    }
    slideAnimation(activeTarget, directionTarget) {
        this.kvSlide.forEach((element) =>
            element.classList.remove(
                this.removeActiveClassName,
                this.activeClassName
            )
        );
        activeTarget.classList.add(this.removeActiveClassName);
        directionTarget.classList.add(this.activeClassName);
    }
}
