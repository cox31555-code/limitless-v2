import GetQuoteHeaderWithNav from "@/ui/getQuote/GetQuoteHeaderWithNav";

const Header = ({ title, subtitle, currentStep, totalSteps, hideTitle = false }) => {
  return (
    <GetQuoteHeaderWithNav
      title={title}
      subtitle={subtitle}
      currentStep={currentStep}
      totalSteps={totalSteps}
      hideTitle={hideTitle}
    />
  );
};

export default Header;
