import { useTranslation } from "react-i18next";


const App = () => {

  const { t } = useTranslation();

  const releaseDate = new Date("2021-12-06");
  const number_of_days = Math.floor((new Date() - releaseDate)/(1000*60*60*24));

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column align-items-start">
        <h1 className="font-weight-normal mb-3">
          {t("welcome_message")}
        </h1>
        <p className="lead">
          {t("days_since_release",{number_of_days})} 
        </p>
      </div>
    </div>
  );
};

export default App
