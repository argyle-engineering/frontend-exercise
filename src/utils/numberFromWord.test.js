import { numberFromWord } from './numberFromWord'

describe('numberFromWord', () => {
    describe('test outputs', () => {
        it('zero => 0', () => {
            const test = numberFromWord('zero')
            expect(test).toBe(0)
        })

        it('one => 1', () => {
            const test = numberFromWord('one')
            expect(test).toBe(1)
        })

        it('one hundred => 100', () => {
            const test = numberFromWord('one hundred')
            expect(test).toBe(100)
        })
        it('one hundred twenty => 120', () => {
            const test = numberFromWord('one hundred twenty')
            expect(test).toBe(120)
        })

        it('three million one hundred thousand and ninety =≥ 3100090', () => {
            const test = numberFromWord(
                'three million one hundred thousand and ninety'
            )
            expect(test).toBe(3100090)
        })

        it('two thousand and forty five => 2045', () => {
            const test = numberFromWord('two thousand and forty five')
            expect(test).toBe(2045)
        })

        it('fifty four => 54', () => {
            const test = numberFromWord('fifty four')
            expect(test).toBe(54)
        })
    })

    describe('test edge cases', () => {
        it('one hundred-twenty => 120', () => {
            const test = numberFromWord('one hundred-twenty')
            expect(test).toBe(120)
        })

        it('ONE HUNDRED-TWENTY => 120', () => {
            const test = numberFromWord('ONE HUNDRED-TWENTY')
            expect(test).toBe(120)
        })

        it('ONE HUNDRED and TWENTY => 120', () => {
            const test = numberFromWord('ONE HUNDRED and TWENTY')
            expect(test).toBe(120)
        })

        it('one one => incorrect', () => {
            const test = numberFromWord('one one')
            expect(test).toBe('incorrect')
        })

        it('one one => incorrect', () => {
            const test = numberFromWord('one one')
            expect(test).toBe('incorrect')
        })

        it('one billion => incorrect', () => {
            const test = numberFromWord('one billion')
            expect(test).toBe('incorrect')
        })

        it('one billion => incorrect', () => {
            const test = numberFromWord('minus one')
            expect(test).toBe('incorrect')
        })
    })
})
