const MAX = 100000;

let memo = {};
let memo_keys = null;
let n = 0;
let len = 5;
let angle = 0.15;

function setup() {
    // Set the cell size based on the window size
    createCanvas(windowWidth, windowHeight);

    // Compute the sequence for the first 1000 numbers
    for (let i = MAX; i > 0; i--) {
        computeSequence(i);
    }

    // Get the keys of the memo object
    memo_keys = Object.keys(memo);
    n = memo_keys.length - 1;

    // Set the frame rate
    frameRate(24);
    colorMode(HSB, 1, 1, 1, 1);
    background(0);
}

function collatz(n) {
    if (n % 2 == 0) {
        return n / 2;
    }

    return (n * 3 + 1) / 2;
}

// Dynamic programming to store the sequence if we have already computed it
function computeSequence(n) {
    // If we have a memoized value return it
    if (memo[n]) {
        return memo[n];
    }

    // If the number is 1 we have reached the end of the sequence
    if (n == 1) {
        memo[n] = [1];
        return [1];
    }

    // If in memo point to the array instead else create a new array
    memo[n] = [n].concat(computeSequence(collatz(n)));

    return memo[n];
}

let is_paused = false;
let select_mode = false;

function keyPressed() {
    if (key === 'p' || key === 'P') {
        is_paused = !is_paused;

        if (is_paused) {
            noLoop();
        } else {
            loop();
        }
    }

    if (key === 'r' || key === 'R') {
        // Reset the loop
        background(0);
        n = memo_keys.length - 1;

        loop();
    }

}

function visualizeSequence(sequence) {
    // Visualize the sequence as an organic shape
    sequence = sequence.reverse();

    push();
    translate(width / 2, height);
    for (let j = 0; j < sequence.length; j++) {
        let value = sequence[j];

        if (value % 2 == 0) {
            rotate(angle);
        } else {
            rotate(-angle);
        }
        strokeWeight(2);
        stroke(j / sequence.length, 1, 1, 0.04); // alpha changed from 0.04
        line(0, 0, 0, -len);
        translate(0, -len);
    }
    pop();

    push();
    translate(width / 2, 0);
    for (let j = 0; j < sequence.length; j++) {
        let value = sequence[j];

        if (value % 2 == 0) {
            rotate(angle);
        } else {
            rotate(-angle);
        }
        strokeWeight(2);
        stroke(j / sequence.length, 1, 1, 0.04);
        line(0, 0, 0, len);
        translate(0, len);
    }
    pop();
}

function draw() {
    // Set the background
    // background(51);

    // Visualize the sequence
    visualizeSequence(memo[memo_keys[n]]);

    // Compute the next number
    n--;

    // If we have reached the end of the sequence reset
    if (n < 0) {
        background(0);
        n = memo_keys.length - 1;
    }
}