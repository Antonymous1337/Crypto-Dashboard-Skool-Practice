import Button from "./Button";
import Stack from "./Stack";
import { useState } from "react";

interface HomePageTabsProps {
    tabs: readonly string[];
    onTabChange?: (tab: string) => void;
    direction?: 'row' | 'column';
    gap?: string;
}

/**
 * @prop tabs the different tab labels
 * @prop onTabChange method that takes in a tab as input
 */
export const Tabs = ({ tabs, onTabChange, direction, gap }: HomePageTabsProps) => {
    const [currentTab, setCurrentTab] = useState<string>(tabs[0] ?? '');

    const handleClick = (tab: string) => {
        if (tab === currentTab) return;
        setCurrentTab(tab);
        onTabChange?.(tab);
    }

    console.log("Current Tab:", currentTab);

    return ( 
        <Stack direction={direction} gap={gap}>
            {tabs.map((tab, index) => {
                return (
                    <Button
                        label={tab}
                        selected={tab === currentTab}
                        onClick={() => handleClick(tab)}
                        key={`tab-button-${tab}-${index}`}
                    />
                )
            })}
        </Stack>
    );
}
 
export default Tabs;