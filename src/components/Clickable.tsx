import React from "react";

interface ClickableProps {
    children: React.ReactNode;
    onClick: () => void;
}

const Clickable = ({children, onClick}: ClickableProps) => {

    return ( 
        <span onClick={onClick} style={{ 
            cursor: 'pointer',
            userSelect: 'none'
        }}>
            {children}
        </span>
     );
}
 
export default Clickable;