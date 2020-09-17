import Field from '../../models/Field';

type Props = {
    fields: Field[][],
    onFieldClick: (x: number, y: number) => void
}

export default Props;
