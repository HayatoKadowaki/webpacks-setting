export default class MatchMedia {
    constructor(props) {
        this.breakpointType = props.type ? props.type : 'max';
        this.breakpointValue = props.value ? props.value : '768px';
        this.pcFunction = props.pcFunction
            ? props.pcFunction
            : console.log('not function');
        this.spFunction = props.spFunction
            ? props.spFunction
            : console.log('not function');
        this.init();
    }
    init() {
        const mediaQueryList = window.matchMedia(
            `(${this.breakpointType}-width:${this.breakpointValue})`
        );
        const listener = (event) => {
            if (event.matches) {
                this.spFunction();
            } else {
                this.pcFunction();
            }
        };
        mediaQueryList.addEventListener('change', listener);
        listener(mediaQueryList);
    }
}
