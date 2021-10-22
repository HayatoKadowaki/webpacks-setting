export default class Accordion {
    constructor(props) {
        this.target = document.querySelector(props.target);
        this.content = document.querySelector(props.content);
        this.toggleClassName = props.toggleClassName;
        this.state = false;
        this.init();
    }
    init() {
        this.target.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleClass();
        });
    }
    toggleClass() {
        if (this.state) {
            // 閉じる
            this.state = false;
            this.target.classList.remove(this.toggleClassName);
            this.content.classList.remove(this.toggleClassName);
        } else {
            // 開く
            this.state = true;
            this.target.classList.add(this.toggleClassName);
            this.content.classList.add(this.toggleClassName);
        }
    }
}
