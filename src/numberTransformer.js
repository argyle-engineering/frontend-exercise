const FACTORS = { // for each entry here we store multiplier and addition
    and: [1, 0], // and is a word we can skip so we multiply by 1 and add 0 to result
};

const BASICS = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
    'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
    'sixteen', 'seventeen', 'eighteen', 'nineteen',
]

const TEN_MULTIPLIERS = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

const TEN_POWERS = ['hundred', 'thousand', 'million']

BASICS.forEach((number, index) => {
    FACTORS[number] = [1, index]; // for each basic values <0, 19> multiply by one and add index which is the same as number
})

TEN_MULTIPLIERS.forEach((number, index) => {
    FACTORS[number] = [1, (index + 2) * 10]; // for each ten multiplier we need to increase result by it value multiplied by 10
});

TEN_POWERS.forEach((number, index) => {
    FACTORS[number] = [10 ** ((index * 3) || 2), 0]; // when we spot hundred, thousand, etc we need to multiply result by corresponding power of 10
});

const checkIfSiblingsAreFromTheSameGroup = ([previous, current], group) => group.includes(previous) && group.includes(current);

const areSiblingsBasics = (values) => checkIfSiblingsAreFromTheSameGroup(values, BASICS);
const areSiblingsTenMultipliers = (values) => checkIfSiblingsAreFromTheSameGroup(values, TEN_MULTIPLIERS);

const areSiblingsIllegal = (values) => areSiblingsBasics(values) || areSiblingsTenMultipliers(values);

const isTenMultiplierNextToBasicHigherThan9 = ([previous, current]) => {
    return (
        TEN_MULTIPLIERS.includes(current) && BASICS.includes(previous)
    ) || (
        TEN_MULTIPLIERS.includes(previous) && BASICS.indexOf(current) > 9
    )
}

const siblingsGuards = [
    areSiblingsIllegal,
    isTenMultiplierNextToBasicHigherThan9
];

export const transformNumber = (strNumber) => {
    const normalizedText = strNumber.toLowerCase();

    const parts = normalizedText.split(' ');

    let result = 0;
    let currentNumber = 0;
    let previous = '';

    for (let part of parts) {
        if(!part.length) {
            continue; // ignore spaces at the end and on the begining
        }

        if (!Object.keys(FACTORS).includes(part)) {
            throw new Error('Incorrect Number');
        }

        for(let guard of siblingsGuards) {
            if(guard([previous, part])) {
                throw new Error('Incorrect Number');
            }
        }

        previous = part;

        const [multiplyBy, add] = FACTORS[part];

        currentNumber = currentNumber * multiplyBy + add

        if (multiplyBy <= 100) { // if we multiply by one or one hundred we just accumulating current number (because we can have hundred of thousands)
            continue;
        }

        //when we spot thousand or milion  we need to add it to result and start accumulating current number from scratch
        result += currentNumber
        currentNumber = 0
    }
    return result + currentNumber
};
