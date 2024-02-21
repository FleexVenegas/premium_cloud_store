import { useNavigate } from "react-router-dom";

//Components
import StarRatings from "../StarRatings/StarRatings";

//Styles
import "./PerfumeMenu.scss";
import { responseData } from "../../../interface/interface";

interface PerfumeMenuProps {
  className?: string;
  classTop?: string;
  scroll?: boolean;
  data?: responseData[];
}

const PerfumeMenu = ({
  className,
  classTop,
  scroll = false,
  data,
}: PerfumeMenuProps) => {
  const navigate = useNavigate();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavigate = (id: string, name: string) => {
    if (scroll) {
      scrollTop();
    }
    navigate(`/fragrance/${id}/${name}`);
  };

  return (
    <>
        {data?.map((_, idx) => (
          <div
            key={idx}
            className={`PerfumeMenu ${className}`}
            onClick={() => handleNavigate(_.perfumeID, _.name)}
          >
            <div className={`p-cntImage ${classTop}`}>
              <img src={_.imageURL} alt="" className="p-image" />
              <div className="p-hover"></div>
            </div>
            <div className="p-cntInfo">
              <div className="p-cnt-prices">
                <p className="p-name">{_.name}</p>
                <p className="p-price">${_.price}</p>
                <p className="p-brand">
                  <span>Brand:</span>
                  {_.brand}
                </p>
              </div>
              <div className="p-cntStar">
                <StarRatings numberStar={_.rating} />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PerfumeMenu;
