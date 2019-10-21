new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function(){
            this.gameIsRunning=true;
            this.playerHealth=100;
            this.monsterHealth=100;
            this.turns=[];
        },
        attack: function(){
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth-= damage;
            this.turns.unshift({
                isplayer: true,
                text: 'Player hits monster ' + damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        specialAttack: function(){
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth-=damage;
            this.turns.unshift({
                isplayer: true,
                text: 'Player hits monster hard ' + damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth+=10;
            }
            else{
                this.playerHealth=100;
            }
            this.turns.unshift({
                isplayer: true,
                text: 'Player healed 10 '
            });
            this.monsterAttacks();
        },
        giveUp: function(){
            this.gameIsRunning=false;
        },
        monsterAttacks: function(){
            let damage = this.calculateDamage(5, 12);
            this.playerHealth-=damage;
            this.turns.unshift({
                isplayer: false,
                text: 'Monster attacks player ' + damage
            });
            this.checkWin();
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random()*max) + 1,  min);
        },
        checkWin: function(){
            if(this.monsterHealth <= 0){
                if(confirm('You won!, Another Round ?')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning=false;
                }
                return true;
            }
            else if(this.playerHealth <= 0){
                if(confirm('You loose!, Retry ?')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning=false;
                }
                return true;
            }
            else{
                return false;
            }
        }
    }
});