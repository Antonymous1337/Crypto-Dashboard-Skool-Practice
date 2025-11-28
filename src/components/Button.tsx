import { useState } from "react";

interface ButtonProps {
    label: string;
    selected: boolean;
    border?: string;
    borderRadius?: string;
    padding?: string;
    labelColor?: string
    fillColor?: string;
    selectedLabelColor?: string;
    selectedFillColor?: string;
    selectedBorder?: string;
    onClickFn?: () => void;
    onHoverFn?: () => void;
}

const Button = ({
    label,
    selected,
    borderRadius = '4px',
    padding = '0.5em 1em',
    labelColor = 'black',
    fillColor = 'white',
    border = '1px solid black',
    selectedLabelColor = 'white',
    selectedFillColor = 'blue',
    selectedBorder = '1px solid white',
    onClickFn,
    onHoverFn
}: ButtonProps) => {
    const [hover, setHover] = useState<boolean>(false);
    const buttonStyle: React.CSSProperties = {
        color: selected ? selectedLabelColor : labelColor,
        backgroundColor: selected ? selectedFillColor : fillColor,
        border: selected ? selectedBorder : border,
        borderRadius: borderRadius,
        padding: padding,
        cursor: 'pointer',
        opacity: hover ? 1 : 0.8,
    }

    

    return (
        <button 
            style={buttonStyle}
            onClick={onClickFn}
            onMouseEnter={() => { setHover(true); onHoverFn?.(); }}
            onMouseLeave={() => setHover(false)}>
                {label}
        </button>
    );
}
 
export default Button;