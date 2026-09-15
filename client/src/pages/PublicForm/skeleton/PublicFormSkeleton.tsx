import SkeletonBox from "../../../components/skeleton/SkeletonBox";
import SkeletonText from "../../../components/skeleton/SkeletonText";

import "./PublicFormSkeleton.css";

const PublicFormSkeleton = () => {
    return (
        <div className="public-form-page">
            <div className="public-form-skeleton">
                <div className="public-form-skeleton-header">
                    <SkeletonText
                        width="55%"
                        height="26px"
                    />

                    <SkeletonText
                        width="75%"
                        height="13px"
                    />

                    <SkeletonText
                        width="45%"
                        height="13px"
                    />
                </div>

                <div className="public-form-skeleton-fields">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="public-form-skeleton-field"
                        >
                            <SkeletonText
                                width={
                                    index === 1
                                        ? "120px"
                                        : "150px"
                                }
                                height="13px"
                            />

                            <SkeletonBox
                                width="100%"
                                height={
                                    index === 1
                                        ? "100px"
                                        : "44px"
                                }
                                borderRadius="8px"
                            />
                        </div>
                    ))}

                    <SkeletonBox
                        width="110px"
                        height="40px"
                        borderRadius="9px"
                    />
                </div>
            </div>
        </div>
    );
};

export default PublicFormSkeleton;