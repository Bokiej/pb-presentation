import { LightningElement } from 'lwc';
import { setBulbColor, setBulbTime, setBulbCounter, showBulbNumber, showAllBulbNumbers } from './js/bulbUtilities';
import { showError } from 'c/utility';
import lightBulb from 'c/utility'; // here goes Apex callback

export default class BulbsContainer extends LightningElement {
    YELLOW = { name: 'yellow', color: '#FFEE58' };
    RED = { name: 'red', color: '#FF7043' };
    GREEN = { name: 'green', color: '#66BB6A' };
    BLUE = { name: 'blue', color: '#4FC3F7' }; 

    connectedCallback() {
        Promise.all([
            lightBulb({ ...this.YELLOW }),
            lightBulb({ ...this.RED }),
            lightBulb({ ...this.GREEN }),
            lightBulb({ ...this.BLUE })
        ]).then(bulbs => {
            const [ yellow, red, green, blue ] = bulbs;

            console.log(`Bulb name is: ${green.name}`);

            return [ yellow, green, blue ].map(
                bulb => setBulbColor({ context: this, ...bulb })
            );
        }).then(bulbs =>
            bulbs.map(bulb => setBulbTime(bulb))
        ).then(bulbs =>
            bulbs.map(bulb => setBulbCounter(bulb))
        ).then(([ , , blue ]) =>
            showBulbNumber(blue)
        ).catch(error => {
            showError({ context: this, error });
        });
    }
}