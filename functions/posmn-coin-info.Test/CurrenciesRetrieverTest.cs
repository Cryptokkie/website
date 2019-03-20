using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using posmn_coin_info.Models;
using posmn_coin_info.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace posmn_coin_info.Test
{
  [TestClass]
  public class CurrenciesRetrieverTest
  {
    private Mock<ILogger<CurrenciesFunction>> logMock;
    private Mock<ICoinExplorerService> explorerServiceMock;
    private Mock<ICachingService> cachingServiceMock;

    [TestInitialize()]
    public void Startup()
    {
      logMock = new Mock<ILogger<CurrenciesFunction>>();
      explorerServiceMock = new Mock<ICoinExplorerService>();
      cachingServiceMock = new Mock<ICachingService>();
    }

    [TestMethod]
    public async Task GetsCurrenciesFromExplorer()
    {
      cachingServiceMock.Setup(x => x.GetCurrencies()).Returns<IEnumerable<CurrencyStats>>(null);
      explorerServiceMock.Setup(x => x.GetCurrencies()).ReturnsAsync(Enumerable.Empty<CurrencyStats>());

      var currenciesRetriever = new CurrenciesRetriever(logMock.Object, cachingServiceMock.Object, explorerServiceMock.Object);
      var currenciesResponse = await currenciesRetriever.Get();
      Assert.IsNotNull(currenciesResponse);

      explorerServiceMock.Verify(x => x.GetCurrencies(), Times.Once());
    }

    [TestMethod]
    public async Task GetsCurrenciesFromCache()
    {
      cachingServiceMock.Setup(x => x.GetCurrencies()).Returns(Enumerable.Empty<CurrencyStats>());
      explorerServiceMock.Setup(x => x.GetCurrencies());

      var currenciesRetriever = new CurrenciesRetriever(logMock.Object, cachingServiceMock.Object, explorerServiceMock.Object);
      var currenciesResponse = await currenciesRetriever.Get();
      Assert.IsNotNull(currenciesResponse);

      explorerServiceMock.Verify(x => x.GetCurrencies(), Times.Never());
    }
  }
}
