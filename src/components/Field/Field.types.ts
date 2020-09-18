type Props = {
    x:number
    y:number
    isMine: boolean
    isUncovered: boolean
    hasFlag: boolean
    borderingMinesAmount: number,
    onClick: (x: number, y: number) => void
    onRightClick: (x: number, y: number) => void
}

export default Props;
