import Skeleton from "react-loading-skeleton";

//Styles
import "./PerfumeMenu.scss";

const PerfumeMenuSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, idx) => (
        <div key={idx} className={`PerfumeMenu`}>
          <div className={`p-cntImage`}>
            <Skeleton width={250} height={250} />
          </div>
          <div className="p-cntInfo">
            <div className="p-cnt-prices">
              {[...Array(3)].map((_, idx) => (
                <Skeleton key={idx} width={150} height={10} />
              ))}
            </div>
            <div className="p-cntStar" style={{display: "flex", gap: 5}}>
                {[...Array(5)].map((_, idx) => (
                    <Skeleton key={idx} circle width={20} height={20} />
                ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PerfumeMenuSkeleton;
