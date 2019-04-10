using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Posmn.Models;
using posmn_coin_info.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace posmn_coin_info.Test
{
  [TestClass]
  public class CurrenciesRetrieverTest
  {
    private Mock<ILoggerFactory> loggerFactoryMock;
    private Mock<ICoinDataTableStorage> coinDataTableStorageMock;

    [TestInitialize()]
    public void Startup()
    {
      loggerFactoryMock = new Mock<ILoggerFactory>();

      // implement loggerFactory.CreateLogger("xxx") and return ILogger
      var logMock = new Mock<ILogger>();
      loggerFactoryMock.Setup(x => x.CreateLogger(It.IsAny<string>())).Returns(logMock.Object);

      coinDataTableStorageMock = new Mock<ICoinDataTableStorage>();
    }

    [TestMethod]
    public async Task GetsCurrenciesFromTableStorage()
    {
      coinDataTableStorageMock.Setup(x => x.GetCoins()).ReturnsAsync(Enumerable.Empty<Coin>());

      var currenciesRetriever = new CurrenciesRetriever(loggerFactoryMock.Object, coinDataTableStorageMock.Object);
      var currenciesResponse = await currenciesRetriever.Get();
      Assert.IsNotNull(currenciesResponse);

      coinDataTableStorageMock.Verify(x => x.GetCoins(), Times.Once());
    }
  }
}
