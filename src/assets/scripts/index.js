import '@styles/style.scss';
import cssVars from 'css-vars-ponyfill';

class Index {
    constructor() {
        cssVars();
        console.log('hello world');
    }
}

new Index();
