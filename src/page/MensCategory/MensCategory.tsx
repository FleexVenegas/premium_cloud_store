import { useEffect } from "react";

// Components
import MainDiv from "../../components/molecules/MainDiv/MainDiv";
import PerfumeMenu from "../../components/molecules/PerfumeMenu/PerfumeMenu";
import ReturnBtn from "../../components/atoms/ReturnBtn/ReturnBtn";
import { Warning } from "../../utilities/SweetAlert/SweetAlertModal";


// Styles
import "./MensCategory.scss";


// Services
import { getAxiosApi } from "../../services/api/Api";


// Intrefaces
import { responseApiSuccess, responseError } from "../../interface/interface";
import PerfumeMenuSkeleton from "../../components/molecules/PerfumeMenu/PerfumeMenuSkeleton";
import { useStateContext } from "../../context/ContextProvider";


const MensCategory = () => {

    const { dataResponseM, setDataResponseM, loadingM, setLoadingM } = useStateContext()

    useEffect(() => {
      const get_information = async () => {
        try {
          if(dataResponseM.length === 0 || dataResponseM === undefined){
              const data_fragrance: unknown = await getAxiosApi("/api/v1/fragrance/type/man");
    
              const _data = data_fragrance as responseApiSuccess
              if(_data.status === 200){
                  setDataResponseM(_data.data)
                  setLoadingM(true)
              }
          }

        } catch (error) {
            console.log(error);
            const _error = error as responseError;
            Warning(_error.message);
        }
      };

      get_information();
    }, []);



  useEffect(() => {
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }

    scrollTop()
  }, [])
  

  return (
    <MainDiv className="MensCategory">
      <ReturnBtn url="/" />
      <h1 className="ca-title">Fragrances for men</h1>
      <div className="c-cntWomen">
        {loadingM ? (
          <PerfumeMenu data={dataResponseM} />
        ) : (
          // Mostramos un skeletons mientras los datos cargan
          <PerfumeMenuSkeleton />
        )}
      </div>
      <div className="c-summer">
        <h1>Wrap yourself in aromas that last for hours</h1>
        <div className="c-cntSummer">
          <PerfumeMenu data={dataResponseM} />
        </div>
      </div>
    </MainDiv>
  );
};

export default MensCategory;
