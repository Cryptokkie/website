using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace monkey_importer
{
  public class RecordDataPointsFunction
  {
    private readonly IDataPointsRecorder dataPointsRecorder;

    public RecordDataPointsFunction(IDataPointsRecorder dataPointsRecorder)
    {
      this.dataPointsRecorder = dataPointsRecorder ?? throw new ArgumentNullException(nameof(dataPointsRecorder));
    }

    // run each day at 3.00 AM
    [FunctionName("RecordDataPoints")]
    public async Task Run([TimerTrigger("0 0 3 * * *")]TimerInfo myTimer, ILogger log)
    {
      log.LogInformation($"Record Data Points function executed at: {DateTime.Now}");

      await this.dataPointsRecorder.Execute();
    }
  }
}
