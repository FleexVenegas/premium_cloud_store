import { useEffect, useState } from "react";

// Components
import MainDiv from "../../components/molecules/MainDiv/MainDiv";
import PerfumeMenu from "../../components/molecules/PerfumeMenu/PerfumeMenu";
import ReturnBtn from "../../components/atoms/ReturnBtn/ReturnBtn";
import { Warning } from "../../utilities/SweetAlert/SweetAlertModal";

//Styles
import "./Category.scss";

// Skeletons
import PerfumeMenuSkeleton from "../../components/molecules/PerfumeMenu/PerfumeMenuSkeleton";

// Services
import { getAxiosApi } from "../../services/api/Api";

// Interfaces
import { responseApiSuccess, responseError } from "../../interface/interface";

// Context
import { useStateContext } from "../../context/ContextProvider";

const Category = () => {
  const { dataResponseW, setDataResponseW, loadingW, setLoadingW } = useStateContext();

  useEffect(() => {
    const get_information = async () => {
      try {
        if (dataResponseW.length === 0 || dataResponseW === undefined) {
          const data_fragrance: unknown = await getAxiosApi(
            "/api/v1/fragrance/type/women"
          );

          const _data = data_fragrance as responseApiSuccess;
          if (_data.status === 200) {
            setDataResponseW(_data.data);
            setLoadingW(true);
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
    <MainDiv className="Category">
      <ReturnBtn url="/" />
      <h1 className="ca-title">Fragrance for women</h1>
      <div className="c-cntWomen">
        {loadingW ? (
          <PerfumeMenu data={dataResponseW} />
        ) : (
          <PerfumeMenuSkeleton />
        )}
      </div>
      <div className="c-summer">
        <h1>Wrap yourself in aromas that last for hours</h1>
        <div className="c-cntSummer">
          {/* <PerfumeMenu data={dataResponse} /> */}
        </div>
      </div>
    </MainDiv>
  );
};

export default Category;
