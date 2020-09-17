const classNames = (classes: Array<string | null | false | undefined>): string => classes.filter((cl) => cl).join(' ');

export default classNames;
