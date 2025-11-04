import GetQuoteHeaderWithNav from "@/ui/getQuote/GetQuoteHeaderWithNav";

const Header = ({ title, subtitle, currentStep, totalSteps }) => {
  return (
    <GetQuoteHeaderWithNav
      title={title}
      subtitle={subtitle}
      currentStep={currentStep}
      totalSteps={totalSteps}
    />
  );
};

export default Header;
