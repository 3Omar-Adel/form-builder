import SkeletonBox from "../../../../components/skeleton/SkeletonBox";
import SkeletonText from "../../../../components/skeleton/SkeletonText";

import "./DashboardStatsSkeleton.css";

const DashboardStatsSkeleton = () => {
    return (
        <section className="dashboard-stats-skeleton">
            {Array.from({ length: 3 }).map((_, index) => (
                <article
                    key={index}
                    className="dashboard-stats-skeleton-card"
                >
                    <div className="dashboard-stats-skeleton-top">
                        <SkeletonBox
                            width="40px"
                            height="40px"
                            borderRadius="10px"
                        />

                        <SkeletonText
                            width="100px"
                            height="14px"
                        />
                    </div>

                    <div className="dashboard-stats-skeleton-value">
                        <SkeletonBox
                            width="48px"
                            height="30px"
                            borderRadius="6px"
                        />
                    </div>
                </article>
            ))}
        </section>
    );
};

export default DashboardStatsSkeleton;