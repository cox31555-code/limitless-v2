import GetQuoteHeaderWithNav from "@/ui/getQuote/GetQuoteHeaderWithNav";

const Header = ({ title, currentStep, totalSteps }) => {
  return (
    <GetQuoteHeaderWithNav
      title={title}
      currentStep={currentStep}
      totalSteps={totalSteps}
    />
  );
};

export default Header;
