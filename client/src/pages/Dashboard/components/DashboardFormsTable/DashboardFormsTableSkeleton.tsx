import SkeletonBox from "../../../../components/skeleton/SkeletonBox";
import SkeletonText from "../../../../components/skeleton/SkeletonText";

import "./DashboardFormsTableSkeleton.css";

const DashboardFormsTableSkeleton = () => {
    return (
        <div className="dashboard-table-skeleton">

            <div className="dashboard-table-skeleton-wrapper">

                <div className="dashboard-table-skeleton-head">
                    <SkeletonText width="90px" height="12px" />
                    <SkeletonText width="55px" height="12px" />
                    <SkeletonText width="75px" height="12px" />
                    <SkeletonText width="105px" height="12px" />
                    <SkeletonText width="85px" height="12px" />
                </div>

                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="dashboard-table-skeleton-row"
                    >
                        <SkeletonText
                            width="75%"
                            height="14px"
                        />

                        <SkeletonBox
                            width="72px"
                            height="26px"
                            borderRadius="999px"
                        />

                        <SkeletonText
                            width="35px"
                            height="14px"
                        />

                        <SkeletonText
                            width="70px"
                            height="14px"
                        />

                        <SkeletonText
                            width="85px"
                            height="14px"
                        />
                    </div>
                ))}

            </div>

        </div>
    );
};

export default DashboardFormsTableSkeleton;