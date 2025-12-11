/**
 * Error handler utility for managing fetch errors with user-facing feedback
 * Usage with useError hook in components:
 * 
 * const { addError } = useError();
 * const handleRetry = async () => {
 *   await fetchWithErrorHandling(url, options, addError);
 * };
 * 
 * const error = {
 *   message: "Failed to load data",
 *   action: handleRetry  // Optional retry function
 * };
 */

export async function fetchWithErrorHandling(url, options = {}, onError = null) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorMessage = `Error ${response.status}: ${response.statusText}`;

      if (contentType?.includes("application/json")) {
        try {
          const data = await response.json();
          errorMessage = data.message || data.error || errorMessage;
        } catch (e) {
          // Keep the default error message if JSON parsing fails
        }
      } else if (contentType?.includes("text/plain")) {
        try {
          errorMessage = await response.text();
        } catch (e) {
          // Keep the default error message if text parsing fails
        }
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.statusCode = response.status;
      throw error;
    }

    return response;
  } catch (error) {
    if (onError) {
      onError({
        message: error.message || "An error occurred. Please try again.",
      });
    }
    throw error;
  }
}
