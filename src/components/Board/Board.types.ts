import Field from '../../models/Field';

type Props = {
    fields: Field[][],
    onFieldClick: (x: number, y: number) => void
    onFieldRightClick: (x: number, y: number) => void
    minesLeft: number
    time: number
}

export default Props;
