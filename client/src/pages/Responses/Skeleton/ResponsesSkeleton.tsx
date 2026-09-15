import SkeletonBox from "../../../components/skeleton/SkeletonBox";
import SkeletonText from "../../../components/skeleton/SkeletonText";

import "./ResponsesSkeleton.css";

const ResponsesSkeleton = () => {
    return (
        <div className="responses-page">
            <div className="responses-header">
                <SkeletonBox
                    width="100px"
                    height="18px"
                    borderRadius="6px"
                />

                <div className="responses-skeleton-header-content">
                    <SkeletonText
                        width="180px"
                        height="25px"
                    />

                    <SkeletonText
                        width="75px"
                        height="12px"
                    />
                </div>
            </div>

            <div className="responses-skeleton-list">
                {Array.from({ length: 3 }).map((_, index) => (
                    <article
                        key={index}
                        className="responses-skeleton-card"
                    >
                        <div className="responses-skeleton-card-header">
                            <div className="responses-skeleton-card-title">
                                <SkeletonText
                                    width="105px"
                                    height="15px"
                                />

                                <SkeletonText
                                    width="130px"
                                    height="11px"
                                />
                            </div>

                            <SkeletonBox
                                width="34px"
                                height="34px"
                                borderRadius="8px"
                            />
                        </div>

                        <div className="responses-skeleton-answers">
                            {Array.from({ length: 3 }).map(
                                (_, answerIndex) => (
                                    <div
                                        key={answerIndex}
                                        className="responses-skeleton-answer"
                                    >
                                        <SkeletonText
                                            width={
                                                answerIndex === 0
                                                    ? "90px"
                                                    : "120px"
                                            }
                                            height="11px"
                                        />

                                        <SkeletonText
                                            width={
                                                answerIndex === 0
                                                    ? "70%"
                                                    : "85%"
                                            }
                                            height="13px"
                                        />
                                    </div>
                                ),
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default ResponsesSkeleton;