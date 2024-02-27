import { useEffect, useState } from "react";


//Styles
import "./CommentCard.scss";


//Components
import StarRatings from "../StarRatings/StarRatings";
import Button from "../../atoms/Button/Button";
import { Warning } from "../../../utilities/SweetAlert/SweetAlertModal";
import { useStateContext } from "../../../context/ContextProvider";

// Interfaces
import { responseApiSuccessComm, responseError } from "../../../interface/interface";

// Services
import { getAxiosApi } from "../../../services/api/Api";

const CommentCard = () => {
  const [seeMorebtn, setSeeMorebtn] = useState<boolean>(false);

  const { comments, setComments, loadingCo, setLoadingCo } = useStateContext();

  useEffect(() => {
    const get_comments = async () => {
      try {
        if (comments.length === 0 || comments === undefined) {
          const response: unknown = await getAxiosApi("/api/v1/review");

          const _response = response as responseApiSuccessComm;
          if (_response.status === 200) {
            setComments(_response.data);
            setLoadingCo(true);
          }
        }
      } catch (error) {
        console.log(error);
        const _error = error as responseError;
        Warning(_error.message);
      }
    };

    get_comments();
  }, []);

  return (
    <div className="CommetCard">
      <div className={`c-cntCommetCard ${seeMorebtn && "co-seeMore"}`}>

          {loadingCo ? (
              comments.map((_, idx) => {
                return (
                  <div key={idx} className="co-card">
                    <div className="c-header">
                      <img src={_.imageUrl} alt="" className="c-image" />
                      <div className="c-cntStarName">
                        <p className="c-name">{_.name}</p>
                        <StarRatings numberStar={parseFloat(_.rating)} />
                      </div>
                    </div>
                    <div className="c-comment">{_.comment}</div>
                  </div>
                );
              })
          ):(
            <h2>Cargando...</h2>
          )}

      </div>
      <div className="co-button">
        <Button
          text={`${!seeMorebtn ? "See more" : "See less"}`}
          submit
          onClick={() => setSeeMorebtn(!seeMorebtn)}
        />
      </div>
    </div>
  );
};

export default CommentCard;
