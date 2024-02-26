import { useEffect } from "react";
//Styles
import "./MainView.scss";

//Assets
import WhatsApp from "../../assets/icons/whatsapp.png";

//Components
import MainDiv from "../../components/molecules/MainDiv/MainDiv";
import Contact from "../Views/Contact/Contact";
import PerfumeMenu from "../../components/molecules/PerfumeMenu/PerfumeMenu";
import Slider from "../../components/organims/Slider/Slider";
import CardCategory from "../../components/molecules/CardCategory/CardCategory";
import CommentCard from "../../components/molecules/CommentCard/CommentCard";
import { Warning } from "../../utilities/SweetAlert/SweetAlertModal";


// Context
import { useStateContext } from "../../context/ContextProvider";

// Services
import { getAxiosApi } from "../../services/api/Api";

// Interfaces
import { responseApiSuccess, responseError } from "../../interface/interface";
import PerfumeMenuSkeleton from "../../components/molecules/PerfumeMenu/PerfumeMenuSkeleton";

const MainView = () => {

  const { dataPerfumeT, setDataPerfumeT, loadingT, setLoadingT } = useStateContext();

  useEffect(() => {
    const ourTopPerfume = async () => {
      try {
          if(dataPerfumeT.length === 0 || dataPerfumeT === undefined){
              const dataTop = await getAxiosApi('/api/v1/fragrance/top')
              const _dataTop = dataTop as responseApiSuccess
    
              if(_dataTop.status === 200){
                  setDataPerfumeT(_dataTop.data)
                  setLoadingT(true)
              }
          }

      } catch (error) {
        console.log(error);
        const _error = error as responseError
        Warning(_error.message)
      }
    };

    ourTopPerfume();
  }, []);

  return (
    <MainDiv className="MainView">
      <div className="m-secct1" id="1">
        <div className="s1-cntTitle">
          <h1 className="s1-descrip">
            Discover our promotions on exclusive perfumes and accessories.
          </h1>
        </div>
        <Slider />
      </div>
      <div className="m-secct2" id="2">
        <h2 className="s2-title">Our best perfumes</h2>
        <div className="m-cntFragrance">
          {loadingT ? (
            <PerfumeMenu data={dataPerfumeT} />
          ):(
              <PerfumeMenuSkeleton />
          )}
        </div>
      </div>
      <div className="m-secct3" id="3">
        <h2 className="s2-title">Category</h2>
        <div className="s2-cntCategory">
          <CardCategory />
        </div>
      </div>
      <div className="m-secct4" id="4">
        <h2 className="s2-title">Reviews</h2>
        <div className="s4-cntReviews">
          <CommentCard />
        </div>
      </div>
      <div className="m-secct5" id="5">
        <Contact />
      </div>
      <div className="bntWhats">
        <img src={WhatsApp} alt="" />
      </div>
    </MainDiv>
  );
};

export default MainView;
