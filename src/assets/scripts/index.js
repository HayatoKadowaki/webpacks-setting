import '@styles/style.scss';
import cssVars from 'css-vars-ponyfill';
import MatchMedia from './components/matchMedia';

class Index {
    constructor() {
        cssVars();
        console.log('hello world');
        new MatchMedia({
            type: 'max',
            value: '767px',
            pcFunction: function () {
                console.log('PC');
            },
            spFunction: function () {
                console.log('SP');
            },
        });
    }
}

new Index();
