import { useEffect } from "react";
import MainDiv from "../../components/molecules/MainDiv/MainDiv";
import { NavLink, useParams } from "react-router-dom";


// Styles
import "./PerfumeView.scss";

// Components
import StarRatings from "../../components/molecules/StarRatings/StarRatings";
import ReturnBtn from "../../components/atoms/ReturnBtn/ReturnBtn";
import PerfumeMenu from "../../components/molecules/PerfumeMenu/PerfumeMenu";
import { responseApiSuccess, responseError } from "../../interface/interface";
import { Warning } from "../../utilities/SweetAlert/SweetAlertModal";
import { getAxiosApi } from "../../services/api/Api";
import { useStateContext } from "../../context/ContextProvider";
import PerfumeMenuSkeleton from "../../components/molecules/PerfumeMenu/PerfumeMenuSkeleton";

const PerfumeView = () => {
    const { id } = useParams();
    const { dataPerfumeID, setDataPerfumeID, loadingID, setLoadingID, 
        perfume_id, setPerfume_id } = useStateContext();

  useEffect(() => {
    const perfumeID = async () => {
      try {

        if(perfume_id != id){
            const dataID = await getAxiosApi(`/api/v1/fragrance/${id}`);
            const _dataID = dataID as responseApiSuccess;

    
            if (_dataID.status === 200) {
                setDataPerfumeID(_dataID.data);
                const _perfume_id = _dataID.data.map((id) => {
                    return id.perfumeID
                })
    
              setLoadingID(true);
              setPerfume_id(_perfume_id[0])
            }
            
        }
        
      } catch (error) {
        console.log(error);
        const _error = error as responseError;
        Warning(_error.message);
      }
    };

    perfumeID();
  }, []);

  useEffect(() => {
    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollTop();
  }, []);


  return (
    <MainDiv className="PerfumeView">
      <ReturnBtn url="/" />

      {loadingID ? (
          dataPerfumeID.map((_, idx) => {
            return (
              <div key={idx} className="p-cntHeader">
                <div className="p-left">
                  <div className={`p-cntImage`}>
                    <img src={_.imageURL} alt="" className="p-img" />
                  </div>
                </div>
                <div className="p-right">
                  <div className="p-cnt_inside">
                    <div className="p-cntDatas">
                      <h1 className="p-title">{_.name}</h1>
                      <StarRatings numberStar={_.rating} />
                      <p className="p-code">
                        <span>Product code:</span> {_.perfumeID}
                      </p>
                    </div>
                    <div className="p-cntPrice">$ {_.price}</div>
                    <div className="p-cnTamnio">
                      Size
                      <div className="p-block">
                        <div className={`p-mincard`}>{_.volumeML} ml</div>
                      </div>
                    </div>
                    <div className="p-cntDescription">
                      Description:
                      <p className="p-descrip">{_.description}</p>
                    </div>
                    <div className="p-category">
                      Category:
                      <NavLink to={`/fragrance/category/${_.gender.toLocaleLowerCase()}`} className={"bnt-gender"}>{_.gender}</NavLink>
                    </div>
                  </div>
                </div>
              </div>
            );
          })

      ):(
            <PerfumeMenuSkeleton />
      )}

      {/* <div className="p-cnt_similar">
        <h2 className="p-titleSimilar">Similar products</h2>
        <div className="p-cntInside">
          <PerfumeMenu
            classTop="similar-products"
            scroll
            data={dataFragrance}
          />
        </div>
      </div> */}
    </MainDiv>
  );
};

export default PerfumeView;
