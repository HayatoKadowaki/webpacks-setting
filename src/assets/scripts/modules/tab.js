export default class Tab {
    constructor(props) {
        this.targets = this.checkElementError(
            document.querySelectorAll(props.target)
        );
        this.contents = this.checkElementError(
            document.querySelectorAll(props.content)
        );
        this.className = props.className;
        this.handleEvents();
    }
    handleEvents() {
        for (let i = 0; i < this.targets.length; i++) {
            this.targets[i].addEventListener('click', () => {
                this.removeClass();
                this.targets[i].classList.add(this.className);
                this.contents[i].classList.add(this.className);
            });
        }
    }
    removeClass() {
        this.targets.forEach((target) => {
            target.classList.remove(this.className);
        });
        this.contents.forEach((content) => {
            content.classList.remove(this.className);
        });
    }
}
