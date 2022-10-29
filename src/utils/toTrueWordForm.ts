// word = отзыв
//firstForm - отзыв
//secondForm - отзыва
//thirdForm - отзывов

export function toTrueWordForm(num: number | undefined, [firstForm, secondForm, thirdForm]:string[]) {

    /*if (num) {
        num = Math.floor(num)
    }*/

    if(!num){
        return `${0} ${thirdForm}`
    }

    let n = Math.abs(num) % 100
    let nx = n % 10
    if(n > 10 && n < 20)
        return `${num} ${thirdForm}`
    if(nx > 1 && nx < 5)
        return `${num} ${secondForm}`
    if(nx === 1)
        return `${num} ${firstForm}`

    return `${num} ${thirdForm}`
}

export function toTrueWordFormLong([StartFirstForm, StartSecondForm, StartThirdForm]:string[], num: number | undefined, [firstForm, secondForm, thirdForm]:string[]) {

    if(!num){
        return `${StartThirdForm} ${0} ${thirdForm}`
    }

    let n = Math.abs(num) % 100
    let nx = n % 10
    if(n > 10 && n < 20)
        return `${StartThirdForm} ${num} ${thirdForm}`
    if(nx > 1 && nx < 5)
        return `${StartSecondForm} ${num} ${secondForm}`
    if(nx === 1)
        return `${StartFirstForm} ${num} ${firstForm}`

    return `${StartThirdForm} ${num} ${thirdForm}`
}
