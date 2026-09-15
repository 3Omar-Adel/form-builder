import SkeletonBox from "../../../../../components/skeleton/SkeletonBox";
import SkeletonText from "../../../../../components/skeleton/SkeletonText";

import "./FormDetailsSkeleton.css";

const FormDetailsSkeleton = () => {
    return (
        <div className="form-details-page">
            <div className="form-details-container">
                <div className="form-details-skeleton-topbar">
                    <SkeletonBox
                        width="118px"
                        height="34px"
                        borderRadius="8px"
                    />
                </div>

                <section className="form-info-skeleton">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            className="form-info-skeleton-item"
                            key={index}
                        >
                            <SkeletonText width="42px" height="11px" />

                            <SkeletonText
                                width={index === 0 ? "75%" : "45px"}
                                height="14px"
                            />
                        </div>
                    ))}
                </section>

                <section className="form-actions-skeleton">
                    <div className="form-actions-skeleton-main">
                        <div className="form-actions-skeleton-info">
                            <div className="form-actions-skeleton-title">
                                <SkeletonText width="105px" height="19px" />
                                <SkeletonBox
                                    width="78px"
                                    height="25px"
                                    borderRadius="999px"
                                />
                            </div>

                            <SkeletonText
                                width="220px"
                                height="12px"
                            />
                        </div>

                        <div className="form-actions-skeleton-buttons">
                            <SkeletonBox
                                width="62px"
                                height="36px"
                                borderRadius="8px"
                            />

                            <SkeletonBox
                                width="125px"
                                height="36px"
                                borderRadius="8px"
                            />
                        </div>
                    </div>
                </section>

                <section className="form-preview-skeleton">
                    <div className="form-preview-skeleton-header">
                        <SkeletonText width="160px" height="20px" />
                        <SkeletonText width="260px" height="12px" />
                    </div>

                    <div className="form-preview-skeleton-content">
                        <SkeletonText width="55%" height="18px" />
                        <SkeletonText width="85%" height="12px" />

                        <SkeletonBox
                            width="100%"
                            height="44px"
                            borderRadius="8px"
                        />

                        <SkeletonText width="35%" height="18px" />

                        <SkeletonBox
                            width="100%"
                            height="44px"
                            borderRadius="8px"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FormDetailsSkeleton;