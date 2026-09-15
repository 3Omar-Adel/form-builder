import SkeletonBox from "./SkeletonBox";

interface SkeletonTextProps {
    width?: string;
    height?: string;
    className?: string;
}

const SkeletonText = ({
    width = "100%",
    height = "14px",
    className = "",
}: SkeletonTextProps) => {
    return (
        <SkeletonBox
            width={width}
            height={height}
            borderRadius="5px"
            className={className}
        />
    );
};

export default SkeletonText;