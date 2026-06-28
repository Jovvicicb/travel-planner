import { useState } from "react";
import { reportService } from "../../api_service/reports/reportService";
import { downloadBlobFile } from "../../helpers/fileDownloadHelper";

export function useDownloadTripReport() {
  const [downloadingReport, setDownloadingReport] = useState(false);
  const [downloadReportError, setDownloadReportError] = useState("");

  async function downloadTripReport(tripId) {
    if (!tripId || Number(tripId) <= 0) {
      setDownloadReportError("Travel plan id is not valid.");
      return;
    }

    try {
      setDownloadingReport(true);
      setDownloadReportError("");

      const blob = await reportService.downloadTripReport(tripId);

      downloadBlobFile(blob, `travel-plan-${tripId}-report.pdf`);
    } catch (error) {
      setDownloadReportError(error.message);
    } finally {
      setDownloadingReport(false);
    }
  }

  function clearDownloadReportError() {
    setDownloadReportError("");
  }

  return {
    downloadingReport,
    downloadReportError,
    downloadTripReport,
    clearDownloadReportError,
  };
}
