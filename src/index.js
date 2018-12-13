import Vue from 'vue';
import axios from 'axios';
import style from './style.css';
import { sudokuVerifier } from './sudoku_verifier';

document.addEventListener("DOMContentLoaded", function() {
    new Vue({
        el: document.getElementById('vue-hook'),
        data: function() {
            return {
                problem: null,
                solution: null,
                validation: null,
                error: null
            }
        },
        created: function() {
            this.loadNew();
        },
        computed: {
            solutionGrid
        },
        methods: {
            loadNew
        }
    });
});


// Computed
function solutionGrid() {
    let solution = this.solution;

    if (solution) {
        let solution = this.solution.slice();
        let grid = [];
    
        while (solution.length > 0) {
            const row = solution.splice(0, 9);
        
            grid.push(row);
        }
    
        return grid;
    }
}

// Methods
function loadNew() {
    axios.get('/sudoku')
        .then((response) => {
            let data = response.data;

            let parsedForUser = determineUserInput(data);
            let parsedForValid = determineValid(data, parsedForUser);
            
            this.problem = data.problem;
            this.solution = parsedForValid;
        })
        .catch(() => {
            this.error = 'There was an error fetching the sudoku puzzle.'
        });
}

function determineUserInput(data) {
    return data.solution.map((current, index) => {
        let value = current === null? 'N' : current; 
        let type = "user-input";
        
        if (data.problem[index] === null) {
            type = "starter-input";
        }

        return { type, value };
    });
}

function determineValid(data, parsed) {
    let result = sudokuVerifier(data);

    result.invalidIndexes.forEach((current) => {
        parsed[current].type = 'invalid-input';
    });

    return parsed;
}