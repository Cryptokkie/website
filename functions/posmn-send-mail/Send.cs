using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SendGrid.Helpers.Mail;
using System.Net.Http;

namespace posmn_send_mail
{
  public static class Send
  {
    [FunctionName("Send")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        [SendGrid(ApiKey = "AzureWebJobsSendGridApiKey")] IAsyncCollector<SendGridMessage> messageCollector,
        ILogger log)
    {
      log.LogInformation("C# HTTP trigger function processed a request.");

      string posmncom = "info@posmn.com";

      // Get request body
      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      dynamic data = JsonConvert.DeserializeObject(requestBody);
      string name = data?.name;
      string emailFrom = data?.email;
      string recaptcha = data?.recaptcha;
      string message = data?.message;

      if (name == null || emailFrom == null || recaptcha == null)
      {
        return new BadRequestObjectResult("One of the following parameters is missing: name, email, recaptcha, message.");
      }

      if (!(await IsReCaptchaValid(recaptcha, log)))
      {
        return new BadRequestObjectResult("Recaptcha is invalid.");
      }

      var mail = new SendGridMessage();
      mail.AddTo(posmncom);
      mail.SetFrom(new EmailAddress("noreply@posmn.com"));
      mail.SetSubject($"posmn.com message from {name}");
      mail.AddContent("text/html", $"{message}<br><br>From: {name}<br>Email: {emailFrom}");
      await messageCollector.AddAsync(mail);

      return new OkObjectResult("{ }");
    }

    public static async Task<bool> IsReCaptchaValid(string recaptcha, ILogger log)
    {
      var secretKey = Environment.GetEnvironmentVariable("recaptcha_secret");
      var apiUrl = "https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}";
      var requestUri = string.Format(apiUrl, secretKey, recaptcha);

      using (var client = new HttpClient())
      {
        client.BaseAddress = new Uri(requestUri);
        var result = await client.GetAsync("");
        string resultContent = await result.Content.ReadAsStringAsync();
        var recaptchaResponse = JsonConvert.DeserializeObject<RecaptchaResponse>(resultContent);
        return recaptchaResponse.success;
      }
    }

    public class RecaptchaResponse
    {
      public bool success { get; set; }
    }
  }
}
