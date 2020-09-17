type Props = {
    borderingMinesAmount: number,
    isMine: boolean
    isUncovered: boolean
    x:number
    y:number
    onClick: (x: number, y: number) => void
}

export default Props;
