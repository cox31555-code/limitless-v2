"use client";
import React from "react";
import { Calendar, Clock, ChevronDown } from "lucide-react";
import { watch, setValue } from "react-hook-form";

const CoverDetailsForm = ({ form }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const durationType = form.watch("coverDetails.type");
  const duration = form.watch("coverDetails.period");
  const startDate = form.watch("coverDetails.startDate");
  const startTime = form.watch("coverDetails.startTime");

  // Dynamic duration options based on selected type
  const getDurationOptions = () => {
    switch (durationType) {
      case "Hours":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      case "Days":
        return [1, 2, 3, 4, 5, 6, 7, 8];
      case "Weeks":
        return [1, 2, 3, 4];
      default:
        return [1, 2, 3, 4, 5, 6, 7, 8];
    }
  };

  const getExtraDurationOptions = () => {
    switch (durationType) {
      case "Days":
        return [
          9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
          27, 28, 29, 30, 31,
        ];
      default:
        return [];
    }
  };

  const durationOptions = getDurationOptions();
  const extraDurationOptions = getExtraDurationOptions();
  const showDropdown =
    durationType === "Days" && extraDurationOptions.length > 0;

  const durationLabels = {
    Hours: "Hours",
    Days: "Days",
    Weeks: "Weeks",
  };

  const handleDurationTypeChange = (type) => {
    form.setValue("coverDetails.type", type);
    form.setValue("coverDetails.period", 1);
  };

  const handleDurationChange = (value) => {
    form.setValue("coverDetails.period", value);
    setIsDropdownOpen(false);
  };

  const handleDateChange = (e) => {
    form.setValue("coverDetails.startDate", e.target.value);
  };

  const handleTimeChange = (e) => {
    form.setValue("coverDetails.startTime", e.target.value);
  };

  const handleNext = () => {
    console.log({
      durationType,
      duration,
      startDate,
      startTime,
    });
  };

  const handleBack = () => {
    console.log("Back clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[720px] mx-auto">
        <div className="bg-white rounded-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Cover Details
              </h1>
            </div>
          </div>

          {/* Duration Section */}
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                How Long Will You Need It?
              </h2>
              <p className="text-sm text-gray-500">
                Select your preferred coverage duration
              </p>
            </div>

            <div className="space-y-6">
              {/* Duration Type Selection */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "Hours", label: "Hours" },
                  { key: "Days", label: "Days" },
                  { key: "Weeks", label: "Weeks" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => handleDurationTypeChange(key)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      durationType === key
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                        : "border border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        durationType === key
                          ? "border-white"
                          : "border-gray-300"
                      }`}
                    >
                      {durationType === key && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Duration Value Selection */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                  Select Duration
                </p>
                <div className="flex gap-[4px]">
                  {durationOptions.map((option) => {
                    const buttonWidth =
                      durationOptions.length === 12
                        ? "w-[calc(8.333%-0.1875rem)]"
                        : durationOptions.length === 8 && showDropdown
                          ? "w-[calc(11.111%-0.1875rem)]"
                          : durationOptions.length === 8
                            ? "w-[calc(12.5%-0.1875rem)]"
                            : durationOptions.length === 4 && showDropdown
                              ? "w-[calc(20%-0.1875rem)]"
                              : "w-[calc(25%-0.1875rem)]";
                    return (
                      <button
                        key={option}
                        onClick={() => handleDurationChange(option)}
                        className={`py-2 rounded-lg font-bold transition-all duration-200 text-sm flex-shrink-0 ${buttonWidth} ${
                          duration === option
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                            : "border border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-white"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}

                  {/* Custom Dropdown for more options - only show for Days */}
                  {showDropdown && (
                    <div className="relative w-[calc(11.111%-0.1875rem)] flex-shrink-0">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full py-2 border border-gray-200 rounded-lg flex items-center justify-center hover:border-blue-400 hover:bg-white transition-all duration-200 text-gray-600 hover:text-gray-900"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg z-50 min-w-20 max-h-60 overflow-y-auto">
                          {extraDurationOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleDurationChange(option)}
                              className="w-full px-4 py-2 text-left text-gray-900 hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg font-medium"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Start Date/Time Section */}
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                When Would You Like The Cover To Start?
              </h2>
              <p className="text-sm text-gray-500">
                Choose your coverage start date and time
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Start Date
                </label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={startDate || ""}
                    onChange={handleDateChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                  />
                </div>
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Start Time
                </label>
                <div className="relative group">
                  <Clock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="10:00"
                    value={startTime || ""}
                    onChange={handleTimeChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-6 border-t border-gray-100">
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverDetailsForm;
