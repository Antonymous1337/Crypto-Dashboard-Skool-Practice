interface StackProps {
    direction?: 'row' | 'column';
    gap?: string;
    children: React.ReactNode;
}

const Stack = ({ direction = "row", gap = "1em", children }: StackProps) => {

    const stackStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: direction,
        gap: gap,
    };
    
    return (
        <div style={stackStyle}>{children}</div>
    );
}
 
export default Stack;