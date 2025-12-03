import Button from "./Button";
import Stack from "./Stack";

interface PaginationProps {
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (newPage: number) => void;
}

const Pagination = ({ currentPage, onPageChange }: PaginationProps) => {

    const options = (() => {
        if (currentPage <= 2) { return [0, 1, 2, 3, 4]; }
        else { return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]; }
    })()

    return ( 
        <Stack direction="column" gap="0.5em">
            <Stack direction="row" gap="0.5em" styles={{
                justifyContent: "center"
            }}>
                {options.map((option, index) => (
                    <Button
                        label={option.toString()}
                        selected={option === currentPage}
                        onClickFn={() => onPageChange(option)}
                        styles={{
                            width: "min-content"
                        }} key={`pagination-button-${option}-${index}`}/>
                ))}
            </Stack>
        </Stack>
     );
}
 
export default Pagination;