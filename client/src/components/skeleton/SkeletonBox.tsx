import "./Skeleton.css";

interface SkeletonBoxProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    className?: string;
}

const SkeletonBox = ({
    width = "100%",
    height = "20px",
    borderRadius = "8px",
    className = "",
}: SkeletonBoxProps) => {
    return (
        <div
            className={`app-skeleton ${className}`}
            style={{
                width,
                height,
                borderRadius,
            }}
        />
    );
};

export default SkeletonBox;