import { useEffect } from "react";

// Components
import MainDiv from "../../components/molecules/MainDiv/MainDiv";
import PerfumeMenu from "../../components/molecules/PerfumeMenu/PerfumeMenu";
import ReturnBtn from "../../components/atoms/ReturnBtn/ReturnBtn";
import { Warning } from "../../utilities/SweetAlert/SweetAlertModal";
import { useStateContext } from "../../context/ContextProvider";

// Styles
import "./ChildrensCategory.scss";

// Interfaces
import { responseApiSuccess, responseError } from "../../interface/interface";

// Services
import { getAxiosApi } from "../../services/api/Api";

// Skeleton
import PerfumeMenuSkeleton from "../../components/molecules/PerfumeMenu/PerfumeMenuSkeleton";

const ChildrensCategory = () => {
  const { dataPerfumeCh, setDataPerfumeCh, loadingCh, setLoadingCh } =
    useStateContext();

  useEffect(() => {
    const get_information = async () => {
      try {
        if (dataPerfumeCh.length === 0 || dataPerfumeCh === undefined) {
          const response: unknown = await getAxiosApi(
            "/api/v1/fragrance/type/children"
          );

          const _response = response as responseApiSuccess;

          if (_response.status === 200) {
            setDataPerfumeCh(_response.data);
            setLoadingCh(true);
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
        behavior: "smooth",
      });
    };

    scrollTop();
  }, []);

  return (
    <MainDiv className="ChildrensCategory">
      <ReturnBtn url="/" />
      <h1 className="ca-title">Fragrances for children</h1>
      <div className="c-cntWomen">
        {loadingCh ? (
          <PerfumeMenu data={dataPerfumeCh} />
        ) : (
          <PerfumeMenuSkeleton />
        )}
      </div>
      <div className="c-summer">
        <h1>Wrap yourself in aromas that last for hours</h1>
        <div className="c-cntSummer">
          {/* <PerfumeMenu data={dataFragrance}/> */}
        </div>
      </div>
    </MainDiv>
  );
};

export default ChildrensCategory;
