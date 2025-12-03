interface StackProps {
    children: React.ReactNode;
    direction?: 'row' | 'column';
    gap?: string;
    styles?: React.CSSProperties;
}

const Stack = ({ children, direction = "row", gap = "1em", styles }: StackProps) => {

    const stackStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: direction,
        gap: gap,
        ...styles
    };
    
    return (
        <div style={stackStyle}>{children}</div>
    );
}
 
export default Stack;