import SkeletonBox from "../../../components/skeleton/SkeletonBox";
import SkeletonText from "../../../components/skeleton/SkeletonText";

import "./FormsSkeleton.css";

const FormsSkeleton = () => {
    return (
        <div className="forms-skeleton">
            {Array.from({ length: 6 }).map((_, index) => (
                <div className="forms-skeleton-card" key={index}>
                    <div className="forms-skeleton-info">
                        <SkeletonText width="45%" height="15px" />
                        <SkeletonText width="70%" height="12px" />
                    </div>

                    <div className="forms-skeleton-meta">
                        <SkeletonBox width="62px" height="25px" borderRadius="999px" />
                        <SkeletonText width="70px" height="12px" />
                        <SkeletonBox width="22px" height="22px" borderRadius="6px" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FormsSkeleton;